import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const TOKEN_ID = 32308;
const CACHE_KEY = `tokenData_${TOKEN_ID}`;

const useMarketcap = () => {
  const [marketcap, setMarketcap] = useState(0);
  const [klyPrice, setKLYPrice] = useState(0);
  const [trend, setTrend] = useState(0);
  const [fiatSymbol, setFiatSymbol] = useState('USD');
  const [fiatSign, setFiatSign] = useState('$');

  const { sendJsonMessage } = useWebSocket(
    'wss://push.coinmarketcap.com/ws?device=web&client_source=coin_detail_page',
    {
      onOpen: () => {
        sendJsonMessage({
          method: 'RSUBSCRIPTION',
          params: ['main-site@crypto_price_15s@{}@detail', String(TOKEN_ID)],
        });
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        if (data?.d?.p24h === undefined) return;

        if (data.d.id === TOKEN_ID) {
          const newPrice = data.d.p;
          const newMarketcap = parseFloat((data.d.mc / data.d.p).toFixed(0));
          const newTrend = data.d.p24h;

          setKLYPrice(newPrice);
          setMarketcap(newMarketcap);
          setTrend(newTrend);
          setFiatSymbol('USD');
          setFiatSign('$');

          if (typeof window !== 'undefined') {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                klyPrice: newPrice,
                marketcap: newMarketcap,
                trend: newTrend,
              }),
            );
          }
        }
      },
      shouldReconnect: (closeEvent) => true,
    },
  );

  // Load cached values on client only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      if (cached.klyPrice) setKLYPrice(cached.klyPrice);
      if (cached.marketcap) setMarketcap(cached.marketcap);
      if (cached.trend) setTrend(cached.trend);
    }
  }, []);

  return { marketcap, klyPrice, trend, fiatSymbol, fiatSign };
};

export default useMarketcap;

import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const useMarketcap = () => {
  const [marketcap, setMarketcap] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [trend, setTrend] = useState(0);

  const { sendJsonMessage } = useWebSocket(
    'wss://push.coinmarketcap.com/ws?device=web&client_source=coin_detail_page',
    {
      onOpen: () => {
        sendJsonMessage({
          method: 'RSUBSCRIPTION',
          params: ['main-site@crypto_price_15s@{}@detail', '32308'],
        });
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);

        if (data?.d?.p24h === undefined) {
          return;
        }

        if (data.d.id === 32308) {
          setTrend(data.d.p24h);
          setMarketcap(parseFloat((data.d.mc / data.d.p).toFixed(0)));
          setTokenPrice(data.d.p);
        }
      },
      shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    // This effect ensures the WebSocket connection is established
  }, []);

  return { marketcap, tokenPrice, trend };
};

export default useMarketcap;
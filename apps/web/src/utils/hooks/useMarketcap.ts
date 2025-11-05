import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useChainNetworkStore } from '../../store/chainNetworkStore';
import { tokenSummaryStore } from '../../store/tokenSummaryStore';
import Big from 'big.js';

const CMC_MAINCHAIN_TOKEN_ID = 32308;
const MAINCHAIN_TOKEN_ID = '0000000000000000';

const getTokenIDWithoutNetwork = (tokenID: string) =>
  tokenID.length === 16 ? tokenID.substring(2) : tokenID;

const getCacheKey = (tokenID?: string) =>
  `tokenMarket_${tokenID ? getTokenIDWithoutNetwork(tokenID) : ''}`;

const useMarketcap = () => {
  const currentChainToken = useChainNetworkStore((state) => state.currentChainToken);
  const { tokenSummary, fetchTokenSummary } = tokenSummaryStore((state) => ({
    tokenSummary: state.tokenSummary,
    fetchTokenSummary: state.fetchTokenSummary,
  }));

  const [marketcap, setMarketcap] = useState(0);
  const [marketcapUSD, setMarketcapUSD] = useState(0);
  const [mainchainMarketcapUSD, setMainchainMarketcapUSD] = useState(0);
  const [supply, setSupply] = useState('0');

  const [price, setPrice] = useState<number | string | undefined>();
  const [priceUSD, setPriceUSD] = useState<number>(0);
  const [mainchainPriceUSD, setMainchainPriceUSD] = useState<number>(0);

  const [trend, setTrend] = useState<number | undefined>();
  const [mainchainTrend, setMainchainTrend] = useState<number>(0);

  const [fiatSymbol, setFiatSymbol] = useState('USD');
  const [fiatSign, setFiatSign] = useState('$');

  const isKLYToken = currentChainToken?.tokenID.substring(2) === '0'.repeat(7 * 2);

  const { sendJsonMessage } = useWebSocket(
    'wss://push.coinmarketcap.com/ws?device=web&client_source=coin_detail_page',
    {
      onOpen: () => {
        sendJsonMessage({
          method: 'RSUBSCRIPTION',
          params: ['main-site@crypto_price_15s@{}@detail', String(CMC_MAINCHAIN_TOKEN_ID)],
        });
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        if (data?.d?.p24h === undefined) return;

        if (data.d.id === CMC_MAINCHAIN_TOKEN_ID) {
          const newPrice = data.d.p;
          const newTrend = data.d.p24h;
          const newMarketcap = parseFloat(data.d.fmc);

          setMainchainPriceUSD(newPrice);
          setMainchainTrend(newTrend);
          setMainchainMarketcapUSD(newMarketcap);

          if (isKLYToken) {
            if (typeof window !== 'undefined') {
              localStorage.setItem(
                getCacheKey(getTokenIDWithoutNetwork(MAINCHAIN_TOKEN_ID)),
                JSON.stringify({
                  priceUSD: newPrice,
                  marketcapUSD: newMarketcap,
                  trend: newTrend,
                }),
              );
            }
          }
        }
      },
      shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (isKLYToken) {
      setPrice(mainchainPriceUSD);
      setMarketcap(mainchainMarketcapUSD);
      setTrend(mainchainTrend);
    } else {
      // TODO: implement another token price fetching / converting
      setPrice('N/A');
      setMarketcap(0);
      setTrend(undefined);
    }

    // TODO: implement fiat conversion
    setFiatSymbol('USD');
    setFiatSign('$');
  }, [
    isKLYToken,
    priceUSD,
    marketcapUSD,
    mainchainMarketcapUSD,
    mainchainPriceUSD,
    mainchainTrend,
    fiatSymbol,
    fiatSign,
  ]);

  useEffect(() => {
    if (supply && priceUSD && currentChainToken) {
      const denom = currentChainToken.denomUnits.find(
        (unit) => unit.denom.toLowerCase() === currentChainToken.displayDenom.toLowerCase(),
      );
      if (denom) {
        const marketCapValueUSD = new Big(supply)
          .div(10 ** denom.decimals)
          .times(new Big(priceUSD));
        setMarketcapUSD(parseFloat(marketCapValueUSD.toFixed(2)));
      }
    }
  }, [supply, priceUSD, currentChainToken]);

  useEffect(() => {
    if (tokenSummary.totalSupply.length === 0) {
      fetchTokenSummary();
    } else {
      if (currentChainToken) {
        const currentChainTokenSupply = tokenSummary.totalSupply.find(
          (supply) => supply.tokenID === currentChainToken.tokenID,
        );
        if (currentChainTokenSupply) {
          setSupply(currentChainTokenSupply.amount);
        }
      }
    }
  }, [currentChainToken, tokenSummary, fetchTokenSummary]);

  // Load cached values on client only
  useEffect(() => {
    if (typeof window !== 'undefined' && currentChainToken) {
      const cached = JSON.parse(
        localStorage.getItem(getCacheKey(currentChainToken.tokenID)) || '{}',
      );

      if (cached.priceUSD) {
        setPriceUSD(cached.priceUSD);
        if (isKLYToken) setMainchainPriceUSD(cached.priceUSD);
      }

      if (cached.trend) {
        setTrend(cached.trend);
        if (isKLYToken) setMainchainTrend(cached.trend);
      }

      if (cached.marketcapUSD) {
        setMarketcapUSD(cached.marketcapUSD);
        if (isKLYToken) setMainchainMarketcapUSD(cached.marketcapUSD);
      }
    }
  }, [isKLYToken, currentChainToken]);

  return { marketcap, price, trend, fiatSymbol, fiatSign };
};

export default useMarketcap;

'use client';
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from '../store/clientStore.ts';
import { NodeInfoType } from '../utils/types.ts';
import { callGetNodeInfo } from '../utils/api/apiCalls.tsx';
import useWebSocket from 'react-use-websocket';
import { usePathname } from "next/navigation";

type NetworkType = {
  networkId: string;
  networkName: string;
};

type ChainType = {
  chainId: string;
  chainName: string;
  logo: string;
  networks: NetworkType[];
};

export interface ChainNetworkContextProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentNetwork: NetworkType;
  setCurrentNetwork: (network: NetworkType) => void;
  chains?: ChainType[];
  networks?: NetworkType[];
  nodeInfo?: NodeInfoType;
  marketcap: number;
  tokenPrice: number;
  trend: number;
}

export const ChainNetworkContext = createContext<ChainNetworkContextProps>(
  {} as ChainNetworkContextProps,
);

export const useChainNetwork = () => useContext(ChainNetworkContext);
export const ChainNetworkProvider = ({ children }: { children: any }) => {
  const [currentChain, setCurrentChain] = useState<ChainType>(defaultChain);
  const [currentNetwork, setCurrentNetworkID] = useState<NetworkType>(defaultChain.networks[0]);
  const [chains, setChains] = useState<ChainType[]>([]);
  const [networks, setNetworks] = useState<NetworkType[]>([]);
  const [nodeInfo, setNodeInfo] = useState<NodeInfoType>();
  const [marketcap, setMarketcap] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [trend, setTrend] = useState<number>(0);

  const pathName = usePathname();


  const [loading, setLoading] = useState<boolean>(false);
  const setBaseURL = useGatewayClientStore((state) => state.setBaseURL);

  const setCurrentNetwork = (network: NetworkType) => {
    setCurrentNetworkID(network);
    setBaseURL(network.networkId);
  };

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
          //console.log(data);
        }
      },
      shouldReconnect: (closeEvent) => true,
    },
  );

  // get chains from api
  useEffect(() => {
    const getChains = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/chains', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (chains) {
          const chains = await response.json();
          setChains(chains.chains);
        }
      } catch (error) {
        console.error('Error fetching chains', error);
      } finally {
        setLoading(false);
      }
    };

    getChains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const firstSubDir = pathName.split('/')[1];
    const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
    chainMatch ? setCurrentChain(chainMatch) : setCurrentChain(chains[0]);
  }, [pathName, chains]);

  // get networks from current chain and set currentNetwork to first network
  useEffect(() => {
    if (currentChain) {
      // get networks from current chain
      setNetworks(currentChain.networks);
      // set currentNetwork to subdomain or first network
      const networkSubdomain = window.location.hostname.split('.')[0].split('-')[0];
      const network =
        networkSubdomain === 'explorer'
          ? currentChain.networks[0]
          : currentChain.networks.find((network) => network.networkName === networkSubdomain);
      setCurrentNetwork(network ?? currentChain.networks[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChain]);

  useEffect(() => {
    callGetNodeInfo().then((data) => {
      setNodeInfo(data as unknown as NodeInfoType);
    });
  }, []);

  return (
    <ChainNetworkContext.Provider
      value={{
        currentChain,
        setCurrentChain,
        currentNetwork,
        setCurrentNetwork,
        chains,
        networks,
        nodeInfo,
        marketcap,
        tokenPrice,
        trend,
      }}
    >
      {children}
    </ChainNetworkContext.Provider>
  );
};

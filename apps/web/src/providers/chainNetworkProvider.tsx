'use client';
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from '../store/clientStore.ts';
import { NodeInfoType } from '../utils/types.ts';
import { callGetNodeInfo } from '../utils/api/apiCalls.tsx';

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

  const [loading, setLoading] = useState<boolean>(false);
  const setBaseURL = useGatewayClientStore((state) => state.setBaseURL);

  const setCurrentNetwork = (network: NetworkType) => {
    setCurrentNetworkID(network);
    setBaseURL(network.networkId);
  };

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

  // get networks from current chain and set currentNetwork to first network
  useEffect(() => {
    if (currentChain) {
      // get networks from current chain
      setNetworks(currentChain.networks);
      // set currentNetwork to first network
      setCurrentNetwork(currentChain.networks[0]);
      setBaseURL(currentChain.networks[0].networkId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChain]);

  useEffect(() => {
    callGetNodeInfo().then((data) => {
      setNodeInfo(data as unknown as NodeInfoType);
      console.log(data);
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
      }}
    >
      {children}
    </ChainNetworkContext.Provider>
  );
};

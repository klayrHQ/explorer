'use client';
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { chainNetworkData, defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from '../store/clientStore.ts';

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

  const [loading, setLoading] = useState<boolean>(false);
  const setBaseURL = useGatewayClientStore((state) => state.setBaseURL);

  const setCurrentNetwork = (network: NetworkType) => {
    console.log('changing to network', network);
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

        console.log({ response });

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
  }, [currentChain]);

  // save currentChain to local storage

  // setCurrentChain from local storage if available

  // save currentNetwork to local storage

  // set currentNetwork from local storage if available

  return (
    <ChainNetworkContext.Provider
      value={{
        currentChain,
        setCurrentChain,
        currentNetwork,
        setCurrentNetwork,
        chains,
        networks,
      }}
    >
      {children}
    </ChainNetworkContext.Provider>
  );
};

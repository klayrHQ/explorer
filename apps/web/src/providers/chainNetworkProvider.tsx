"use client"
import React, {useEffect} from "react"
import {createContext, useContext, useState} from "react"
import {ChainType, NetworkType} from "@repo/ui/types";
import {chainNetworkData} from "../utils/constants.tsx";

export interface ChainNetworkContextProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentNetwork: NetworkType;
  setCurrentNetwork: (network: NetworkType) => void;
  chains?: ChainType[];
  networks?: NetworkType[];
}

export const ChainNetworkContext = createContext<ChainNetworkContextProps>({} as ChainNetworkContextProps)

export const useChainNetwork = () => useContext(ChainNetworkContext)
export const ChainNetworkProvider = ({ children, }: {children: any}) => {
  const [currentChain, setCurrentChain] = useState<ChainType>(chainNetworkData.currentChain);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>(chainNetworkData.currentNetwork);
  const [chains, setChains] = useState<ChainType[]>([]);
  const [networks, setNetworks] = useState<NetworkType[]>([]);

  // get chains from api
  useEffect(() => {
    // set chains
    setChains([])
  }, []);

  // get networks from current chain and set currentNetwork to first network
  useEffect(() => {
    if (currentChain) {
      // get networks from current chain
      setNetworks([])
      // set currentNetwork to first network
      setCurrentNetwork({} as NetworkType)
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
  )
}

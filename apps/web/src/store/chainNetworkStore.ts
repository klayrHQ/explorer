import { create } from 'zustand';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {ChainType, ChainTokenType} from "../utils/types.ts";
import {callGetChains, callGetChainTokens} from "../utils/api/apiCalls.tsx";

type NetworkType = {
  networkName: string;
  networkId: string;
};

interface ChainNetworkStoreProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentNetwork: NetworkType;
  setCurrentNetwork: (network: NetworkType) => void;
  chains: ChainType[];
  networks: NetworkType[];
  setNetworks: (networks: NetworkType[]) => void;
}

export const useChainNetworkStore = create<ChainNetworkStoreProps>((set) => {
  const fetchChains = async () => {
    try {

      // Fetch chains
      let chainsData: ChainType[] = [];
      const chainsResponse = callGetChains().then((data) => { chainsData = data });

      // Fetch tokens
      let tokensData: ChainTokenType[] = [];
      const tokensResponse = callGetChainTokens().then((data) => { tokensData = data });

      // Match tokens to chains
      const chainsWithTokens = chainsData?.map((chain: ChainType) => {
        const matchingTokens = tokensData?.filter((token: ChainTokenType) => token.chainID === chain.chainID);
        return { ...chain, tokens: matchingTokens };
      });
      set({ chains: chainsWithTokens });
    } catch (error) {
      console.error('Error fetching chains', error);
    }
  };

  fetchChains();

  return {
    currentChain: defaultChain,
    setCurrentChain: (chain: ChainType) => set({ currentChain: chain }),
    currentNetwork: {networkName: defaultChain.networkType, networkId: defaultChain.networkType},
    setCurrentNetwork: (network: NetworkType) => {
      set({ currentNetwork: network });
      useGatewayClientStore.getState().setBaseURL(network.networkId);
    },
    chains: [],
    networks: [],
    setNetworks: (networks: NetworkType[]) => set({ networks }),
  };
});

export const useInitializeCurrentChain = () => {
  const pathname = usePathname();
  const chains = useChainNetworkStore((state) => state.chains);
  const setCurrentChain = useChainNetworkStore((state) => state.setCurrentChain);

  useEffect(() => {
    const firstSubDir = pathname.split('/')[1];
    const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
    setCurrentChain(chainMatch ? chainMatch : chains[0]);
  }, [pathname, chains, setCurrentChain]);
};

// Update networks when currentChain changes
useChainNetworkStore.subscribe((state, prevState) => {
  if (state.currentChain !== prevState.currentChain) {
    const { setCurrentNetwork, setNetworks } = useChainNetworkStore.getState();
    const currentChains = useChainNetworkStore.getState().chains.filter((chain) => chain.chainName === state.currentChain.chainName);
    const networks = currentChains.map((chain) => chain.networkType).flat();
    const networkObjects = networks.map((network) => ({
      networkName: network,
      networkId: network,
    }));
    setNetworks(networkObjects ?? []);
    const networkSubdomain = window.location.hostname.split('.')[0].split('-')[0];
    const network =
      networkSubdomain === 'explorer'
        ? networkObjects[0]
        : networkObjects.find((network) => network.networkName === networkSubdomain);
    setCurrentNetwork(network ?? networkObjects[0] ?? []);
  }
});

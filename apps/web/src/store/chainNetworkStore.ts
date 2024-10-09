import { create } from 'zustand';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type NetworkType = {
  networkId: string;
  networkName: string;
};

type ChainType = {
  chainId: string;
  chainName: string;
  logo: string;
  networks: NetworkType[];
  currency: {
    symbol: string;
    sign: string;
  };
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
      const response = await fetch('/api/chains', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      set({ chains: data.chains });
    } catch (error) {
      console.error('Error fetching chains', error);
    }
  };

  fetchChains();

  return {
    currentChain: defaultChain,
    setCurrentChain: (chain: ChainType) => set({ currentChain: chain }),
    currentNetwork: defaultChain.networks[0],
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
    setNetworks(state?.currentChain?.networks ?? []);
    const networkSubdomain = window.location.hostname.split('.')[0].split('-')[0];
    const network =
      networkSubdomain === 'explorer'
        ? state?.currentChain?.networks[0]
        : state?.currentChain?.networks.find((network) => network.networkName === networkSubdomain);
    setCurrentNetwork(network ?? state?.currentChain?.networks[0] ?? []);
  }
});

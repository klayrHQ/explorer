import { create } from 'zustand';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ChainType, ChainTokenType } from '../utils/types.ts';
import { callGetChains, callGetChainTokens } from '../utils/api/apiCalls.tsx';

interface ChainNetworkStoreProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentNetwork: string;
  setCurrentNetwork: (network: string) => void;
  chains: ChainType[];
  setChains: (chains: ChainType[]) => void;
  networks: string[];
}

export const useChainNetworkStore = create<ChainNetworkStoreProps>((set) => {
  return {
    currentChain: defaultChain,
    setCurrentChain: (chain: ChainType) => set({ currentChain: chain }),
    currentNetwork: defaultChain.networkType,
    setCurrentNetwork: (network: string) => {
      set({ currentNetwork: network });
    },
    chains: [],
    setChains: (chains: ChainType[]) => set({ chains }),
    networks: ['mainnet', 'testnet'],
  };
});

export const useInitializeCurrentChain = () => {
  const pathname = usePathname();
  const chains = useChainNetworkStore((state) => state.chains);
  const setChains = useChainNetworkStore((state) => state.setChains);
  const setCurrentChain = useChainNetworkStore((state) => state.setCurrentChain);
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);
  const setCurrentNetwork = useChainNetworkStore((state) => state.setCurrentNetwork);
  const networks = useChainNetworkStore((state) => state.networks);
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const setBaseUrl = useGatewayClientStore((state) => state.setBaseURL);

  useEffect(() => {
    const networkSubdomain = window.location.hostname.split('.')[0].split('-')[0];
    const network =
      networkSubdomain === 'explorer'
        ? networks[0]
        : networks.find((network) => network === networkSubdomain);
    if (window.location.hostname !== 'localhost') {
      setCurrentNetwork(network ?? 'mainnet');
    } else {
      setCurrentNetwork(currentChain.networkType);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchChains = async () => {
      try {
        // Fetch chains
        const chainsResponse = callGetChains({ network: currentNetwork }).then((data) => {
          return data.data;
        });
        const chainsData: ChainType[] = await chainsResponse;

        // Fetch tokens
        const tokensResponse = callGetChainTokens({ network: currentNetwork }).then((data) => {
          return data.data;
        });
        const tokensData: ChainTokenType[] = await tokensResponse;

        // Match tokens to chains
        const chainsWithTokens = chainsData?.map((chain: ChainType) => {
          const matchingTokens = tokensData?.filter(
            (token: ChainTokenType) => token.chainID === chain.chainID,
          );
          return { ...chain, tokens: matchingTokens };
        });
        setChains(chainsWithTokens);

        const firstSubDir = pathname.split('/')[1];
        const matchingChains = chainsWithTokens?.filter((chain) => chain.chainName === firstSubDir);
        const chainMatch = matchingChains?.find((chain) => chain.networkType === currentNetwork);
        //console.log('matchingChains', matchingChains, '\nfirstSubDir', firstSubDir, '\nchains', chainsWithTokens, '\nchainMatch', chainMatch);
        setCurrentChain(chainMatch ?? chains[0] ?? defaultChain);
      } catch (error) {
        console.error('Error fetching chains', error);
      }
    };

    fetchChains();
  }, [currentNetwork]);

  useEffect(() => {
    setBaseUrl(currentChain?.serviceURLs[0].http ?? defaultChain?.serviceURLs[0].http);
  }, [currentChain]);
};

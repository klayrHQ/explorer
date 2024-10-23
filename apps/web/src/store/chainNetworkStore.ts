import { create } from 'zustand';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { useSearchParams } from 'next/navigation';
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
  const setChains = useChainNetworkStore((state) => state.setChains);
  const setCurrentChain = useChainNetworkStore((state) => state.setCurrentChain);
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);
  const setCurrentNetwork = useChainNetworkStore((state) => state.setCurrentNetwork);
  const networks = useChainNetworkStore((state) => state.networks);
  const setBaseUrl = useGatewayClientStore((state) => state.setBaseURL);

  const searchParams = useSearchParams();

  useEffect(() => {
    const networkParam = searchParams.get('network');
    networkParam && networks.includes(networkParam) ? setCurrentNetwork(networkParam) : setCurrentNetwork(networks[0]);
  }, [searchParams]);

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

        const chainParam = searchParams.get('app')
        const matchingChains = chainsWithTokens?.filter((chain) => chain.chainName === chainParam);
        const chainMatch = matchingChains?.find((chain) => chain.networkType === currentNetwork);
        //console.log('matchingChains', matchingChains, '\nfirstSubDir', chainParam, '\nchains', chainsWithTokens, '\nchainMatch', chainMatch);
        if (chainMatch) {
          //console.log('baseUrl', chainMatch.serviceURLs[0]);
          setBaseUrl(chainMatch.serviceURLs[0].http);
          setCurrentChain(chainMatch);
        }
      } catch (error) {
        console.error('Error fetching chains', error);
      }
    };

    fetchChains();
  }, [currentNetwork]);
};

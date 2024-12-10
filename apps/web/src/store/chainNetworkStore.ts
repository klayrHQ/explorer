import { create } from 'zustand';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
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
  const chains = useChainNetworkStore((state) => state.chains);
  const setCurrentChain = useChainNetworkStore((state) => state.setCurrentChain);
  const setCurrentNetwork = useChainNetworkStore((state) => state.setCurrentNetwork);
  const networks = useChainNetworkStore((state) => state.networks);
  const setBaseUrl = useGatewayClientStore((state) => state.setBaseURL);
  const pathName = usePathname();
  const gateways = {
    mainnet: 'https://gateway-mainnet.klayr.dev/api/v1/',
    testnet: 'https://gateway-testnet.klayr.dev/api/v1/',
  };

  const searchParams = useSearchParams();
  const networkParam = searchParams.get('network');
  const chainParam = searchParams.get('app');

  const hasMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (chainParam === 'klayr_mainchain') {
      if (networkParam === 'mainnet') {
        setBaseUrl(gateways.mainnet);
      } else if (networkParam === 'testnet') {
        setBaseUrl(gateways.testnet);
      }
    }
    networkParam && networks.includes(networkParam) && setCurrentNetwork(networkParam);

    const fetchChains = async () => {
      try {
        // Fetch chains
        const chainsResponse = callGetChains({}).then((data) => {
          return data.data;
        });
        const chainsData: ChainType[] = await chainsResponse;

        // Fetch tokens
        const tokensResponse = callGetChainTokens({ network: networks.join(',') }).then((data) => {
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

        console.log('Chains with tokens', chainsWithTokens);
      } catch (error) {
        console.error('Error fetching chains', error);
      }
    };

    fetchChains();
  }, [searchParams, pathName]);

  useEffect(() => {
    console.log('Chains from store:', chains);
    if (chains.length > 0) {
      const chainParam = searchParams.get('app');
      const matchingChains = chains?.filter((chain) => chain.chainName === chainParam);
      const chainMatch = matchingChains?.find((chain) => chain.networkType === networkParam);
      if (chainMatch) {
        chainParam !== 'klayr_mainchain' && setBaseUrl(chainMatch.serviceURLs[0].http);
        setCurrentChain(chainMatch);
      } else if (pathName.split('/')[2] !== '404') {
        if (window?.location.hostname.includes('vercel'))
          console.error('404 triggered'); // skip 404 page if on vercel preview because middleware doesn't work there
        else router.push('/klayr_mainchain/404');
      }
    }
  }, [chains]);
};

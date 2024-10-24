import { create } from 'zustand';
import { defaultChain } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import {redirect, usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';
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
  const router = useRouter();
  const pathName = usePathname();
  const gateways = {
    mainnet: 'https://gateway-mainnet.klayr.dev/api/v1/',
    testnet: 'https://gateway-testnet.klayr.dev/api/v1/',
  };

  const searchParams = useSearchParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    const networkParam = searchParams.get('network');
    const chainParam = searchParams.get('app')

    if(chainParam === 'klayr_mainchain') {
      if (networkParam === 'mainnet') {
        setBaseUrl(gateways.mainnet);
      } else if (networkParam === 'testnet') {
        setBaseUrl(gateways.testnet);
      }
    }
    //console.log('running network effect')
    networkParam && networks.includes(networkParam) && setCurrentNetwork(networkParam);
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
        //console.log('matchingChains', matchingChains, '\napp', chainParam, '\nchains', chainsWithTokens, '\nchainMatch', chainMatch);
        if (chainMatch) {
          //console.log('baseUrl', chainMatch.serviceURLs[0]);
          chainParam !== 'klayr_mainchain' && setBaseUrl(chainMatch.serviceURLs[0].http);
          setCurrentChain(chainMatch);
        } else if (pathName.split('/')[2] !== '404') {
          console.error('404 no matching chain')
          //router.push('/klayr_mainchain/404');
        }
      } catch (error) {
        console.error('Error fetching chains', error);
      }
    };

    if (hasMounted.current) {
      fetchChains();
    } else {
      hasMounted.current = true;
    }
  }, [currentNetwork]);
};

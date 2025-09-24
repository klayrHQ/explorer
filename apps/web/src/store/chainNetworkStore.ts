import { create } from 'zustand';
import { defaultChain, defaultChainToken } from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ChainType, ChainTokenType } from '../utils/types.ts';
import { callGetChains, callGetChainTokens } from '../utils/api/apiCalls.tsx';

interface ChainNetworkStoreProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentChainToken: ChainTokenType;
  setCurrentChainToken: (token: ChainTokenType) => void;
  currentNetwork: string;
  setCurrentNetwork: (network: string) => void;
  chains: ChainType[];
  setChains: (chains: ChainType[]) => void;
  networks: string[];
  tokens: ChainTokenType[];
  setTokens: (tokens: ChainTokenType[]) => void;
}

export const useChainNetworkStore = create<ChainNetworkStoreProps>((set) => {
  return {
    currentChain: defaultChain,
    setCurrentChain: (chain: ChainType) => set({ currentChain: chain }),
    currentChainToken: defaultChainToken,
    setCurrentChainToken: (token: ChainTokenType) => set({ currentChainToken: token }),
    currentNetwork: defaultChain.networkType,
    setCurrentNetwork: (network: string) => {
      set({ currentNetwork: network });
    },
    chains: [],
    setChains: (chains: ChainType[]) => set({ chains }),
    networks: ['mainnet', 'testnet'],
    tokens: [],
    setTokens: (tokens: ChainTokenType[]) => set({ tokens }),
  };
});

export const useInitializeCurrentChain = () => {
  const setChains = useChainNetworkStore((state) => state.setChains);
  const chains = useChainNetworkStore((state) => state.chains);
  const setCurrentChain = useChainNetworkStore((state) => state.setCurrentChain);
  const setCurrentChainToken = useChainNetworkStore((state) => state.setCurrentChainToken);
  const tokens = useChainNetworkStore((state) => state.tokens);
  const setCurrentNetwork = useChainNetworkStore((state) => state.setCurrentNetwork);
  const networks = useChainNetworkStore((state) => state.networks);
  const setBaseUrl = useGatewayClientStore((state) => state.setBaseURL);
  const setTokens = useChainNetworkStore((state) => state.setTokens);
  const pathName = usePathname();
  const gateways = {
    mainnet: `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
    testnet: `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_TESTNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
  };

  const searchParams = useSearchParams();
  const networkParam = searchParams.get('network');
  const chainParam = searchParams.get('app');

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

        const tokensFilteredByNetwork = tokensData.filter(
          (token) => token.networkType === networkParam,
        );
        setTokens(tokensFilteredByNetwork);

        // Match tokens to chains
        const chainsWithTokens = chainsData?.map((chain: ChainType) => {
          const matchingTokens = tokensData?.filter(
            (token: ChainTokenType) => token.chainID === chain.chainID,
          );
          return { ...chain, tokens: matchingTokens };
        });
        setChains(chainsWithTokens);
      } catch (error) {
        console.error('Error fetching chains', error);
      }
    };

    fetchChains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathName]);

  useEffect(() => {
    if (chains.length > 0 && chainParam && networkParam) {
      const chainMatch = chains
        ?.filter((chain) => chain.chainName === chainParam)
        .find((chain) => chain.networkType === networkParam);

      if (chainMatch) {
        chainParam !== 'klayr_mainchain' && setBaseUrl(chainMatch.serviceURLs[0].http);
        setCurrentChain(chainMatch);
      } else if (pathName.split('/')[2] !== '404') {
        if (window?.location.hostname.includes('vercel'))
          console.error('404 triggered'); // skip 404 page if on vercel preview because middleware doesn't work there
        else router.push('/klayr_mainchain/404');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chains]);

  useEffect(() => {
    if (tokens.length > 0 && chainParam && networkParam) {
      const tokenMatch = tokens
        ?.filter((token) => token.chainName === chainParam)
        .find((token) => token.networkType === networkParam);

      if (tokenMatch) {
        setCurrentChainToken(tokenMatch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);
};

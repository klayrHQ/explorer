import { create } from 'zustand';
import {
  defaultApp,
  defaultChain,
  defaultChainToken,
  defaultTestnetChain,
  defaultTestnetChainToken,
  defaultUnknownChain,
  defaultUnknownChainToken,
  serviceMainnetURL,
  serviceTestnetURL,
} from '../utils/constants.tsx';
import { useGatewayClientStore } from './clientStore.ts';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ChainType, ChainTokenType } from '../utils/types.ts';
import { callGetChains, callGetChainTokens } from '../utils/api/apiCalls.tsx';
import { useNetwork } from '../utils/hooks/useNetwork.ts';
import { useApp } from '../utils/hooks/useApp.ts';

interface ChainNetworkStoreProps {
  currentChain: ChainType | undefined;
  setCurrentChain: (chain: ChainType) => void;
  currentChainToken: ChainTokenType | undefined;
  setCurrentChainToken: (token: ChainTokenType) => void;
  currentNetwork: string | undefined;
  setCurrentNetwork: (network: string) => void;
  chains: ChainType[];
  setChains: (chains: ChainType[]) => void;
  networks: string[];
  tokens: ChainTokenType[];
  setTokens: (tokens: ChainTokenType[]) => void;
}

export const useChainNetworkStore = create<ChainNetworkStoreProps>((set) => {
  return {
    currentChain: undefined,
    setCurrentChain: (chain: ChainType) => set({ currentChain: chain }),
    currentChainToken: undefined,
    setCurrentChainToken: (token: ChainTokenType) => set({ currentChainToken: token }),
    currentNetwork: undefined,
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

  const networkParam = useNetwork();
  const chainParam = useApp();
  const router = useRouter();

  useEffect(() => {
    networkParam && networks.includes(networkParam) && setCurrentNetwork(networkParam);

    // defaultChain and defaultChainToken on this codespace is klayr_mainchain
    // we can use that to set state early
    if (chainParam === defaultChain.chainName) {
      if (networkParam === defaultChain.networkType) {
        setBaseUrl(defaultChain.serviceURLs[0].http);
        setCurrentChain(defaultChain);
        setCurrentChainToken(defaultChainToken);
      } else if (networkParam === defaultTestnetChain.networkType) {
        setBaseUrl(defaultTestnetChain.serviceURLs[0].http);
        setCurrentChain(defaultTestnetChain);
        setCurrentChainToken(defaultTestnetChainToken);
      }
    } else if (chainParam === defaultApp) {
      if (networkParam === 'mainnet') {
        setBaseUrl(`https://${serviceMainnetURL}`);
      } else if (networkParam === 'testnet') {
        setBaseUrl(`https://${serviceTestnetURL}`);
      }
    }

    const fetchChains = async () => {
      // Only fetch chains if both network and chain param is available
      if (networkParam && chainParam) {
        try {
          // Fetch chains
          const chainsResponse = callGetChains({}).then((data) => {
            return data.data;
          });
          const chainsData: ChainType[] = await chainsResponse;
          const uniqueChainsData = Array.from(
            new Map(chainsData.map((item) => [item.chainID, item])).values(),
          );

          // Fetch tokens
          const tokensResponse = callGetChainTokens({ network: networks.join(',') }).then(
            (data) => {
              return data.data;
            },
          );
          const tokensData: ChainTokenType[] = await tokensResponse;
          const uniqueTokensData = Array.from(
            new Map(tokensData.map((item) => [item.tokenID, item])).values(),
          );

          const tokensFilteredByNetwork = uniqueTokensData.filter(
            (token) => token.networkType === networkParam,
          );
          setTokens(tokensFilteredByNetwork);

          // Match tokens to chains
          const chainsWithTokens = uniqueChainsData?.map((chain: ChainType) => {
            const matchingTokens = uniqueTokensData?.filter(
              (token: ChainTokenType) => token.chainID === chain.chainID,
            );
            return { ...chain, tokens: matchingTokens };
          });
          setChains(chainsWithTokens);
        } catch (error) {
          console.error('Error fetching chains', error);
        }
      }
    };

    fetchChains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkParam, chainParam, pathName]);

  useEffect(() => {
    if (chains.length > 0 && chainParam && networkParam) {
      const chainMatch = chains
        ?.filter((chain) => chain.chainName === chainParam)
        .find((chain) => chain.networkType === networkParam);

      if (chainMatch) {
        if (chainMatch.serviceURLs.length > 0) {
          // setBaseUrl for defaultApp already assigned early above
          chainParam !== 'klayr_mainchain' &&
            chainParam !== defaultApp &&
            setBaseUrl(chainMatch.serviceURLs[0].http);
        } else if (pathName.split('/')[2] !== '404') {
          router.push(`/${chainParam}/404`);
        }
        // setCurrentChain for klayr already assigned early above
        chainParam !== 'klayr_mainchain' && setCurrentChain(chainMatch);
      } else if (pathName.split('/')[2] !== '404') {
        if (window?.location.hostname.includes('vercel'))
          console.error('404 triggered'); // skip 404 page if on vercel preview because middleware doesn't work there
        else router.push(`/${chainParam}/404`);
      } else {
        // same as above
        chainParam !== 'klayr_mainchain' && setCurrentChain(defaultUnknownChain);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chains, chainParam, networkParam]);

  useEffect(() => {
    if (tokens.length > 0 && chainParam && networkParam) {
      const tokenMatch = tokens
        ?.filter((token) => token.chainName === chainParam)
        .find((token) => token.networkType === networkParam);

      if (tokenMatch) {
        // setCurrentChainToken for klayr already assigned early above
        chainParam !== 'klayr_mainchain' && setCurrentChainToken(tokenMatch);
      } else {
        // same as above
        chainParam !== 'klayr_mainchain' && setCurrentChainToken(defaultUnknownChainToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, chainParam, networkParam]);
};

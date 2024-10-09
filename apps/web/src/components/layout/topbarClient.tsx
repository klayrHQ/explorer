'use client';
import { Topbar } from '@repo/ui/organisms';
import { Icon, MenuItemProps, Typography } from '@repo/ui/atoms';
import { useSearchStore } from '../../store/searchStore.ts';
import React from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import {useFavouritesStore} from "../../store/favouritesStore.ts";
import {useChainNetworkStore, useInitializeCurrentChain} from "../../store/chainNetworkStore.ts";
import {useNodeStore} from "../../store/nodeStore.ts";
import useMarketcap from "../../utils/hooks/useMarketcap.ts";

interface TopbarClientProps {
  logo: {
    logoSrc: string;
    altText: string;
    logoText: string;
  };
  mobileMenuItems: Omit<MenuItemProps, 'subMenu'>[];
}

export const TopbarClient = ({ logo, mobileMenuItems }: TopbarClientProps) => {
  useInitializeCurrentChain();
  const {
    // marketcap,
    trend,
    tokenPrice,
  } = useMarketcap();

  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);
  const chains = useChainNetworkStore((state) => state.chains);
  const networks = useChainNetworkStore((state) => state.networks);
  const setCurrentChain = useChainNetworkStore((state) => state.setCurrentChain);
  const setCurrentNetwork = useChainNetworkStore((state) => state.setCurrentNetwork);

  const nodeInfo = useNodeStore((state) => state.nodeInfo);

  const callSearch = useSearchStore((state) => state.callSearch);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const searchResult = useSearchStore((state) => state.searchResults);

  const newFavourite = useFavouritesStore((state) => state.newFavourite);
  const basePath = useBasePath();

  const kpisObject = [
    {
      keyValue: 'KLY: ',
      contentValue: (
        <Typography
          className={'inline-flex items-center gap-1'}
          color={'gray-5'}
          variant={'paragraph-sm'}
        >
          {`$${parseFloat(tokenPrice.toFixed(5)).toLocaleString()}`}
          <span
            className={`${trend < 0 ? 'text-error' : 'text-success'} text-paragraph-sm font-semibold inline-flex items-center gap-1`}
          >
            <Icon
              className={'mt-px'}
              color={'inherit'}
              icon={trend < 0 ? 'TrendDown' : 'TrendUp'}
              size={'xs'}
            />
            {`${parseFloat(trend.toFixed(2)).toLocaleString()}%`}
          </span>
        </Typography>
      ),
    },
    //todo - uncomment when marketcap is available (awaiting verification)
    /*{
      keyValue: 'MC: ',
      contentValue: `$${parseFloat(marketcap.toFixed(2)).toLocaleString()}`,
    },*/
  ];

  return (
    <Topbar
      basePath={basePath}
      callSearch={callSearch}
      chainNetworkData={{
        currentChain,
        setCurrentChain,
        currentNetwork: {
          syncing: nodeInfo?.syncing,
          ...currentNetwork,
        },
        setCurrentNetwork,
        chains,
        networks,
      }}
      kpis={kpisObject}
      logo={logo}
      mobileMenuItems={mobileMenuItems}
      newFavourite={newFavourite}
      searchResults={searchResult}
      setSearchResults={setSearchResults}
    />
  );
};

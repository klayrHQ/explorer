'use client';
import { Topbar } from '@repo/ui/organisms';
import { Icon, MenuItemProps, Typography } from '@repo/ui/atoms';
import { useChainNetwork } from '../../providers/chainNetworkProvider.tsx';
import { useSearchStore } from '../../store/searchStore.ts';
import React from 'react';
import {useFavouritesStore} from "../../store/favouritesStore.ts";

interface TopbarClientProps {
  logo: {
    logoSrc: string;
    altText: string;
    logoText: string;
  };
  mobileMenuItems: Omit<MenuItemProps, 'subMenu'>[];
}

export const TopbarClient = ({ logo, mobileMenuItems }: TopbarClientProps) => {
  const {
    currentChain,
    setCurrentChain,
    currentNetwork,
    setCurrentNetwork,
    chains,
    networks,
    nodeInfo,
    marketcap,
    trend,
    tokenPrice,
  } = useChainNetwork();

  const callSearch = useSearchStore((state) => state.callSearch);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const searchResult = useSearchStore((state) => state.searchResults);

  const newFavourite = useFavouritesStore((state) => state.newFavourite);

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
            <Icon className={'mt-px'} color={'inherit'} icon={trend < 0 ? 'TrendDown' : 'TrendUp'} size={'xs'} />
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
      searchResults={searchResult}
      setSearchResults={setSearchResults}
      newFavourite={newFavourite}
    />
  );
};

'use client';
import { Topbar } from '@repo/ui/organisms';
import { MenuItemProps } from '@repo/ui/atoms';
import { kpisObject } from '../../utils/constants.tsx';
import { useChainNetwork } from '../../providers/chainNetworkProvider.tsx';
import { useSearchStore } from '../../store/searchStore.ts';

interface TopbarClientProps {
  logo: {
    logoSrc: string;
    altText: string;
    logoText: string;
  };
  mobileMenuItems: Omit<MenuItemProps, 'subMenu'>[];
}

export const TopbarClient = ({ logo, mobileMenuItems }: TopbarClientProps) => {
  const { currentChain, setCurrentChain, currentNetwork, setCurrentNetwork, chains, networks } =
    useChainNetwork();

  const callSearch = useSearchStore((state) => state.callSearch);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const searchResult = useSearchStore((state) => state.searchResults);

  return (
    <Topbar
      chainNetworkData={{
        currentChain,
        setCurrentChain,
        currentNetwork: {
          connected: true,
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
      callSearch={callSearch}
    />
  );
};

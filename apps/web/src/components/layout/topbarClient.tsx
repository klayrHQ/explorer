'use client';
import { Topbar } from '@repo/ui/organisms';
import {
  Icon,
  MenuItemProps,
  Modal,
  SkeletonComponent,
  Snackbar,
  Typography,
} from '@repo/ui/atoms';
import { useSearchStore } from '../../store/searchStore.ts';
import React, { useEffect, useState } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { useFavouritesStore } from '../../store/favouritesStore.ts';
import { useChainNetworkStore, useInitializeCurrentChain } from '../../store/chainNetworkStore.ts';
import { useNodeStore, useUpdateNodeInfo } from '../../store/nodeStore.ts';
import useMarketcap from '../../utils/hooks/useMarketcap.ts';
import { FormattedValue } from '../formattedValue.tsx';
import { SettingsContainer } from '@repo/ui/organisms';
import { useSettings } from '../../store/settingsStore.ts';
import { currencies } from '../../utils/constants.tsx';

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
  useUpdateNodeInfo();
  const {
    // marketcap,
    trend,
    tokenPrice,
  } = useMarketcap();

  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);
  const filteredChains = useChainNetworkStore((state) => state.chains);
  const networks = useChainNetworkStore((state) => state.networks);

  console.log({ filteredChains });

  const nodeInfo = useNodeStore((state) => state.nodeInfo);

  const callSearch = useSearchStore((state) => state.callSearch);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const searchResult = useSearchStore((state) => state.searchResults);

  const newFavourite = useFavouritesStore((state) => state.newFavourite);
  const basePath = useBasePath();
  const { settings, setSetting } = useSettings();
  const currencySettings = settings.currency;

  const [mantissaSize, setMantissaSize] = useState<number | string>(currencySettings.mantissaSize);
  const [decimalSeparator, setDecimalSeparator] = useState<string>(
    currencySettings.decimalSeparator,
  );
  const [formatting, setFormatting] = useState<string[]>(currencySettings.formatting);
  const [trailingZeroes, setTrailingZeroes] = useState<boolean>(currencySettings.trailingZeroes);

  const onSaveSettings = () => {
    setSetting('currency', {
      mantissaSize,
      decimalSeparator,
      formatting,
      trailingZeroes,
    });
    setShowSnackbar(true);
    setOpenSettings(false);
  };

  useEffect(() => {
    setMantissaSize(currencySettings.mantissaSize);
    setDecimalSeparator(currencySettings.decimalSeparator);
    setFormatting(currencySettings.formatting);
    setTrailingZeroes(currencySettings.trailingZeroes);
  }, [settings]);

  const kpisObject = [
    {
      keyValue: 'Height: ',
      contentValue: nodeInfo?.height ? (
        <FormattedValue
          value={nodeInfo?.height}
          format={'number'}
          typographyProps={{ fontWeight: 'medium' }}
        />
      ) : (
        <SkeletonComponent width={'16'} height={'4'} />
      ),
      className: 'hidden desktop:flex',
    },
    {
      keyValue: 'KLY: ',
      contentValue: (
        <Typography
          className={'inline-flex items-center gap-1'}
          color={'gray-5'}
          variant={'paragraph-sm'}
          fontWeight={'medium'}
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
    /*{
      keyValue: ' test',
      contentValue: (
        <button
          onClick={() =>
            console.log(
              'chains',
              filteredChains,
              '\n currentChain',
              currentChain,
              '\n networks',
              networks,
              '\n currentNetwork',
              currentNetwork,
            )
          }
        >
          test
        </button>
      ),
    },*/
    //todo - uncomment when marketcap is available (awaiting verification)
    /*{
      keyValue: 'MC: ',
      contentValue: `$${parseFloat(marketcap.toFixed(2)).toLocaleString()}`,
    },*/
  ];

  const [openSettings, setOpenSettings] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const optionsMenuItems: MenuItemProps[] = [
    {
      icon: 'CoinsStacked',
      label: 'Currency Settings',
      onClick: () => setOpenSettings(true),
    },
  ];

  return (
    <>
      <Topbar
        basePath={basePath}
        callSearch={callSearch}
        chainNetworkData={{
          currentChain,
          currentNetwork: {
            syncing: nodeInfo?.syncing,
            networkName: currentNetwork,
          },
          chains: filteredChains,
          networks,
        }}
        kpis={kpisObject}
        logo={logo}
        mobileMenuItems={mobileMenuItems}
        newFavourite={newFavourite}
        optionsMenuItems={optionsMenuItems}
        setOpenSettings={setOpenSettings}
        searchResults={searchResult}
        setSearchResults={setSearchResults}
      />
      <Modal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        title={'Select your preferable Currency!'}
        subTitle={'Format the way the explorer shows all currency values.'}
        width={'settingsModalWidth'}
      >
        <SettingsContainer
          onClose={() => setOpenSettings(false)}
          onSave={onSaveSettings}
          mantissaSize={mantissaSize}
          setMantissaSize={setMantissaSize}
          decimalSeparator={decimalSeparator}
          setDecimalSeparator={setDecimalSeparator}
          formatting={formatting}
          setFormatting={setFormatting}
          trailingZeroes={trailingZeroes}
          setTrailingZeroes={setTrailingZeroes}
          currencies={currencies}
          selectedCurrency={currencies[0].label}
        />
      </Modal>
      <Snackbar
        autoHideDuration={3000}
        open={showSnackbar}
        title={'Settings saved'}
        text={'Your settings have been saved succesfully'}
        variant={'success'}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
};

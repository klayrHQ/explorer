'use client';
import { ReactNode, useEffect, useState } from 'react';
import { FlexGrid, Grid, IconButton, Typography } from '@repo/ui/atoms';
import { Sidebar, InfoBanner } from '@repo/ui/organisms';
import { cls } from '@repo/ui/utils';
import { TopbarClient } from './topbarClient.tsx';
import { logo } from '../../utils/constants.tsx';
import { usePathname } from 'next/navigation';
import { useChainNetwork } from '../../providers/chainNetworkProvider.tsx';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { chains } = useChainNetwork();
  const pathName = usePathname();
  const firstSubDir = pathName.split('/')[1];
  const [basePath, setBasePath] = useState<string>('');
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
    const basePath = !chainMatch || firstSubDir === 'klayr-main' ? '' : `/${firstSubDir}`;
    setBasePath(basePath);
  }, [chains]);

  const mobileMenuItems = [
    {
      label: 'Dashboard',
      icon: 'BarChartSquare',
      href: `/`,
    },
    {
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      href: `/transactions`,
    },
    {
      label: 'Users',
      icon: 'Users',
      href: `/users`,
    },
    {
      label: 'Validators',
      icon: 'Flag',
      href: `/validators`,
    },
    {
      label: 'Blocks',
      icon: 'Cube',
      href: `/blocks`,
    },
    {
      label: 'Tokens',
      icon: 'CryptoCurrency',
    },
    {
      label: 'Nodes',
      icon: 'MarkerPin',
    },
    {
      label: 'Stakes',
      icon: 'LayersThree',
      href: `/stakes`,
    },
    {
      label: 'Chains',
      icon: 'Data',
    },
    {
      label: 'NFTs',
      icon: 'Image',
    },
  ];

  const subMenu = [
    {
      label: 'Users',
      icon: 'Users',
      href: `/users`,
    },
    {
      label: 'Validators',
      icon: 'Flag',
      href: `/validators`,
    },
    {
      label: 'Blocks',
      icon: 'Cube',
      href: `/blocks`,
    },
    {
      label: 'Tokens',
      icon: 'CryptoCurrency',
      disabled: true,
    },
    {
      label: 'Nodes',
      icon: 'MarkerPin',
      disabled: true,
    },
  ];

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'BarChartSquare',
      href: `/`,
    },
    {
      label: 'Blockchain',
      icon: 'DataFlow',
      subMenu,
    },
    {
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      href: `/transactions`,
    },
    {
      label: 'Stakes',
      icon: 'LayersThree',
      href: `/stakes`,
    },
    {
      label: 'Chains',
      icon: 'Data',
      disabled: true,
    },
    {
      label: 'NFTs',
      icon: 'Image',
      disabled: true,
    },
  ];

  return (
    <>
      {/* todo remove infobanner when ready */}
      {showInfoBanner && (
        <InfoBanner>
          <FlexGrid alignItems={'center'} gap={'1.5xl'} justify={'between'} mobileDirection={'row'}>
            <Typography color={'currentColor'} variant={'paragraph-sm'}>
              <span aria-label="warning" className="mr-3" role="img">
                ⚠️
              </span>
              {`Urgent Notice:  This is a development environment, and `}
              <span className="font-semibold">{`data is currently unreliable `}</span>
              {`due to ongoing work. `}
            </Typography>

            {isMounted && window?.location.hostname === 'localhost' && (
              <IconButton
                className={'desktop:absolute right-xl'}
                color={'onSecondary'}
                icon={'CrossClose'}
                onClick={() => setShowInfoBanner(false)}
                variant={'transparent'}
              />
            )}
          </FlexGrid>
        </InfoBanner>
      )}
      <FlexGrid className={'bg-backgroundDark'} direction={'row'} gap={'0'}>
        <Sidebar basePath={basePath} logo={logo} menuItems={menuItems} />
        <Grid className={'w-full overflow-hidden'} gap={'0'}>
          <TopbarClient logo={logo} mobileMenuItems={mobileMenuItems} />
          <main
            className={cls([
              'w-full h-screenUnderTopbarMobile desktop:h-screenUnderTopbar bg-background p-6 desktop:p-8',
              'overflow-y-auto overflow-x-hidden',
              'border-t-backgroundSecondary border-t-1 border-solid',
              'desktop:border-l-backgroundSecondary desktop:border-l-1',
              'desktop:rounded-tl-3xl',
            ])}
          >
            {children}
          </main>
        </Grid>
      </FlexGrid>
    </>
  );
};

'use client';
import { ReactNode } from 'react';
import { FlexGrid, Grid, Typography } from '@repo/ui/atoms';
import { Sidebar, InfoBanner } from '@repo/ui/organisms';
import { cls } from '@repo/ui/utils';
import { TopbarClient } from './topbarClient.tsx';
import { logo } from '../../utils/constants.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';

export const Layout = ({ children }: { children: ReactNode }) => {
  const basePath = useBasePath();

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
      label: 'Top Accounts',
      icon: 'Users',
      href: `/top-accounts`,
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
      href: `/tokens`,
    },
    {
      label: 'Nodes',
      icon: 'MarkerPin',
      href: `/nodes`,
    },
    {
      label: 'Stakes',
      icon: 'LayersThree',
      href: `/stakes`,
    },
    {
      label: 'Chains',
      icon: 'Data',
      href: `/chains`,
    },
    {
      label: 'NFTs',
      icon: 'Image',
      href: `/nfts`,
    },
  ];

  const subMenu = [
    {
      label: 'Top Accounts',
      icon: 'Users',
      href: `/top-accounts`,
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
      href: `/tokens`,
    },
    {
      label: 'Nodes',
      icon: 'MarkerPin',
      href: `/nodes`,
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
      href: `/chains`,
    },
    {
      label: 'NFTs',
      icon: 'Image',
      href: `/nfts`,
    },
  ];

  return (
    <Grid gap={'0'}>
      <FlexGrid className={'bg-backgroundDark'} direction={'row'} gap={'0'}>
        <Sidebar basePath={basePath} logo={logo} menuItems={menuItems} />
        <Grid className={'w-full overflow-hidden h-full'} gap={'0'}>
          <TopbarClient logo={logo} mobileMenuItems={mobileMenuItems} />
          <main
            className={cls([
              'w-full h-screenUnderTopbarMobile desktop:h-screenUnderTopbar bg-background p-6 desktop:p-8 max-h-full',
              'overflow-y-auto overflow-x-hidden',
              'border-t-backgroundSecondary border-t-1 border-solid',
              'desktop:border-l-backgroundSecondary desktop:border-l-1',
              'desktop:rounded-tl-3xl',
            ])}
          >
            <InfoBanner className={'mb-3xl rounded-md'}>
              <FlexGrid
                alignItems={'center'}
                gap={'1.5xl'}
                justify={'between'}
                mobileDirection={'row'}
              >
                <Typography color={'currentColor'} variant={'paragraph-sm'}>
                  <span aria-label="warning" className="mr-3" role="img">
                    ⚠️
                  </span>
                  {`Urgent Notice:  This is a development environment, and `}
                  <span className="font-semibold">{`data is currently unreliable `}</span>
                  {`due to ongoing work. `}
                </Typography>
              </FlexGrid>
            </InfoBanner>
            {children}
          </main>
        </Grid>
      </FlexGrid>
    </Grid>
  );
};

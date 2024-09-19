'use client'
import {ReactNode, useEffect, useState} from 'react';
import { FlexGrid, Grid } from '@repo/ui/atoms';
import { Sidebar } from '@repo/ui/organisms';
import { cls } from '@repo/ui/utils';
import { TopbarClient } from './topbarClient.tsx';
import { logo } from '../../utils/constants.tsx';
import {DefaultLinkComponent} from "storybook/stories/utils/constants.tsx";
import {usePathname} from "next/navigation";
import {useChainNetwork} from "../../providers/chainNetworkProvider.tsx";

export const Layout = ({ children }: { children: ReactNode }) => {
  const {chains} = useChainNetwork();
  const pathName = usePathname();
  const firstSubDir = pathName.split('/')[1];
  const [basePath, setBasePath] = useState<string>('');

  useEffect(() => {
    const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
    const basePath = !chainMatch || firstSubDir === 'klayr-main' ? '' : `/${firstSubDir}`;
    setBasePath(basePath)
  }, [chains]);

  const mobileMenuItems = [
    {
      label: 'Dashboard',
      icon: 'BarChartSquare',
      href: `${basePath}/`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      href: `${basePath}/transactions`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Users',
      icon: 'Users',
      href: `${basePath}/users`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Validators',
      icon: 'Flag',
      href: `${basePath}/validators`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Blocks',
      icon: 'Cube',
      href: `${basePath}/blocks`,
      linkComponent: DefaultLinkComponent,
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
      href: `${basePath}/stakes`,
      linkComponent: DefaultLinkComponent,
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
      href: `${basePath}/users`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Validators',
      icon: 'Flag',
      href: `${basePath}/validators`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Blocks',
      icon: 'Cube',
      href: `${basePath}/blocks`,
      linkComponent: DefaultLinkComponent,
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
        href: `${basePath}/`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Blockchain',
      icon: 'DataFlow',
      subMenu,
    },
    {
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      href: `${basePath}/transactions`,
      linkComponent: DefaultLinkComponent,
    },
    {
      label: 'Stakes',
      icon: 'LayersThree',
      href: `${basePath}/stakes`,
      linkComponent: DefaultLinkComponent,
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
  );
};

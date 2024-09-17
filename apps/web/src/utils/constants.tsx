import { Icon, Typography } from '@repo/ui/atoms';
import Logo from '../assets/images/logo.svg';
import LogoText from '../assets/images/logoText.svg';
import { DefaultLinkComponent, DefaultImageComponent } from 'storybook/stories/utils/constants.tsx';
import { ColorType } from '@repo/ui/types';
import React from 'react';

export const currencies = [
  {
    sign: 'Ҝ',
    symbol: 'KLY',
  },
  {
    sign: '$',
    symbol: 'USD',
  },
];

// todo get from settings when available
export const currentCurrency = currencies[0];

export const mobileMenuItems = [
  {
    label: 'Dashboard',
    icon: 'BarChartSquare',
    href: '/',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Transactions',
    icon: 'SwitchHorizontal',
    href: '/transactions',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Users',
    icon: 'Users',
    href: '/users',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Validators',
    icon: 'Flag',
    href: '/validators',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Blocks',
    icon: 'Cube',
    href: '/blocks',
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
    href: '/stakes',
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

export const subMenu = [
  {
    label: 'Users',
    icon: 'Users',
    href: '/users',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Validators',
    icon: 'Flag',
    href: '/validators',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Blocks',
    icon: 'Cube',
    href: '/blocks',
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

export const menuItems = [
  {
    label: 'Dashboard',
    icon: 'BarChartSquare',
    href: '/',
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
    href: '/transactions',
    linkComponent: DefaultLinkComponent,
  },
  {
    label: 'Stakes',
    icon: 'LayersThree',
    href: '/stakes',
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

export const kpisObject = [
  {
    keyValue: 'KLY: ',
    contentValue: (
      <Typography
        className={'inline-flex items-center gap-1'}
        color={'gray-5'}
        variant={'paragraph-sm'}
      >
        {'$181.66'}
        <span
          className={'text-green text-paragraph-sm font-semibold inline-flex items-center gap-1'}
        >
          <Icon className={'mt-px'} color={'inherit'} icon={'TrendUp'} size={'xs'} />
          {'0.3%'}
        </span>
      </Typography>
    ),
  },
  {
    keyValue: 'MC: ',
    contentValue: '$27.324',
  },
];

export const chainNetworkData = {
  currentChain: {
    chainName: 'Klayr',
    chainId: '00000000',
    logo: Logo.src,
  },
  currentNetwork: {
    networkName: 'Testnet',
    networkId: '01000000',
    connected: true,
  },
  imgComponent: 'a',
};

export const optionsMenuItems = [
  {
    label: 'Enable Light mode',
    icon: 'Sun',
  },
  {
    label: 'Set Currency',
    icon: 'CurrencyDollar',
  },
];

export const logo = {
  altText: 'Klayr',
  logoSrc: Logo.src,
  logoText: 'Klayr',
  logoFullSrc: LogoText.src,
};

export const performanceStatsSelectOptions = [
  { value: 'oneHourAgo', label: 'One hour ago' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'lastWeek', label: 'Last week' },
  { value: 'lastMonth', label: 'Last month' },
  { value: 'lastYear', label: 'Last year' },
];

export const calculatorOptions = [
  { value: 'block', label: 'Block' },
  { value: 'day', label: 'Day' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export const performanceStats = [
  {
    title: 'Total Revenue',
    value: '$ 1,204,000',
    percentage: '20%',
    statsVS: 'vs last month',
    trend: true,
  },
  {
    title: 'Total locked',
    value: '32.633 KLY ',
    percentage: '9.3%',
    statsVS: 'vs last month',
    trend: false,
  },
  {
    title: 'Total Revenue',
    value: '$ 1,204,000',
    percentage: '20%',
    statsVS: 'vs last month',
    trend: true,
  },
  {
    title: 'Total locked',
    value: '32.633 KLY ',
    percentage: '9.3%',
    statsVS: 'vs last month',
    trend: false,
  },
  {
    title: 'Total Revenue',
    value: '$ 1,204,000',
    percentage: '20%',
    statsVS: 'vs last month',
    trend: true,
  },
];

export const defaultChain = {
  chainName: 'Klayr-main',
  chainId: '00000000',
  logo: 'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  networks: [
    {
      networkName: 'mainnet',
      networkId: '00000000',
    },
    {
      networkName: 'testnet',
      networkId: '01000000',
    },
  ],
};

export const decimals = 3;

export const commandColors: Record<string, ColorType> = {
  transfer: 'volt',
  stake: 'azule',
  claimRewards: 'tulip',
  unlock: 'gray-1',
  changeCommission: 'green',
};

export const newsTagColors: Record<string, string> = {
  blockchain: 'tulipDark',
  grants: 'sandDark',
  development: 'lobsterDark',
  community: 'azuleDark',
  'klayr-labs': 'voltDark',
  tokenomics: 'greenDark',
  // Add more tag-to-color mappings as needed
};

import { Icon, Typography } from '@repo/ui/atoms';
import Logo from '../assets/images/logo.svg';
import LogoText from '../assets/images/logoText.svg';
import { ColorType } from '@repo/ui/types';
import React from 'react';
import { ChainTokenType, ChainType } from './types';

export const currencies = [
  {
    sign: 'Ҝ',
    symbol: 'KLY',
    label: 'Klayr',
  },
  {
    label: 'Euro',
    sign: '€',
    symbol: 'EUR',
  },
  {
    label: 'Dollar',
    sign: '$',
    symbol: 'USD',
  },
  {
    label: 'Pound',
    sign: '£',
    symbol: 'GBP',
  },
  {
    label: 'Yen',
    sign: '¥',
    symbol: 'JPY',
  },
  {
    label: 'Rupee',
    sign: '₹',
    symbol: 'INR',
  },
];

// todo get from settings when available
export const currentCurrency = currencies[0];

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

export const defaultChain: ChainType = {
  chainID: '00000000',
  chainName: 'klayr_mainchain',
  displayName: 'Klayr',
  title: 'Klayr - Mainnet',
  status: 'activated',
  description: 'Metadata configuration for the Klayr blockchain (mainchain) in mainnet',
  networkType: 'mainnet',
  isDefault: false,
  genesisURL:
    'https://github.com/KlayrHQ/klayr-core/blob/development/config/mainnet/genesis_assets.json',
  projectPage: 'https://klayr.xyz',
  appPage: 'https://klayr.xyz',
  backgroundColor: '#EDEDCE',
  serviceURLs: [
    {
      http: `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
      ws: `wss://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET}`,
      apiCertificatePublicKey: '',
    },
  ],
  logo: {
    png: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/mainnet/Klayr/images/application/klayr.png',
    svg: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/mainnet/Klayr/images/application/klayr.svg',
  },
  explorers: [
    {
      url: 'https://explorer.klayr.dev/',
      txnPage: 'https://explorer.klayr.dev/transactions',
    },
  ],
  appNodes: [
    {
      url: 'https://mainnet.klayr.xyz',
      maintainer: 'Klayr Labs B.V.',
      apiCertificatePublicKey: '',
    },
    {
      url: 'wss://mainnet.klayr.xyz',
      maintainer: 'Klayr Labs B.V.',
      apiCertificatePublicKey: '',
    },
  ],
};

export const defaultChainToken: ChainTokenType = {
  chainName: 'klayr_mainchain',
  networkType: 'mainnet',
  tokenID: '0000000000000000',
  chainID: '00000000',
  tokenName: 'Klayr',
  description: 'Default token for the entire Klayr ecosystem',
  symbol: 'KLY',
  displayDenom: 'kly',
  baseDenom: 'beddows',
  logo: {
    png: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/mainnet/Klayr/images/tokens/klayr.png',
    svg: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/mainnet/Klayr/images/tokens/klayr.svg',
  },
  denomUnits: [
    {
      denom: 'beddows',
      decimals: 0,
      aliases: ['Beddows'],
    },
    {
      denom: 'kly',
      decimals: 8,
      aliases: ['Klayr'],
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

export const mobileMenuItems = [
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
    icon: 'CoinsStacked',
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
    /*href: `/nfts`,*/
    disabled: true,
  },
];

export const subMenu = [
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
    icon: 'CoinsStacked',
    href: `/tokens`,
  },
  {
    label: 'Nodes',
    icon: 'MarkerPin',
    href: `/nodes`,
  },
];

export const menuItems = [
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
    /*href: `/nfts`,*/
    disabled: true,
  },
];

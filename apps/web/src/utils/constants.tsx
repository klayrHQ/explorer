import { Icon, Typography } from '@repo/ui/atoms';
import Logo from '../assets/images/logo.svg';
import LogoText from '../assets/images/logoText.svg';
import { ColorType } from '@repo/ui/types';
import React from 'react';
import { ChainTokenType, ChainType } from './types';
import Placeholder from '../assets/images/placeholder.png';

export const nextAPIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/';
export const serviceMainnetURL =
  process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET || 'service.klayr.xyz';
export const serviceTestnetURL =
  process.env.NEXT_PUBLIC_KLAYR_SERVICE_TESTNET || 'testnet-service.klayr.xyz';
export const serviceAPIVersion = process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION || 'v3';
export const explorerURL = process.env.NEXT_PUBLIC_KLAYR_EXPLORER_URL || 'explorer.klayr.xyz';

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

export const defaultUnknownChain: ChainType = {
  title: '{Unknown}',
  displayName: '{Unknown}',
  description: '',
  chainName: '{Unknown}',
  chainID: 'XXXXXXXX',
  networkType: '',
  genesisURL: '',
  projectPage: '',
  appPage: '',
  isDefault: false,
  status: '',
  logo: {
    png: Placeholder.src,
    svg: '',
  },
  backgroundColor: '',
  serviceURLs: [],
  explorers: [],
  appNodes: [],
};

export const defaultChain: ChainType = {
  chainID: '00000000',
  chainName: 'klayr_mainchain',
  displayName: 'Klayr',
  title: 'Klayr - Mainnet',
  status: 'activated',
  description: 'Metadata configuration for the Klayr blockchain (mainchain) in mainnet',
  networkType: 'mainnet',
  isDefault: true,
  genesisURL:
    'https://github.com/KlayrHQ/klayr-core/blob/development/config/mainnet/genesis_assets.json',
  projectPage: 'https://klayr.xyz',
  appPage: 'https://klayr.xyz',
  backgroundColor: '#EDEDCE',
  serviceURLs: [
    {
      http: `https://${serviceMainnetURL}`,
      ws: `wss://${serviceMainnetURL}`,
      apiCertificatePublicKey: '',
    },
  ],
  logo: {
    png: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/mainnet/Klayr/images/application/klayr.png',
    svg: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/mainnet/Klayr/images/application/klayr.svg',
  },
  explorers: [
    {
      url: `https://${explorerURL}/`,
      txnPage: `https://${explorerURL}/transactions`,
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

export const defaultTestnetChain: ChainType = {
  chainName: 'klayr_mainchain',
  displayName: 'Klayr',
  chainID: '01000000',
  title: 'Klayr - Testnet',
  description: 'Metadata configuration for the Klayr blockchain (mainchain) in testnet',
  networkType: 'testnet',
  isDefault: true,
  status: 'activated',
  genesisURL:
    'https://github.com/KlayrHQ/klayr-core/blob/development/config/testnet/genesis_assets.json',
  projectPage: 'https://klayr.xyz',
  appPage: 'https://klayr.xyz',
  serviceURLs: [
    {
      http: 'https://testnet-service.klayr.xyz',
      ws: 'wss://testnet-service.klayr.xyz',
      apiCertificatePublicKey:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoWCLObWsqufJm3aOSigy\nvc+kpjE2058UtgBgNfqp7nfcHePMzSpLZrLiILN8m5y0E4UYT4ywLSe7nzzbmLEW\n+BTSItaAPP/cOLPA89VhbmEDQJa2ndfGT5CGP++duvlQ6yH0JHdOkwIpr+o7Mjvs\nSfgIMtALtm5uNOGN4sJSFoNPjXDpskgHi6rOXXifN89wXx38KNCll+tlzUFjOtLR\nZI8ykq+5TDtS9NBJKqIHS3xIQXpXHK63mA9ogmmMwN/4cPh8S+vVUigzdorH6+4m\nFSdE+KfZHc+eK5mr+FfCRJOo6PKMCEeAM1ykBvyX93PwqCndeM+ldL2/EfQvijN+\n+wIDAQAB\n-----END PUBLIC KEY-----',
    },
  ],
  logo: {
    png: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/testnet/Klayr/images/application/klayr.png',
    svg: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/testnet/Klayr/images/application/klayr.svg',
  },
  explorers: [
    {
      url: 'https://testnet-explorer.klayr.xyz',
      txnPage: 'https://testnet-explorer.klayr.xyz/transactions',
    },
  ],
  appNodes: [
    {
      url: 'https://testnet.klayr.xyz',
      apiCertificatePublicKey:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoWCLObWsqufJm3aOSigy\nvc+kpjE2058UtgBgNfqp7nfcHePMzSpLZrLiILN8m5y0E4UYT4ywLSe7nzzbmLEW\n+BTSItaAPP/cOLPA89VhbmEDQJa2ndfGT5CGP++duvlQ6yH0JHdOkwIpr+o7Mjvs\nSfgIMtALtm5uNOGN4sJSFoNPjXDpskgHi6rOXXifN89wXx38KNCll+tlzUFjOtLR\nZI8ykq+5TDtS9NBJKqIHS3xIQXpXHK63mA9ogmmMwN/4cPh8S+vVUigzdorH6+4m\nFSdE+KfZHc+eK5mr+FfCRJOo6PKMCEeAM1ykBvyX93PwqCndeM+ldL2/EfQvijN+\n+wIDAQAB\n-----END PUBLIC KEY-----',
      maintainer: 'Klayr Labs B.V.',
    },
    {
      url: 'wss://testnet.klayr.xyz',
      apiCertificatePublicKey:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoWCLObWsqufJm3aOSigy\nvc+kpjE2058UtgBgNfqp7nfcHePMzSpLZrLiILN8m5y0E4UYT4ywLSe7nzzbmLEW\n+BTSItaAPP/cOLPA89VhbmEDQJa2ndfGT5CGP++duvlQ6yH0JHdOkwIpr+o7Mjvs\nSfgIMtALtm5uNOGN4sJSFoNPjXDpskgHi6rOXXifN89wXx38KNCll+tlzUFjOtLR\nZI8ykq+5TDtS9NBJKqIHS3xIQXpXHK63mA9ogmmMwN/4cPh8S+vVUigzdorH6+4m\nFSdE+KfZHc+eK5mr+FfCRJOo6PKMCEeAM1ykBvyX93PwqCndeM+ldL2/EfQvijN+\n+wIDAQAB\n-----END PUBLIC KEY-----',
      maintainer: 'Klayr Labs B.V.',
    },
  ],
  backgroundColor: '#EDEDCE',
  blockchainApp: {
    status: 'activated',
  },
};

export const defaultUnknownChainToken: ChainTokenType = {
  chainName: '{Unknown}',
  networkType: '',
  tokenID: 'XXXXXXXXXXXXXXXX',
  chainID: 'XXXXXXXX',
  tokenName: '{Unknown}',
  description: '',
  symbol: '',
  displayDenom: '',
  baseDenom: '',
  logo: {
    png: Placeholder.src,
    svg: '',
  },
  denomUnits: [],
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

export const defaultTestnetChainToken: ChainTokenType = {
  chainID: '01000000',
  chainName: 'klayr_mainchain',
  tokenID: '0100000000000000',
  tokenName: 'Klayr',
  networkType: 'testnet',
  description: 'Default token for the entire Klayr ecosystem',
  logo: {
    png: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/testnet/Klayr/images/tokens/klayr.png',
    svg: 'https://raw.githubusercontent.com/KlayrHQ/app-registry/main/testnet/Klayr/images/tokens/klayr.svg',
  },
  symbol: 'KLY',
  displayDenom: 'kly',
  baseDenom: 'beddows',
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

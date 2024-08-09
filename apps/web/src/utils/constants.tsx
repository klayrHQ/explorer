import { Icon, SkeletonComponent, Typography } from '@repo/ui/atoms';
import Logo from '../assets/images/logo.svg';
import LogoText from '../assets/images/logoText.svg';
import Image from 'next/image';
import { DefaultLinkComponent } from 'storybook/stories/utils/constants.tsx';
import { ColorType, TableCellType } from '@repo/ui/types';
import React from 'react';

export const DefaultImageComponent = <Image alt={''} height={'1'} src={''} width={'1'} />;

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

export const newsItems = [
  {
    badges: [
      { colorVariant: 'voltDark', label: 'Development' },
      { colorVariant: 'azuleDark', label: 'Marketing' },
      { colorVariant: 'tulipDark', label: 'Blockchain' },
    ],
    author: 'Lara Malta',
    date: '23 Apr 2024',
    title: 'Exploring the blockchain',
    description:
      'Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti dolor sol amit ultrices elementum orci scelerisque orci scelerisque',
    src: 'https://img.freepik.com/free-vector/hand-drawn-tropical-sunset-background_23-2150672384.jpg?w=1800&t=st=1718192811~exp=1718193411~hmac=73b07debd78a9bb9b80db43c74f8af0ed2f8915fa88215fe4776c5399143801d',
    alt: 'NFT Image',
  },
  {
    badges: [
      { colorVariant: 'sandDark', label: 'NFTs' },
      { colorVariant: 'azuleDark', label: 'Marketing' },
    ],
    author: 'Jurre Machielsen',
    date: '12 Mar 2022',
    title: 'Launch of Klayr token',
    description:
      'Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti.Praesent placerat lobortis tempor. Aliquam interdum interdum orci scelerisque et',
    src: 'https://img.freepik.com/free-vector/palms-summer-beach-hand-drawn-background_23-2148548699.jpg?w=1800&t=st=1718540089~exp=1718540689~hmac=f53a32931e39b6742af5da975b0f2afc8ba1ccc19693c2e70b9c763f64d50116',
    alt: 'Klayr Token Image',
  },
  {
    badges: [
      { colorVariant: 'greenDark', label: 'Design' },
      { colorVariant: 'voltDark', label: 'Development' },
    ],
    author: 'Lara Malta',
    date: '19 Feb 2022',
    title: 'Migration issues',
    description:
      'Quisque pretium diam id est pellentesque, rutrum ornare dolor blandit. Fusce pulvinar elit sit amet urna aliquet elementum rutrum ornare dolor blandit rutrum ornare dolor blandit',
    src: 'https://img.freepik.com/premium-photo/colorful-illustration-beach-with-beach-chair-palm-tree_881695-43.jpg?w=1800',
    alt: 'Migration Issues Image',
  },
];

export const defaultChain = {
  chainName: 'Klayr-main',
  chainId: '00000000',
  logo: 'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
  networks: [
    {
      networkName: 'Testnet',
      networkId: '01000000',
    },
    {
      networkName: 'Mainnet',
      networkId: '01000001',
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

export const getTableSkeletons = (cells: number) => {
  return Array.from({ length: 10 }, (_) => {
    return {
      cells: Array.from({ length: cells }, (_) => {
        return {
          children: <SkeletonComponent height="6" width="full" />,
        };
      }),
    };
  });
};

export const transactionTableHead: TableCellType[] = [
  {
    children: 'Transaction ID',
  },
  {
    children: 'Height',
  },
  {
    children: 'Date',
  },
  {
    children: 'Type',
  },
  {
    children: 'From',
  },
  {
    children: 'To',
  },
  {
    children: 'Amount',
  },
  {
    children: 'Fee',
  },
];

export const eventsTableHead = [
  {
    children: <Typography variant={'paragraph-sm'}>{'Module'}</Typography>,
  },
  {
    children: <Typography variant={'paragraph-sm'}>{'Name'}</Typography>,
  },
];

export const validatorsTableHead: TableCellType[] = [
  {
    children: 'Validator',
  },
  {
    children: 'Status',
  },
  {
    children: <div className="flex justify-end">{'Total blocks'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Uptime'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Validator weight'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Stake capacity'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Total stake'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Commission'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end">{'Total Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end flex-nowrap">{'Block Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end">{'Staking Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
];

export const validatorsTableSkeleton = getTableSkeletons(validatorsTableHead.length);

export const validatorStakeIncomingTableHead: TableCellType[] = [
  {
    children: 'Account',
  },
  {
    children: 'Amount',
  },
];

export const validatorStakeOutgoingTableHead: TableCellType[] = [
  {
    children: 'Validator',
  },
  {
    children: 'Validator weight',
  },
  {
    children: 'Commission',
  },
  {
    children: 'Stake',
  },
];

import {Icon, Typography} from "@repo/ui/atoms";
import Logo from "../assets/images/logo.svg";
import Image from "next/image";
import {DefaultLinkComponent} from "storybook/stories/utils/constants.tsx";
import {ColorType} from "@repo/ui/types";

export const DefaultImageComponent = <Image alt={""} height={"1"} src={""} width={"1"} />;

export const mobileMenuItems = [
  {
    label: 'Dashboard',
    icon: 'BarChartSquare',
  },
  {
    label: 'Transactions',
    icon: 'SwitchHorizontal',
  },
  {
    label: 'Users',
    icon: 'Users',
  },
  {
    label: 'Validators',
    icon: 'Flag',
  },
  {
    label: 'Blocks',
    icon: 'Cube',
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
  },
  {
    label: 'Blocks',
    icon: 'Cube',
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
  },
  {
    label: 'Blockchain',
    icon: 'DataFlow',
    subMenu,
  },
  {
    label: 'Transactions',
    icon: 'SwitchHorizontal',
    href: "/transactions",
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
    keyValue: "KLY: ",
    contentValue: (
      <Typography className={"inline-flex items-center gap-2"} color={"gray-5"} variant={"paragraph-sm"}>
        {"$181.66"}
        <span className={"text-green text-paragraph-sm inline-flex items-center gap-1"}>
          <Icon className={"mt-px"} color={"inherit"} icon={"TrendUp"} size={"xs"} />
          {"0.3 %"}
        </span>
      </Typography>
    ),
  },
  {
    keyValue: "MC: ",
    contentValue: "$27.324",
  },
];

export const chainNetworkData = {
  currentChain: {
    chainName: "Klayr",
    chainId: "00000000",
    logo: Logo.src,
  },
  currentNetwork: {
    networkName: "Testnet",
    networkId: "01000000",
    connected: true,
  },
  imgComponent: "a",
}

export const optionsMenuItems = [
  {
    label: "Enable Light mode",
    icon: "Sun",
  },
  {
    label: "Set Currency",
    icon: "CurrencyDollar",
  },
];

export const logo = {
  altText: "Klayr",
  logoSrc: Logo.src,
  logoText: "Klayr",
};

export const performanceStatsSelectOptions = [
  { value: "oneHourAgo", label: "One hour ago",},
  { value: "yesterday", label: "Yesterday",},
  { value: "lastWeek", label: "Last week",},
  { value: "lastMonth", label: "Last month",},
  { value: "lastYear", label: "Last year",},
];

export const performanceStats = [
  {
    title: "Total Revenue",
    value: "$ 1,204,000",
    percentage: "20%",
    statsVS: "vs last month",
    trend: true,
  },
  {
    title: "Total locked",
    value: "32.633 KLY ",
    percentage: "9.3%",
    statsVS: "vs last month",
    trend: false,
  },
  {
    title: "Total Revenue",
    value: "$ 1,204,000",
    percentage: "20%",
    statsVS: "vs last month",
    trend: true,
  },
  {
    title: "Total locked",
    value: "32.633 KLY ",
    percentage: "9.3%",
    statsVS: "vs last month",
    trend: false,
  },
  {
    title: "Total Revenue",
    value: "$ 1,204,000",
    percentage: "20%",
    statsVS: "vs last month",
    trend: true,
  },
];

export const newsItems = [
  {
    badges: [{colorVariant: "volt", label: 'Development', }, {colorVariant: "azule", label: 'Marketing',}, {colorVariant: "tulip", label: 'Blockchain',}],
    author: 'Lara Malta',
    date: '23 Apr 2024',
    title: 'Exploring the blockchain',
    description: 'Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti dolor sol amit ultrices elementum orci scelerisque orci scelerisque',
    src: 'https://img.freepik.com/free-vector/hand-drawn-tropical-sunset-background_23-2150672384.jpg?w=1800&t=st=1718192811~exp=1718193411~hmac=73b07debd78a9bb9b80db43c74f8af0ed2f8915fa88215fe4776c5399143801d',
    alt: 'NFT Image',
  },
  {
    badges: [{colorVariant: "sand", label: 'NFTs', }, {colorVariant: "azule", label: 'Marketing',}],
    author: 'Jurre Machielsen',
    date: '12 Mar 2022',
    title: 'Launch of Klayr token',
    description: 'Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti.Praesent placerat lobortis tempor. Aliquam interdum interdum orci scelerisque et',
    src: 'https://img.freepik.com/free-vector/palms-summer-beach-hand-drawn-background_23-2148548699.jpg?w=1800&t=st=1718540089~exp=1718540689~hmac=f53a32931e39b6742af5da975b0f2afc8ba1ccc19693c2e70b9c763f64d50116',
    alt: 'Klayr Token Image',
  },
  {
    badges: [{colorVariant: "green", label: 'Design' ,}, {colorVariant: "volt", label: 'Development',}],
    author: 'Lara Malta',
    date: '19 Feb 2022',
    title: 'Migration issues',
    description: 'Quisque pretium diam id est pellentesque, rutrum ornare dolor blandit. Fusce pulvinar elit sit amet urna aliquet elementum rutrum ornare dolor blandit rutrum ornare dolor blandit',
    src: 'https://img.freepik.com/premium-photo/colorful-illustration-beach-with-beach-chair-palm-tree_881695-43.jpg?w=1800',
    alt: 'Migration Issues Image',
  },
];

export const defaultChain = {
  chainName: "Klayr-main",
  chainId: "00000000",
  logo: "https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g",
  networks: [
    {
      networkName: "Testnet",
      networkId: "01000000",
    },
    {
      networkName: "Mainnet",
      networkId: "01000001",
    },
  ],
};

export const decimals = 3;

export const commandColors: Record<string, ColorType> = {
  transfer: "volt",
  stake: "azule",
  claimRewards: "tulip",
  unlock: "gray-1",
  changeCommission: "green",
}
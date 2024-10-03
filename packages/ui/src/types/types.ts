import { HTMLAttributes, PropsWithChildren, ReactElement, ReactNode } from 'react';

export type TypographyVariant =
  | 'display-1'
  | 'display-2'
  | 'logo'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subheading'
  | 'body'
  | 'paragraph-sm'
  | 'paragraph-md'
  | 'paragraph-lg'
  | 'paragraph-xl'
  | 'footer'
  | 'caption'
  | 'code';

export type TypographyComponent =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'code';

export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

export type IconComponent =
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'ChevronDownDouble'
  | 'ChevronLeftDouble'
  | 'ChevronRightDouble'
  | 'ChevronUpDouble'
  | 'SwitchHorizontal'
  | 'TrendDown'
  | 'TrendUp'
  | 'BarChartSquare'
  | 'Data'
  | 'DataFlow'
  | 'CryptoCurrency'
  | 'Heart'
  | 'HeartFull'
  | 'LogIn'
  | 'SearchLg'
  | 'Settings'
  | 'Image'
  | 'LayersThree'
  | 'Cube'
  | 'ErrorIcon'
  | 'SuccessIcon'
  | 'InfoIcon'
  | 'WarningIcon'
  | 'Flag'
  | 'MarkerPin'
  | 'Users'
  | 'ArrowUpRight'
  | 'CurrencyDollar'
  | 'Sun'
  | 'Menu'
  | 'CrossClose'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'ArrowUp'
  | 'Copy'
  | 'DotsVertical'
  | 'Trash'
  | 'User'
  | 'Plus'
  | 'Eye'
  | 'Info'
  | 'CodeSquare'
  | 'AlertCircle'
  | string;

export type ColorType =
  | 'primary'
  | 'onPrimary'
  | 'secondary'
  | 'onSecondary'
  | 'background'
  | 'backgroundPrimary'
  | 'backgroundSecondary'
  | 'backgroundTertiary'
  | 'backgroundDark'
  | 'backgroundLight'
  | 'volt'
  | 'voltDark'
  | 'azule'
  | 'azuleDark'
  | 'lobster'
  | 'lobsterDark'
  | 'sand'
  | 'sandDark'
  | 'sandDarkOpacity'
  | 'tulip'
  | 'tulipDark'
  | 'green'
  | 'greenDark'
  | 'black'
  | 'white'
  | 'gray-1'
  | 'gray-2'
  | 'gray-3'
  | 'gray-4'
  | 'gray-5'
  | 'gray-6'
  | 'gray-7'
  | 'gray-8'
  | 'shadow-gray-1'
  | 'shadow-gray-2'
  | 'shadow-gray-3'
  | 'shadow-gray-4'
  | 'shadow-gray-5'
  | 'shadow-gray-6'
  | 'shadow-gray-7'
  | 'shadow-gray-8'
  | 'inherit'
  | string;

export type ChainType = {
  chainId: string;
  chainName: string;
  logo: string;
  networks: Omit<NetworkType, 'connected'>[];
};

export type NetworkType = {
  networkId: string;
  networkName: string;
  syncing?: boolean | null;
};

export type TableCellType = {
  className?: string;
  children: ReactNode | null;
} & Omit<HTMLAttributes<HTMLTableCellElement>, 'children' | 'content'>;

export type LinkComponent = PropsWithChildren<ReactElement>;

export type Option = {
  value: string;
  label: string;
  labelIcon?: string;
  labelImage?: string;
  labelCircleColor?: string;
};

export type DataValueType = string | number | boolean | null | object | undefined;

export type DataType = Record<string, DataValueType>;

export interface NextValidatorType {
  address: string;
  name: string;
  publicKey: string;
  nextAllocatedTime: number;
  status: string;
}

//SEARCH TYPES
export interface SearchResultsType {
  accounts?: SearchAccount[];
  blocks?: SearchBlock[];
  transactions?: SearchTransaction[];
}

interface SearchAccount {
  name: string;
  address: string;
  publicKey: string;
  rank: number;
}

interface SearchBlock {
  height: number;
  id: string;
}

interface SearchTransaction {
  id: string;
  sender: string;
}

export interface NewsCardProps {
  badges: { colorVariant?: ColorType; label: string }[];
  author: string;
  date: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  link: string;
}

export type NewsCardPropsArray = NewsCardProps[];

export interface AccountBannerProps {
  senderAddress?: string;
  senderName?: string;
  status: string;
  incomingTransactions: string | number;
  outgoingTransactions: string | number;
  coinRate?: number;
  value?: string | number;
  valueSymbol?: string;
  rank: number | string;
  image: string;
  basePath: string;
  isFavorite: boolean;
  setFavorite: () => void;
  removeFavorite: () => void;

}
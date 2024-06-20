import {HTMLAttributes, ReactNode} from "react";

export type TypographyVariant =
  | "display-1"
  | "display-2"
  | "logo"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subheading"
  | "body"
  | "paragraph-sm"
  | "paragraph-md"
  | "paragraph-lg"
  | "paragraph-xl"
  | "footer"
  | "caption"
  | "code";

export type TypographyComponent =
  | "p"
  | "span"
  | "div"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "code";

export type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

export type IconComponent =
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDownDouble"
  | "ChevronLeftDouble"
  | "ChevronRightDouble"
  | "ChevronUpDouble"
  | "SwitchHorizontal"
  | "TrendDown"
  | "TrendUp"
  | "BarChartSquare"
  | "Data"
  | "DataFlow"
  | "CryptoCurrency"
  | "Heart"
  | "LogIn"
  | "SearchLg"
  | "Settings"
  | "Image"
  | "LayersThree"
  | "Cube"
  | "Flag"
  | "MarkerPin"
  | "Users"
  | "ArrowUpRight"
  | "CurrencyDollar"
  | "Sun"
  | "Menu"
  | string;

export type ColorType =
  | "primary"
  | "onPrimary"
  | "secondary"
  | "onSecondary"
  | "background"
  | "backgroundPrimary"
  | "backgroundSecondary"
  | "backgroundTertiary"
  | "backgroundDark"
  | "backgroundLight"
  | "volt"
  | "voltDark"
  | "azule"
  | "azuleDark"
  | "lobster"
  | "lobsterDark"
  | "sand"
  | "sandDark"
  | "tulip"
  | "tulipDark"
  | "green"
  | "greenDark"
  | "black"
  | "white"
  | "gray-1"
  | "gray-2"
  | "gray-3"
  | "gray-4"
  | "gray-5"
  | "gray-6"
  | "gray-7"
  | "gray-8"
  | "shadow-gray-1"
  | "shadow-gray-2"
  | "shadow-gray-3"
  | "shadow-gray-4"
  | "shadow-gray-5"
  | "shadow-gray-6"
  | "shadow-gray-7"
  | "shadow-gray-8"
  | "inherit";

export type ChainType = {
  chainId: string
  chainName: string
  chainLogo: string
}

export type NetworkType = {
  networkId: string
  networkName: string
  connected: boolean
}

export type TableCellType = {
  className?: string
  content: ReactNode
} & Omit<HTMLAttributes<HTMLTableCellElement>, "children" | "content">;
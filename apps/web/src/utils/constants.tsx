import {Icon, Typography} from "@repo/ui/atoms";
import Logo from "../assets/images/logo.svg";
import Image from "next/image";

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
      <Typography className={"inline-flex items-center"} color={"gray-5"} variant={"paragraph-sm"}>
        {"$181.66"}
        <span className={"text-green text-paragraph-sm inline-flex items-center"}>
          <Icon className={"inline pb-1"} color={"inherit"} icon={"ArrowUpRight"} />
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
    chainName: "Klayr-main",
    chainId: "00000000",
    chainLogo: Logo.src,
  },
  currentNetwork: {
    networkName: "Testnet",
    networkId: "01000000",
    connected: true,
  },
  imgComponent: DefaultImageComponent,
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
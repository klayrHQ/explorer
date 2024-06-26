import {Icon, TableCell, Typography} from "@repo/ui/atoms";
import Logo from "@/stories/assets/images/logo.svg";
import {DefaultImageComponent} from "@/stories/utils/constants";

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

export const rows = Array.from({ length: 5 }, (_, index) => ({
  cells: [
    {
      children: <Typography>{`Cell ${index + 1}.1`}</Typography>,
    },
    {
      children: <Typography>{`Cell ${index + 1}.2`}</Typography>,
    },
    {
      children: <Typography>{`Cell ${index + 1}.3`}</Typography>,
    },
    {
      children: <Typography>{`Cell ${index + 1}.4`}</Typography>,
    },
    {
      children: <Typography>{`Cell ${index + 1}.5`}</Typography>,
    },
  ],
}));

export const rowsAlt = Array.from({ length: 5 }, (_, index) => (
  <>
    <TableCell><Typography>{`Cell ${index + 1}.1`}</Typography></TableCell>
    <TableCell><Typography>{`Cell ${index + 1}.2`}</Typography></TableCell>
    <TableCell><Typography>{`Cell ${index + 1}.3`}</Typography></TableCell>
    <TableCell><Typography>{`Cell ${index + 1}.4`}</Typography></TableCell>
    <TableCell><Typography>{`Cell ${index + 1}.5`}</Typography></TableCell>
  </>
));

export const headCols = [
  {
    children: <Typography color={"inherit"}>{"Header 1"}</Typography>,
  },
  {
    children: <Typography color={"inherit"}>{"Header 2"}</Typography>,
  },
  {
    children: <Typography color={"inherit"}>{"Header 3"}</Typography>,
  },
  {
    children: <Typography color={"inherit"}>{"Header 4"}</Typography>,
  },
  {
    children: <Typography color={"inherit"}>{"Header 5"}</Typography>,
  },
];
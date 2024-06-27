import {Icon, Typography} from "@repo/ui/atoms";
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

export const TransactionsData = {
  id:"a2140ea1cd8b7706fff3c82ac9aacd972985044a00483385bc0755c2471c368b",
  moduleCommand:"token:transfer", // "pos:stake",
  nonce:"1",
  fee:"5166000",
  minFee:"165000",
  size:166,
  block:{
  id:"7b5318b644e4a971feeda50acc29a5e21c1978f57b556ced1bd14b744e568e7d",
  height:10243, // number
  timestamp:1719392318,
  isFinal:true
  },
  sender:{
  address:"klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
  publicKey:"3bad66fd3021e92a8a0ad9fa0430e1f2da756b81628eaa9378f067e026855b43",
  name:null
  },
  params:{
  tokenID:"0000000000000000",
  amount:"1000000000",
  recipientAddress:"klyzgt3wku3tzx2xdfpj7pjqnqbv5x8r55rgd7q5o",
  data:""
  },
  signatures:[
  "894795ecefeeffd4a1b94d6fb907cb2b09c024a0cedaecc265f69b66c46db48f80af2a1b7c6a7b4a8e66c401342381da735d0a16f4e85e39a067fee6d8f7480e"
  ],
  executionStatus:"successful",  //fail
  index:0,
  meta:{
  recipient:{
  address:"klyzgt3wku3tzx2xdfpj7pjqnqbv5x8r55rgd7q5o",
  publicKey:null,
  name:null
  }
  }
  }


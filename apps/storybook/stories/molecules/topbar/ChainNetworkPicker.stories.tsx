import type { StoryObj } from '@storybook/react';
import {ChainNetworkPicker} from "@repo/ui/molecules";
import Logo from "../../assets/images/logo.svg";
import {FlexGrid} from "@repo/ui/atoms";
import Image from "next/image";
import {DefaultImageComponent} from "@/stories/utils/constants";

const meta = {
  title: 'Molecules/Topbar/ChainNetworkPicker',
  component: ChainNetworkPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const Template: Template = {
  render: (args) => (
    <FlexGrid gap={"1.5xl"}>
      <ChainNetworkPicker {...args} />
    </FlexGrid>
  ),
}

export const Connected: Story = {
  ...Template,
  args: {
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
  },
};

export const NotConnected: Story = {
  ...Template,
  args: {
    currentChain: {
      chainName: "Klayr-main",
      chainId: "00000000",
      chainLogo: Logo.src,
    },
    currentNetwork: {
      networkName: "Testnet",
      networkId: "01000000",
      connected: false,
    },
    imgComponent: DefaultImageComponent,
  },
};
import type { StoryObj } from '@storybook/react';
import { ChainNetworkPicker, ChainNetworkPickerProps } from "@repo/ui/molecules";
import React, { useState } from 'react';

export type ChainType = {
  chainId: string;
  chainName: string;
  chainLogo: string;
};

export type NetworkType = {
  networkId: string;
  networkName: string;
  connected: boolean;
};

const meta = {
  title: 'Molecules/Topbar/ChainNetworkPicker',
  component: ChainNetworkPicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const chains: ChainType[] = [
  { chainId: '1', chainName: 'Klayr-main', chainLogo: 'https://explorer.klayr.dev/_next/static/media/logo.f350e9f3.svg' },
  { chainId: '56', chainName: 'Binance', chainLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/254px-Binance_Logo.svg.png?20210315012944' },
];

const networks: NetworkType[] = [
  { networkId: '1', networkName: 'Mainnet', connected: true },
  { networkId: '3', networkName: 'Testnet', connected: false },
  { networkId: '4', networkName: 'Devnet', connected: true },
];

const Template: Template = {
  render: (args) => {
    const [currentChain, setCurrentChain] = useState(args.currentChain);
    const [currentNetwork, setCurrentNetwork] = useState(args.currentNetwork);

    return (
      <ChainNetworkPicker
        {...args}
        currentChain={currentChain}
        setCurrentChain={setCurrentChain}
        currentNetwork={currentNetwork}
        setCurrentNetwork={setCurrentNetwork}
      />
    );
  }
};

export const Main: Story = {
  ...Template,
  args: {
    currentChain: chains[0],
    setCurrentChain: () => {},
    currentNetwork: networks[0],
    setCurrentNetwork: () => {},
    chains,
    networks,
    imgComponent: <img src="https://example.com/placeholder.png" alt="placeholder" />,
    className: '',
  },
};

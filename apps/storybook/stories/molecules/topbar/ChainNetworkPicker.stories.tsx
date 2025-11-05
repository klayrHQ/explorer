/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from '@storybook/react';
import { ChainNetworkPicker, ChainNetworkPickerProps } from '@repo/ui/molecules';
import React, { useState } from 'react';
import { ChainType } from '@repo/ui/types';

export type NetworkType = {
  networkId: string;
  networkName: string;
  connected: boolean;
};

const meta: Meta<typeof ChainNetworkPicker> = {
  title: 'Molecules/Topbar/ChainNetworkPicker',
  component: ChainNetworkPicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, 'args'>;

const chains: ChainType[] = [
  {
    chainID: '1',
    chainName: 'Klayr-main',
    logo: {
      svg: 'https://explorer.klayr.dev/_next/static/media/logo.f350e9f3.svg',
      png: '',
    },
  } as ChainType,
  {
    chainID: '56',
    chainName: 'Binance',
    logo: {
      png: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/254px-Binance_Logo.svg.png?20210315012944',
      svg: '',
    },
  } as ChainType,
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
        // setCurrentChain={setCurrentChain}
        currentNetwork={currentNetwork}
        // setCurrentNetwork={setCurrentNetwork}
      />
    );
  },
};

export const Main: Story = {
  ...Template,
  args: {
    currentChain: chains[0] as ChainType,
    // setCurrentChain: () => {},
    currentNetwork: networks[0],
    // setCurrentNetwork: () => {},
    chains,
    networks: networks.map((network) => network.networkName),
    imgComponent: <img src="https://example.com/placeholder.png" alt="placeholder" />,
    // className: '',
  },
};

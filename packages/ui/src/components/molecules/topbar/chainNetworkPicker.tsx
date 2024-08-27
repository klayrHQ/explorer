'use client';
import React, { useState } from 'react';
import { ChainType, NetworkType } from '../../../types/types.ts';
import { FlexGrid, KeyValueComponent, Typography } from '../../atoms';
import { ImageContainer } from '../../atoms';
import { StatusIcon } from '../../atoms';
import { ReactElement } from 'react';
import { Modal, CustomSelect } from '../../atoms';

export interface ChainNetworkPickerProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentNetwork: NetworkType;
  setCurrentNetwork: (network: NetworkType) => void;
  chains?: ChainType[];
  networks?: NetworkType[];
  imgComponent?: ReactElement;
}

export const ChainNetworkPicker = ({
  currentChain,
  setCurrentChain,
  currentNetwork,
  setCurrentNetwork,
  chains = [],
  networks = [],
  imgComponent,
}: ChainNetworkPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<ChainType | null>(currentChain);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType | null>(currentNetwork);

  const chainOptions = chains?.map((chain) => ({
    label: chain.chainName,
    value: chain.chainId,
    labelImage: chain.logo,
  }));

  const networkOptions = networks?.map((network) => ({
    label: network.networkName,
    value: network.networkId,
  }));

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleChainChange = (chainId: string) => {
    const chain = chains.find((chain) => chain.chainId === chainId);
    if (chain) {
      setSelectedChain(chain);
    }
  };

  const handleNetworkChange = (networkId: string) => {
    const network = networks.find((network) => network.networkId === networkId);
    if (network) {
      setSelectedNetwork(network);
    }
  };

  const handleSave = () => {
    if (selectedChain && selectedNetwork) {
      setCurrentChain(selectedChain);
      setCurrentNetwork(selectedNetwork);
    }
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <FlexGrid>
      <FlexGrid gap="1.5xl" mobileDirection={'row'} onClick={handleOpen}>
        <KeyValueComponent
          contentValue={currentChain?.chainName || 'Select chain'}
          hover
          keyValue={
            <ImageContainer
              alt={currentChain?.chainName}
              component={imgComponent}
              src={currentChain?.logo}
              variant={'chainLogo'}
            />
          }
          onClick={() => setIsModalOpen(true)}
        />
        <KeyValueComponent
          contentValue={currentNetwork?.networkName || 'Select network'}
          hover
          keyValue={<StatusIcon connected={currentNetwork?.connected} />}
        />
      </FlexGrid>
      <Modal
        onClose={handleClose}
        onSave={handleSave}
        open={isModalOpen}
        title="Select environments"
      >
        <FlexGrid alignItems="start" direction="col" gap="4" justify="end">
          <FlexGrid alignItems="center" className={'w-full'} justify="between">
            <Typography color="onBackgroundLow" variant="paragraph-md">
              {'On chain'}
            </Typography>
            <CustomSelect
              defaultValue={currentChain?.chainId}
              onChange={(value) => handleChainChange(value)}
              options={chainOptions}
            />
          </FlexGrid>
          <FlexGrid alignItems={'center'} className="w-full" justify={'between'}>
            <Typography color="onBackgroundLow" variant="paragraph-md">
              {'On network'}
            </Typography>
            <CustomSelect
              defaultValue={currentNetwork?.networkId}
              onChange={(value) => handleNetworkChange(value)}
              options={networkOptions}
            />
          </FlexGrid>
        </FlexGrid>
      </Modal>
    </FlexGrid>
  );
};

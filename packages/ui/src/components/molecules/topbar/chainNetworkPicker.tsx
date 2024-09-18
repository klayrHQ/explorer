'use client';
import React, { useState, useEffect } from 'react';
import { ChainType, NetworkType } from '../../../types/types.ts';
import { FlexGrid, KeyValueComponent, Typography } from '../../atoms';
import { ImageContainer } from '../../atoms';
import { StatusIcon } from '../../atoms';
import { ReactElement } from 'react';
import { CustomModal, CustomSelect } from '../../atoms';
import { NetworkSelect } from './networkSelect.tsx';
import { useRouter, usePathname } from 'next/navigation';

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
  const router = useRouter();
  const pathName = usePathname();
  const firstSubDir = pathName.split('/')[1];
  const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
  const chainSlug = !chainMatch || firstSubDir === 'klayr-main' ? '' : `/${firstSubDir}`;
  const explorerUrl = `explorer.klayr.dev${chainSlug}`;

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
      chain.chainName === 'klayr-main' ? router.push('/') : router.push(`/${chain.chainName}`);
    }
  };

  const handleNetworkChange = (networkId: string) => {
    const network = networks.find((network) => network.networkId === networkId);
    if (network) {
      if (window.location.hostname !== 'localhost') {
        network.networkName === 'mainnet'
          ? router.push(`https://${explorerUrl}`)
          : router.push(`https://${network.networkName}-${explorerUrl}`);
      } else {
        setSelectedNetwork(network);
        setCurrentNetwork(network);
      }
    }
  };

  const handleSave = () => {
    /*if (selectedChain && selectedNetwork) {
      setCurrentChain(selectedChain);
      setCurrentNetwork(selectedNetwork);
    }*/
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  let currentNetworkStatusClass;

  switch (currentNetwork.syncing) {
    case false:
      currentNetworkStatusClass = 'successful';
      break;
    case true:
      currentNetworkStatusClass = 'pending';
      break;
    default:
      currentNetworkStatusClass = 'failed';
  }

  return (
    <FlexGrid gap="1.5xl" mobileDirection="row">
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
      </FlexGrid>
      <CustomModal
        onClose={handleClose}
        onSave={handleSave}
        open={isModalOpen}
        title="Select environments"
      >
        <FlexGrid alignItems="start" direction="col" gap="4" justify="end">
          <FlexGrid
            alignItems="center"
            className={'w-full'}
            justify="between"
            mobileDirection="row"
          >
            <Typography color="onBackgroundLow" variant="paragraph-md">
              {'On chain'}
            </Typography>
            <CustomSelect
              classNameList="border-backgroundTertiary border-t-0"
              defaultValue={currentChain?.chainId}
              onChange={(value) => handleChainChange(value)}
              options={chainOptions}
            />
          </FlexGrid>
          <FlexGrid
            alignItems={'center'}
            className="w-full"
            justify={'between'}
            mobileDirection="row"
          >
            <Typography color="onBackgroundLow" variant="paragraph-md">
              {'On network'}
            </Typography>
            <CustomSelect
              classNameList="border-backgroundTertiary border-t-0"
              defaultValue={currentNetwork?.networkId}
              onChange={(value) => handleNetworkChange(value)}
              options={networkOptions}
            />
          </FlexGrid>
        </FlexGrid>
      </CustomModal>
      <NetworkSelect
        currentNetworkStatusClass={currentNetworkStatusClass}
        defaultValue={currentNetwork?.networkId}
        onChange={(value) => {
          handleNetworkChange(value);
        }}
        options={networkOptions}
        placeholder={currentNetwork?.networkName}
        value={currentNetwork?.networkId}
      />
    </FlexGrid>
  );
};

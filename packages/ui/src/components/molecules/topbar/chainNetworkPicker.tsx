'use client';
import React, { useState } from 'react';
import { ChainType, NetworkType } from '../../../types/types.ts';
import { FlexGrid, KeyValueComponent, Typography } from '../../atoms';
import { ImageContainer } from '../../atoms';
import { ReactElement } from 'react';
import { CustomModal, CustomSelect } from '../../atoms';
import { NetworkSelect } from './networkSelect.tsx';
import { useRouter } from 'next/navigation';

export interface ChainNetworkPickerProps {
  currentChain: ChainType;
  currentNetwork: NetworkType;
  chains?: ChainType[];
  networks?: string[];
  imgComponent?: ReactElement;
}

export const ChainNetworkPicker = ({
  currentChain,
  currentNetwork,
  chains = [],
  networks = [],
  imgComponent,
}: ChainNetworkPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const baseExplorerUrl = `explorer.klayr.dev`;
  const localhostHostnames = ['localhost', 'explorer.localhost', 'testnet-explorer.localhost'];

  const chainOptions = chains?.map((chain) => ({
    label: chain.displayName ?? chain.chainName,
    value: chain.chainName,
    labelImage: chain.logo.png,
  }));

  const networkOptions = networks?.map((network) => ({
    label: network,
    value: network,
  }));

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleChainChange = (chainName: string) => {
    const chain = chains.find((chain) => chain.chainName === chainName);
    if (chain) {
      router.push(`/${chain.chainName}`);
      setIsModalOpen(false);
    }
  };

  const handleNetworkChange = (networkName: string) => {
    const network = networks.find((network) => network === networkName);
    if (network) {
      if (!localhostHostnames.includes(window.location.hostname)) {
        network === 'mainnet'
          ? router.push(`https://${baseExplorerUrl}`)
          : router.push(`https://${network}-${baseExplorerUrl}`);
      } else {
        network === 'mainnet'
          ? router.push(`http://explorer.localhost:${window.location.port}`)
          : router.push(`http://testnet-explorer.localhost:${window.location.port}`);
      }
    }
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
          contentValue={currentChain?.displayName ?? currentChain?.chainName ?? 'Select chain'}
          hover
          keyValue={
            <ImageContainer
              alt={currentChain?.displayName}
              component={imgComponent}
              src={currentChain?.logo.png}
              variant={'chainLogo'}
            />
          }
          onClick={() => setIsModalOpen(true)}
        />
      </FlexGrid>
      <CustomModal onClose={handleClose} open={isModalOpen} title="Select environments">
        <FlexGrid alignItems="start" direction="col" gap="4" justify="end">
          <FlexGrid
            alignItems="center"
            className={'w-full mb-8'}
            justify="between"
            mobileDirection="row"
          >
            <Typography color="onBackgroundLow" variant="paragraph-md">
              {'On chain'}
            </Typography>
            <CustomSelect
              classNameList="border-backgroundTertiary border-t-0"
              defaultValue={currentChain?.chainName}
              onChange={(value) => handleChainChange(value)}
              options={chainOptions}
            />
          </FlexGrid>
        </FlexGrid>
      </CustomModal>
      <NetworkSelect
        currentNetworkStatusClass={currentNetworkStatusClass}
        defaultValue={currentNetwork?.networkName}
        onChange={(value) => {
          handleNetworkChange(value);
        }}
        options={networkOptions}
        placeholder={currentNetwork?.networkName}
        value={currentNetwork?.networkName}
      />
    </FlexGrid>
  );
};

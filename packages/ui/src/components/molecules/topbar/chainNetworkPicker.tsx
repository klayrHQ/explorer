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
import { useBasePath } from '../../../../../../apps/web/src/utils/hooks/useBasePath.ts';

export interface ChainNetworkPickerProps {
  currentChain: ChainType;
  setCurrentChain: (chain: ChainType) => void;
  currentNetwork: NetworkType;
  setCurrentNetwork: (network: string) => void;
  chains?: ChainType[];
  networks?: string[];
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
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(currentNetwork.networkName);
  const router = useRouter();
  const pathName = usePathname();
  const firstSubDir = pathName.split('/')[1];
  const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
  const chainSlug = !chainMatch || firstSubDir === 'klayr-main' ? '' : `/${firstSubDir}`;
  const explorerUrl = `explorer.klayr.dev${chainSlug}`;
  const baseExplorerUrl = `explorer.klayr.dev`;

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
    console.log('chainName',chainName, '\nchains', chains);
    if (chain) {
      const chainNetwork = chain.networkType;
      if (window.location.hostname !== 'localhost') {
        chainNetwork === 'mainnet'
          ? router.push(`https://${baseExplorerUrl}/${chain.chainName}`)
          : router.push(
              `https://${chainNetwork}-${baseExplorerUrl}/${chain.chainName}`,
            );
      } else {
        chain.chainName === 'klayr_mainchain' ? router.push('/') : router.push(`/${chain.chainName}`);
        setSelectedChain(chain);
        setCurrentChain(chain);
        setCurrentNetwork(chain.networkType);
      }
      setIsModalOpen(false);
    }
  };

  const handleNetworkChange = (networkName: string) => {
    const network = networks.find((network) => network === networkName);
    if (network) {
      if (window.location.hostname !== 'localhost') {
        network === 'mainnet'
          ? router.push(`https://${baseExplorerUrl}`)
          : router.push(`https://${network}-${baseExplorerUrl}`);
      } else {
        router.push('/');
        setSelectedNetwork(network);
        setCurrentNetwork(network);
      }
    }
  };

  // const handleSave = () => {
  //   if (selectedChain && selectedNetwork) {
  //     setCurrentChain(selectedChain);
  //     setCurrentNetwork(selectedNetwork);
  //   }
  //   setIsModalOpen(false);
  // };

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

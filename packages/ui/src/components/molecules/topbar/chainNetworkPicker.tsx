'use client';
import { useMemo, useState } from 'react';
import { ChainType, NetworkType } from '../../../types/types.ts';
import {
  Button,
  FlexGrid,
  KeyValueComponent,
  SkeletonComponent,
  StatusIcon,
  Typography,
} from '../../atoms';
import { ImageContainer } from '../../atoms';
import { ReactElement } from 'react';
import { CustomModal, CustomSelect } from '../../atoms';
import { useRouter } from 'next/navigation';
import { useHostname } from 'web/src/utils/hooks/useHostname';

export interface ChainNetworkPickerProps {
  currentChain: ChainType | undefined;
  currentNetwork: NetworkType;
  chains?: ChainType[];
  networks?: string[];
  imgComponent?: ReactElement;
  onSaved?: () => void;
}

export const ChainNetworkPicker = ({
  currentChain,
  currentNetwork,
  chains = [],
  networks = [],
  imgComponent,
  onSaved,
}: ChainNetworkPickerProps) => {
  const hostname = useHostname();

  const mainnetExplorerURL = useMemo(() => {
    const hostnames = hostname.split('.');

    if (hostnames[0] === 'explorer') {
      return hostnames.join('.');
    }

    if (hostnames[0] === 'testnet-explorer') {
      hostnames[0] = 'explorer';
      return hostnames.join('.');
    }

    hostnames.unshift('explorer');
    return hostnames.join('.');
  }, [hostname]);

  const testnetExplorerURL = useMemo(() => {
    const hostnames = hostname.split('.');

    if (hostnames[0] === 'explorer') {
      hostnames[0] = 'testnet-explorer';
      return hostnames.join('.');
    }

    if (hostnames[0] === 'testnet-explorer') {
      return hostnames.join('.');
    }

    hostnames.unshift('testnet-explorer');
    return hostnames.join('.');
  }, [hostname]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<string>();
  const [selectedNetwork, setSelectedNetwork] = useState<string>();
  const filteredChains = chains.filter(
    (chain) => chain.networkType === (selectedNetwork ?? currentNetwork.networkName),
  );
  const router = useRouter();
  const localhostHostnames = ['localhost', 'explorer.localhost', 'testnet-explorer.localhost'];

  const handleNetworkSelect = (network: string) => {
    setSelectedNetwork(network);
    setSelectedChain('klayr_mainchain');
  };

  const chainOptions = filteredChains?.map((chain) => ({
    label: chain.displayName ?? chain.chainName,
    value: chain.chainName,
    labelImage: chain.logo.png,
  }));

  const networkOptions = networks?.map((network) => ({
    label: network,
    value: network,
  }));

  const handleClose = () => {
    setSelectedNetwork(undefined);
    setSelectedChain(undefined);
    setIsModalOpen(false);
  };

  const handleChainChange = (chainName: string) => {
    const chain = filteredChains.find((chain) => chain.chainName === chainName);
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
          ? router.push(`https://${mainnetExplorerURL}`)
          : router.push(`https://${testnetExplorerURL}`);
      } else {
        network === 'mainnet'
          ? router.push(`http://${mainnetExplorerURL}:${window.location.port}`)
          : router.push(`http://${testnetExplorerURL}:${window.location.port}`);
      }
    }
  };

  const handleChainNetworkChange = (chainName: string, networkName: string) => {
    const chain = filteredChains.find((chain) => chain.chainName === chainName);
    const network = networks.find((network) => network === networkName);

    if (chain && network) {
      router.push(`/${chain.chainName}`);
      if (!localhostHostnames.includes(window.location.hostname)) {
        network === 'mainnet'
          ? router.push(`https://${mainnetExplorerURL}/${chain.chainName}`)
          : router.push(`https://${testnetExplorerURL}/${chain.chainName}`);
      } else {
        network === 'mainnet'
          ? router.push(`http://${mainnetExplorerURL}:${window.location.port}/${chain.chainName}`)
          : router.push(`http://${testnetExplorerURL}:${window.location.port}/${chain.chainName}`);
      }
    }
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (selectedChain && !selectedNetwork) {
      handleChainChange(selectedChain);
      onSaved?.();
      return;
    }

    if (selectedNetwork && !selectedChain) {
      handleNetworkChange(selectedNetwork);
      return;
    }

    if (selectedChain && selectedNetwork) {
      handleChainNetworkChange(selectedChain, selectedNetwork);
      return;
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
      {currentChain ? (
        <CustomModal onClose={handleClose} open={isModalOpen} title="Select environments">
          <FlexGrid alignItems="start" direction="col" gap="4" justify="end">
            <FlexGrid
              alignItems="center"
              className={'w-full'}
              justify="between"
              mobileDirection="row"
            >
              <Typography color="onBackgroundLow" variant="paragraph-md">
                {'Network'}
              </Typography>
              <CustomSelect
                classNameList="border-backgroundTertiary border-t-0"
                defaultValue={currentNetwork?.networkName}
                onChange={(value) => handleNetworkSelect(value)}
                options={networkOptions}
              />
            </FlexGrid>
            <FlexGrid
              alignItems="center"
              className={'w-full'}
              justify="between"
              mobileDirection="row"
            >
              <Typography color="onBackgroundLow" variant="paragraph-md">
                {'Chain'}
              </Typography>
              <CustomSelect
                classNameList="border-backgroundTertiary border-t-0"
                defaultValue={currentChain?.chainName}
                onChange={(value) => setSelectedChain(value)}
                options={chainOptions}
                value={selectedChain}
              />
            </FlexGrid>
            <FlexGrid alignItems="center" className="w-full mt-md" gap="1" justify="end">
              <Button
                align="none"
                className="hidden desktop:flex text-gray-5 hover:text-gray-1"
                label="Cancel"
                onClick={handleClose}
                variant="transparent"
              />
              <Button
                align="none"
                className="w-full desktop:w-auto"
                disabled={!selectedChain && !selectedNetwork}
                label="Save"
                onClick={handleSave}
              />
            </FlexGrid>
          </FlexGrid>
        </CustomModal>
      ) : null}
      <FlexGrid gap="1.5xl" mobileDirection={'row'} onClick={currentChain ? handleOpen : undefined}>
        {currentNetwork && currentNetwork.networkName ? (
          <KeyValueComponent
            contentValue={currentNetwork.networkName || 'network'}
            hover
            keyValue={<StatusIcon status={currentNetworkStatusClass} />}
          />
        ) : (
          <SkeletonComponent width={'16'} height={'4'} />
        )}
        {currentChain ? (
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
        ) : (
          <SkeletonComponent width={'16'} height={'4'} />
        )}
      </FlexGrid>
    </FlexGrid>
  );
};

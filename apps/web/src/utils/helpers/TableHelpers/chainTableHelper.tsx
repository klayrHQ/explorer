import { CombinedAppsType, ChainType, AppsType } from '../../types.ts';
import { ImageName } from '@repo/ui/molecules';
import {
  Button,
  FlexGrid,
  IconButton,
  Link,
  StatusBadge,
  NotFound,
  Typography,
} from '@repo/ui/atoms';
import { Currency } from '../../../components/currency.tsx';
import { getTableSkeletons } from '../dataHelpers.tsx';
import { chainsTableHead } from '../tableHeaders.tsx';
import Placeholder from '../../../assets/images/placeholder.png';
import React from 'react';
import { FormattedValue } from '../../../components/formattedValue.tsx';

interface ChainRowsItemProps {
  logo?: string;
  name: string;
  chainID: string;
  status: string;
  address?: string;
  escrowedKLY: string;
  lastUpdated?: number;
  projectPage?: string;
  basePath: string;
}

export const createBlockchainAppRows = (
  chains: ChainType[],
  loading: boolean,
  basePath: string,
) => {
  const columnCount = chainsTableHead.length;

  return !loading
    ? chains?.length > 0
      ? chains.map((chain) => {
          return chainRowsItem({
            logo: chain.logo?.png ?? Placeholder.src,
            name: chain.displayName ?? chain.chainName,
            chainID: chain.chainID,
            status: chain.status,
            address: chain?.blockchainApp?.address,
            escrowedKLY: chain?.blockchainApp?.escrowedKLY || '0',
            lastUpdated: chain?.blockchainApp?.lastUpdated,
            projectPage: chain.projectPage,
            basePath: basePath,
          });
        })
      : [
          {
            cells: [
              {
                children: (
                  <NotFound
                    headerText={'No Blockchain Apps Here'}
                    subheaderText={'We could not find any blockchain apps on this network'}
                  />
                ),
                colSpan: columnCount,
              },
            ],
          },
        ]
    : getTableSkeletons(columnCount);
};

export const createAllChainRows = (chains: AppsType[], loading: boolean, basePath: string) => {
  const columnCount = chainsTableHead.length;

  return !loading
    ? chains?.length > 0
      ? chains.map((chain) => {
          return chainRowsItem({
            logo: Placeholder.src,
            name: chain.chainName,
            chainID: chain.chainID,
            status: chain.status,
            address: chain.address,
            escrowedKLY: chain.escrowedKLY,
            lastUpdated: chain.lastUpdated,
            projectPage: '',
            basePath: basePath,
          });
        })
      : [
          {
            cells: [
              {
                children: (
                  <NotFound
                    headerText={'No Chains Here'}
                    subheaderText={'We could not find any chains on this network'}
                  />
                ),
                colSpan: columnCount,
              },
            ],
          },
        ]
    : getTableSkeletons(columnCount);
};

const chainRowsItem = ({
  logo,
  name,
  chainID,
  status,
  address,
  escrowedKLY,
  lastUpdated,
  projectPage,
  basePath,
}: ChainRowsItemProps) => {
  return {
    cells: [
      {
        children: <ImageName imageUrl={logo} name={name} />,
        className: 'w-72',
      },
      {
        children: (
          <Typography color="onBackgroundLow" variant="paragraph-sm">
            {chainID}
          </Typography>
        ),
        className: 'w-44',
      },
      {
        children: <StatusBadge status={status} />,
        className: 'w-44',
      },
      {
        children: address ? (
          <FormattedValue value={{ address: address || '' }} format={'account'} />
        ) : (
          <FormattedValue value={'-'} format={'string'} />
        ),
        className: 'w-44',
      },
      {
        children: <Currency amount={escrowedKLY || '0'} />,
        className: 'text-right w-52',
      },
      {
        children: lastUpdated ? (
          <FormattedValue
            value={lastUpdated || ''}
            format={'fromNow'}
            tooltipContainerClassName={'justify-end text-right'}
          />
        ) : (
          <FormattedValue value={'-'} format={'string'} />
        ),
        className: 'text-right desktop:w-52 min-w-52',
      },
      projectPage
        ? {
            children: (
              <FlexGrid mobileDirection={'row'} gap={'lg'}>
                <Link className={'contents'} basePath={basePath} href={`/chains/${chainID}`}>
                  <Button align={'right'} label={'Details'} variant={'bordered'} />
                </Link>
                <Link className={'contents'} href={projectPage || ''} outgoing>
                  <IconButton
                    align={'none'}
                    disabled={!projectPage}
                    icon={'LinkExternal'}
                    variant={'quaternary'}
                  />
                </Link>
              </FlexGrid>
            ),
          }
        : { children: null },
    ],
  };
};

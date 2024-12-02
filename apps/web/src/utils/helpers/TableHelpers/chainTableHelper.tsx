import { CombinedAppsType, ChainType } from '../../types.ts';
import { ImageName } from '@repo/ui/molecules';
import { Button, FlexGrid, IconButton, Link, StatusBadge, NotFound } from '@repo/ui/atoms';
import { Currency } from '../../../components/currency.tsx';
import { getTableSkeletons } from '../dataHelpers.tsx';
import { chainsTableHead } from '../tableHeaders.tsx';
import Placeholder from '../../../assets/images/placeholder.png';
import React from 'react';
import { FormattedValue } from '../../../components/formattedValue.tsx';

export const createChainRows = (chains: CombinedAppsType[], loading: boolean, basePath: string) => {
  const columnCount = chainsTableHead.length;

  return !loading
    ? chains?.length > 0
      ? chains.map((chain) => {
          return {
            cells: [
              {
                children: (
                  <ImageName
                    imageUrl={chain.logo?.png ?? Placeholder.src}
                    name={chain.displayName ?? chain.chainName}
                  />
                ),
                className: 'w-72',
              },
              {
                children: <StatusBadge status={chain.status} />,
                className: 'w-44',
              },
              {
                children:
                  chain.address || chain?.blockchainApp?.address ? (
                    <FormattedValue
                      value={{ address: chain.address || chain?.blockchainApp?.address || '' }}
                      format={'account'}
                    />
                  ) : (
                    <FormattedValue value={'-'} format={'string'} />
                  ),
                className: 'w-44',
              },
              {
                children: (
                  <Currency amount={chain.escrowedKLY || chain?.blockchainApp?.escrowedKLY || ''} />
                ),
                className: 'text-right w-52',
              },
              {
                children:
                  chain.lastUpdated || chain?.blockchainApp?.escrowedKLY ? (
                    <FormattedValue
                      value={chain.lastUpdated || chain?.blockchainApp?.lastUpdated || ''}
                      format={'fromNow'}
                      tooltipContainerClassName={'justify-end text-right'}
                    />
                  ) : (
                    <FormattedValue value={'-'} format={'string'} />
                  ),
                className: 'text-right desktop:w-52 min-w-52',
              },
              chain.projectPage
                ? {
                    children: (
                      <FlexGrid mobileDirection={'row'} gap={'lg'}>
                        <Link
                          className={'contents'}
                          basePath={basePath}
                          href={`/chains/${chain.chainID}`}
                        >
                          <Button align={'right'} label={'Details'} variant={'bordered'} />
                        </Link>
                        <Link className={'contents'} href={chain.projectPage ?? ''} outgoing>
                          <IconButton
                            align={'none'}
                            disabled={!chain.projectPage}
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

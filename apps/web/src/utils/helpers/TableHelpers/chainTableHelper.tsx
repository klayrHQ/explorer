import { CombinedAppsType } from '../../types.ts';
import { ImageName } from '@repo/ui/molecules';
import { Button, FlexGrid, IconButton, Link, StatusBadge, UserAccountCard } from '@repo/ui/atoms';
import { Currency } from '../../../components/currency.tsx';
import { getTableSkeletons } from '../dataHelpers.tsx';
import { chainsTableHead } from '../tableHeaders.tsx';
import Placeholder from '../../../assets/images/placeholder.png';
import React from 'react';
import { FormattedValue } from '../../../components/formattedValue.tsx';

export const createChainRows = (chains: CombinedAppsType[], loading: boolean, basePath: string) => {
  return !loading
    ? chains?.map((chain) => {
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
              children: chain.address ? (
                <FormattedValue value={{address: chain.address}} format={'account'} />
              ) : (
                <FormattedValue value={'-'} format={'string'} />
              ),
              className: 'w-44',
            },
            {
              children: <Currency amount={chain.escrowedKLY} />,
              className: 'text-right w-52',
            },
            {
              children: chain.lastUpdated ? (
                <FormattedValue value={chain.lastUpdated} format={'fromNow'} tooltipContainerClassName={'justify-end text-right'} />
              ) : (
                <FormattedValue value={'-'} format={'string'} />
              ),
              className: 'text-right desktop:w-52 min-w-52',
            },
            chain.logo
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
                      <IconButton align={'none'} icon={'LinkExternal'} variant={'quaternary'} />
                    </FlexGrid>
                  ),
                }
              : { children: null },
          ],
        };
      })
    : getTableSkeletons(chainsTableHead.length);
};

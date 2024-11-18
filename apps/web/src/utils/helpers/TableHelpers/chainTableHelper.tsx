import { CombinedAppsType } from '../../types.ts';
import { ImageName } from '@repo/ui/molecules';
import { Button, FlexGrid, IconButton, Link, StatusBadge } from '@repo/ui/atoms';
import { Currency } from '../../../components/currency.tsx';
import { getTableSkeletons } from '../dataHelpers.tsx';
import { chainsTableHead } from '../tableHeaders.tsx';
import Placeholder from '../../../assets/images/placeholder.png';
import React from 'react';

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
              children: <Currency amount={chain.escrowedKLY} decimals={3} />,
              className: 'text-right w-52',
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

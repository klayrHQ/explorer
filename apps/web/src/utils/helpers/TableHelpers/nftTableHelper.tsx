import { NftType } from '../../types.ts';
import { ImageName } from '@repo/ui/molecules';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { Currency } from '../../../components/currency.tsx';
import { StatusBadge } from '@repo/ui/atoms';
import { getTableSkeletons } from '../dataHelpers.tsx';
import React from 'react';

export const createNftsRows = (nfts: NftType[], loading: boolean) => {
  return !loading
    ? nfts?.map((nft) => {
        return {
          cells: [
            {
              children: <ImageName imageUrl={nft.image ?? ''} name={nft.name ?? ''} />,
            },
            {
              children: <FormattedValue format={'string'} value={nft.collection} />,
            },
            {
              children: (
                <div className="flex flex-col">
                  <Currency amount={nft.price ?? 0} decimals={3} />
                  <Currency
                    amount={Number(nft.price) * 0.7}
                    color="onBackgroundLow"
                    decimals={2}
                    sign={'$'}
                  />
                </div>
              ),
            },
            {
              children: <StatusBadge status={nft.status || ''} />,
            },
            {
              children: <FormattedValue format={'string'} value={`#${nft.rarityRank}`} />,
            },
            {
              children: <ImageName imageUrl={nft.chainImage ?? ''} name={nft.chain ?? ''} />,
            },
          ],
        };
      })
    : getTableSkeletons(6);
};
export const createNftsPageRows = (nfts: NftType[], loading: boolean) => {
  return !loading
    ? nfts?.map((nft) => {
        return {
          cells: [
            {
              children: <ImageName imageUrl={nft.image ?? ''} name={nft.name ?? ''} />,
            },
            {
              children: <FormattedValue format={'string'} value={nft.collection} />,
            },
            {
              children: <StatusBadge status={nft.status || ''} />,
            },
            {
              children: (
                <div className="flex flex-col">
                  {/* <Currency amount={nft.price ?? 0} decimals={3} symbol={'KLY'} /> */}
                  <Currency
                    amount={Number(nft.price) * 0.7}
                    color="onBackgroundLow"
                    decimals={2}
                    sign={'$'}
                  />
                </div>
              ),
            },
            {
              children: <ImageName imageUrl={nft.chainImage ?? ''} name={nft.chain ?? ''} />,
            },
          ],
        };
      })
    : getTableSkeletons(5);
};

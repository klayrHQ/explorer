import { BlockType } from '../../types.ts';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { Currency } from '../../../components/currency.tsx';
import { getSeedRevealFromAssets, getTableSkeletons } from '../dataHelpers.tsx';
import { blockTableHead, validatorBlocksTableHead } from '../tableHeaders.tsx';
import React from 'react';
import { KeyValueComponent, StatusIcon } from '@repo/ui/atoms';

export const createValidatorBlockRows = (
  blocks: BlockType[],
  loading: boolean,
  basePath: string,
) => {
  return !loading
    ? blocks?.map((block) => {
        return {
          cells: [
            {
              children: (
                <FormattedValue format={'string'} link={`/blocks/${block.id}`} value={block.id} />
              ),
            },
            {
              children: <FormattedValue format={'number'} value={block.height} />,
            },
            {
              children: <FormattedValue format={'fromNow'} value={block.timestamp} />,
            },
            {
              children: <FormattedValue format={'number'} value={block.numberOfTransactions} />,
            },
            {
              children: <Currency amount={block.reward ?? 0} decimals={2} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorBlocksTableHead.length);
};
export const createBlockRows = (
  blocks: BlockType[],
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
  basePath: string,
) => {
  const columnCount = blockTableHead(() => '', '', '').length;
  return !loading
    ? blocks?.map((block) => {
        return {
          cells: [
            {
              children: (
                <KeyValueComponent
                  contentValue={
                    <FormattedValue
                      copy
                      format={'address'}
                      link={`/blocks/${block.id}`}
                      showCopyOnHover
                      value={block.id}
                    />
                  }
                  keyValue={<StatusIcon connected={block.isFinal} />}
                />
              ),
              className: 'group/child',
            },
            {
              children: (
                <FormattedValue
                  copy
                  format={'number'}
                  showCopyOnHover
                  typographyProps={{ color: 'onBackgroundLow' }}
                  value={block.height}
                />
              ),
              className: 'group/child min-w-[120px]',
            },
            {
              children: <FormattedValue format={'fromNow'} value={block.timestamp} />,
            },
            {
              children: <FormattedValue format={'account'} value={block.generator} />,
            },
            {
              children: (
                <FormattedValue format={'address'} value={getSeedRevealFromAssets(block.assets)} />
              ),
            },
            {
              children: (
                <FormattedValue format={'number'} value={block.numberOfTransactions || 0} />
              ),
            },
            {
              children: <FormattedValue format={'number'} value={block.numberOfEvents || 0} />,
            },
            {
              children: <FormattedValue format={'number'} value={block.numberOfAssets || 0} />,
            },
          ],
        };
      })
    : getTableSkeletons(columnCount);
};

import { TransactionType } from '../../types.ts';
import { ChainType } from '@repo/ui/types';
import { transactionTableHead } from '../tableHeaders.tsx';
import { Badge, KeyValueComponent, StatusBadge, StatusIcon, Typography } from '@repo/ui/atoms';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { commandColors, decimals } from '../../constants.tsx';
import { replaceColonWithSpace } from '@repo/ui/utils';
import { Currency } from '../../../components/currency.tsx';
import { getAmountFromTx, getTableSkeletons } from '../dataHelpers.tsx';
import { TxDataPopover } from '@repo/ui/molecules';
import React from 'react';
import Placeholder from '../../../assets/images/placeholder.png';

export const createTransactionRows = (
  transactions: TransactionType[],
  loading: boolean,
  currentChain: ChainType,
  chains: ChainType[],
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
  basePath: string,
  statusOfTransaction?: boolean,
) => {
  const columnCount = transactionTableHead(() => '', '', '').length;

  const chainLogo = currentChain?.logo;
  const getChainLogo = (chainID: string) => {
    const fromChain = chains.find((chain) => {
      const isTheChain = chain.chainID === chainID;
      return isTheChain;
    });
    const logo = fromChain?.logo.png;
    return logo ?? Placeholder.src;
  };

  return !loading
    ? transactions?.length > 0
      ? transactions?.map((transaction) => {
          const cells = [
            {
              children: (
                <KeyValueComponent
                  contentValue={
                    <FormattedValue
                      copy
                      format={'address'}
                      link={`/transactions/${transaction.id}`}
                      showCopyOnHover
                      value={transaction?.id}
                    />
                  }
                  keyValue={<StatusIcon status={transaction.executionStatus} />}
                />
              ),
            },
            {
              children: (
                <FormattedValue
                  copy
                  format={'number'}
                  showCopyOnHover
                  typographyProps={{ color: 'onBackgroundLow' }}
                  value={transaction.block.height}
                />
              ),
              className: 'group/child',
            },
            {
              children: (
                <FormattedValue
                  format={'fromNow'}
                  typographyProps={{ color: 'onBackgroundLow' }}
                  value={transaction.block.timestamp}
                />
              ),
            },
            {
              children: (
                <Badge
                  colorVariant={commandColors[transaction.moduleCommand.split(':')[0]]}
                  label={replaceColonWithSpace(`${transaction?.moduleCommand}`)}
                />
              ),
            },
            {
              children: (
                <div className="">
                  <FormattedValue
                    format={'account'}
                    value={transaction.sender}
                    accountIconComponent={
                      transaction.params.receivingChainID ? (
                        <img
                          alt="Chain Icon"
                          className="absolute -left-2 bottom-4 rounded-full"
                          height={20}
                          src={chainLogo.png ?? Placeholder.src}
                          width={20}
                        />
                      ) : null
                    }
                  />
                </div>
              ),
            },
            {
              children: transaction?.meta?.recipient ? (
                <div className="">
                  <FormattedValue
                    format={'account'}
                    value={transaction?.meta?.recipient}
                    accountIconComponent={
                      transaction.params.receivingChainID ? (
                        <img
                          alt="Chain Icon"
                          className="absolute -left-2 bottom-4 rounded-full"
                          height={20}
                          src={getChainLogo(transaction.params.receivingChainID)}
                          width={20}
                        />
                      ) : null
                    }
                  />
                </div>
              ) : (
                '-'
              ),
            },
            {
              children: (
                <Currency
                  amount={getAmountFromTx(transaction)}
                  className={'align-middle'}
                  color={'onBackgroundLow'}
                  decimals={decimals}
                  variant={'paragraph-sm'}
                />
              ),
              className: 'text-right',
            },
            {
              children: (
                <Currency
                  amount={transaction?.fee}
                  className={'align-middle'}
                  color={'onBackgroundLow'}
                  decimals={5}
                  variant={'paragraph-sm'}
                />
              ),
              className: 'text-right',
            },
          ];

          if (statusOfTransaction) {
            cells.splice(4, 0, {
              children: <StatusBadge status={transaction.executionStatus} />,
            });
          }

          return {
            rowDetails: (
              <TxDataPopover
                txData={{
                  status: transaction?.executionStatus || 'pending',
                  data: transaction?.params?.data,
                  nonce: transaction?.nonce,
                }}
              />
            ),
            cells,
          };
        })
      : [
          {
            cells: [
              {
                children: <Typography>{'No transactions found'}</Typography>,
                colSpan: columnCount,
              },
            ],
          },
        ]
    : getTableSkeletons(columnCount);
};

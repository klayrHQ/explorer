import { EventsType, TransactionType } from './types.ts';
import {
  copyToClipboard,
  dayjs,
  fromNowFormatter,
  replaceColonWithSpace,
  shortString,
} from '@repo/ui/utils';
import { TxDataPopover } from '@repo/ui/molecules';
import { Badge, Currency, Icon, Tooltip, Typography, UserAccountCard } from '@repo/ui/atoms';
import Link from 'next/link';
import React from 'react';
import {
  commandColors,
  decimals,
  eventsTableHead,
  getTableSkeletons,
  transactionTableHead,
} from './constants.tsx';

export const createTransactionRows = (
  transactions: TransactionType[] | undefined,
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
) => {
  const handleCopy = (text: string) => {
    copyToClipboard(text);
    setCopyTooltipText('Copied to clipboard!');
    setTimeout(() => {
      setCopyTooltipText('Copy to clipboard');
    }, 2000);
  };

  return !loading
    ? transactions
      ? transactions?.map((transaction) => {
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
            cells: [
              {
                children: (
                  <Typography className={'hover:underline'} link>
                    <Link href={`transactions/${transaction.id}`}>
                      {shortString(transaction?.id, 12, 'center')}
                    </Link>
                  </Typography>
                ),
              },
              {
                children: (
                  <Typography className={'whitespace-nowrap inline-flex gap-sm items-center'}>
                    {transaction?.block?.height}
                    <Tooltip placement={'bottom'} text={copyTooltipText}>
                      <span onClick={() => handleCopy(transaction?.block?.height.toString())}>
                        <Icon
                          className={
                            'desktop:group-hover/child:inline desktop:hidden cursor-pointer'
                          }
                          icon={'Copy'}
                          size={'2xs'}
                        />
                      </span>
                    </Tooltip>
                  </Typography>
                ),
                className: 'group/child min-w-[120px]',
              },
              {
                children: (
                  <Tooltip
                    placement={'top'}
                    text={dayjs(transaction.block.timestamp * 1000).format('DD MMM YYYY HH:mm')}
                  >
                    <Typography className={'whitespace-nowrap'} color={'onBackgroundLow'}>
                      {fromNowFormatter(transaction.block.timestamp * 1000, 'DD MMM YYYY')}
                    </Typography>
                  </Tooltip>
                ),
              },
              {
                children: (
                  <Badge
                    colorVariant={commandColors[transaction.command]}
                    label={replaceColonWithSpace(`${transaction?.module}:${transaction?.command}`)}
                  />
                ),
              },
              {
                children: (
                  <UserAccountCard
                    address={transaction?.sender?.address}
                    name={transaction?.sender?.name}
                  />
                ),
              },
              {
                children: transaction?.recipient ? (
                  <UserAccountCard
                    address={transaction?.recipient?.address}
                    name={transaction?.recipient?.name}
                  />
                ) : (
                  '-'
                ),
              },
              {
                children: (
                  <Currency
                    amount={transaction?.params?.amount}
                    className={'align-middle'}
                    color={'onBackgroundLow'}
                    decimals={decimals}
                    symbol={'KLY'}
                    variant={'paragraph-sm'}
                  />
                ),
              },
              {
                children: (
                  <Currency
                    amount={transaction?.fee}
                    className={'align-middle'}
                    color={'onBackgroundLow'}
                    decimals={5}
                    symbol={'KLY'}
                    variant={'paragraph-sm'}
                  />
                ),
              },
            ],
          };
        })
      : [
          {
            cells: [
              {
                children: <Typography>No transactions found</Typography>,
                colSpan: transactionTableHead.length,
              },
            ],
          },
        ]
    : getTableSkeletons(transactionTableHead.length);
};

export const createEventsRows = (events: EventsType[] | undefined, loading: boolean) => {
  return !loading
    ? events?.map((event) => {
        return {
          cells: [
            {
              children: (
                <Typography color={'onBackgroundHigh'} variant={'paragraph-md'}>
                  {event.module}
                </Typography>
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: (
                <Typography color={'onBackgroundHigh'} variant={'paragraph-md'}>
                  {event.name}
                </Typography>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(eventsTableHead.length);
};

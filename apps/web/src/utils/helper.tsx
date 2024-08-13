import { BlockType, EventsType, TransactionType, ValidatorType } from './types.ts';
import {
  dayjs,
  fromNowFormatter,
  handleCopy,
  replaceColonWithSpace,
  shortString,
} from '@repo/ui/utils';
import { TxDataPopover } from '@repo/ui/molecules';
import {
  Badge,
  Currency,
  Icon,
  JsonViewer,
  Tooltip,
  Typography,
  UserAccountCard,
  NotificationIcon,
  StatusBadge,
} from '@repo/ui/atoms';
import Link from 'next/link';
import React from 'react';
import {
  commandColors,
  decimals,
  eventsTableHead,
  getTableSkeletons,
  transactionTableHead,
  validatorsTableHead,
  validatorBlocksTableHead,
  validatorStakeIncomingTableHead,
  validatorStakeOutgoingTableHead,
} from './constants.tsx';
import { DataType } from '@repo/ui/types';
import { formatCommission } from './dataHelpers.tsx';

export const createTransactionRows = (
  transactions: TransactionType[] | undefined,
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
) => {
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
                    <Link href={`/transactions/${transaction.id}`}>
                      {shortString(transaction?.id, 12, 'center')}
                    </Link>
                  </Typography>
                ),
              },
              {
                children: (
                  <Typography
                    className={'whitespace-nowrap inline-flex gap-sm items-center cursor-pointer'}
                    color={'onBackgroundLow'}
                  >
                    {transaction?.block?.height?.toLocaleString() ?? ''}
                    <Tooltip placement={'bottom'} text={copyTooltipText}>
                      <span
                        className={'w-4 block'}
                        onClick={() =>
                          handleCopy(
                            transaction?.block?.height?.toString() ?? '',
                            setCopyTooltipText,
                          )
                        }
                      >
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
                className: 'group/child',
              },
              {
                children: (
                  <Tooltip
                    placement={'top'}
                    text={dayjs((transaction.block.timestamp ?? 0) * 1000).format(
                      'DD MMM YYYY HH:mm',
                    )}
                  >
                    <Typography className={'whitespace-nowrap'} color={'onBackgroundLow'}>
                      {fromNowFormatter((transaction.block.timestamp ?? 0) * 1000, 'DD MMM YYYY')}
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
                children: <Typography>{'No transactions found'}</Typography>,
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
          rowDetails: (
            <JsonViewer
              className={'!border-0'}
              copy
              data={{ data: event.data as unknown as DataType }}
              startOpen
            />
          ),
          cells: [
            {
              children: (
                <Typography color={'onBackgroundHigh'} variant={'paragraph-sm'}>
                  {event.module}
                </Typography>
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: (
                <Typography color={'onBackgroundHigh'} variant={'paragraph-sm'}>
                  {event.name}
                </Typography>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(eventsTableHead.length);
};

export const createValidatorsRows = (validators: ValidatorType[] | undefined, loading: boolean) => {
  return !loading
    ? validators?.map((validator) => {
        return {
          cells: [
            {
              children: (
                <Link href={`/validators/${validator?.account.address}`}>
                  <div className={` relative inline-flex items-center gap-1 ml-2.5`}>
                    <NotificationIcon
                      className="absolute -translate-x-3 -translate-y-3"
                      notificationValue={validator?.rank < 999 ? validator?.rank : ''}
                      size="lg"
                    />
                    <UserAccountCard
                      address={validator?.account.address}
                      name={validator?.account.name}
                      nameColor="onBackgroundMedium"
                      nameVariant="paragraph-sm"
                      nameFontWeight="semibold"
                      addressColor="onBackgroundLow"
                      addressVariant="caption"
                    />
                  </div>
                </Link>
              ),
            },
            {
              //depends on what color?
              children: (
                <StatusBadge
                  status={validator.status}
                  nextAllocatedTime={
                    validator.nextAllocatedTime
                      ? fromNowFormatter(validator.nextAllocatedTime * 1000, 'DD MMM YYYY')
                      : undefined
                  }
                />
              ),
            },
            {
              children: (
                <div className="flex justify-end">
                  <Typography color={'onBackgroundLow'}>
                    {validator?.generatedBlocks.toLocaleString()}
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end">
                  <Typography color="onBackgroundLow">{'90'}%</Typography>
                </div>
              ),
            },
            {
              children: (
                <div className="flex flex-col items-end">
                  <Currency amount={validator?.validatorWeight} decimals={0} symbol={'KLY'} />
                  <Typography color={'onBackgroundLow'} variant={'caption'}>
                    {'90.56%'}
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                //Not sure about data
                <div className="flex justify-end">
                  <Currency amount={validator?.selfStake} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                //how to get the percentage?
                <div className="flex justify-end">
                  <Currency amount={validator?.totalStake} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                //how to get the percentage?
                <div className="flex justify-end">
                  <Typography color={'onBackgroundLow'}>
                    {formatCommission(validator?.commission)}%
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end">
                  <Currency amount={877777899} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end">
                  <Currency amount={8767777899} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end">
                  <Currency amount={90977778997} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(validatorsTableHead.length);
};

export const createValidatorIncomingStakeRows = (
  incomingStakes: TransactionType[] | undefined,
  loading: boolean,
) => {
  return !loading
    ? incomingStakes?.map((incomingStake) => {
        return {
          cells: [
            {
              children: (
                <UserAccountCard
                  address={incomingStake?.sender?.address}
                  name={incomingStake?.sender?.name}
                />
              ),
            },
            {
              children: (
                <Currency amount={incomingStake?.params?.stakes[0].amount} symbol={'KLY'} />
              ),
            },
          ],
        };
      })
    : getTableSkeletons(validatorStakeIncomingTableHead.length);
};

export const createValidatorOutgoingStakeRows = (
  outgoingStakes: TransactionType[] | undefined,
  validator: ValidatorType | undefined,
  loading: boolean,
) => {
  return !loading
    ? outgoingStakes?.map((outgoingStake) => {
        return {
          cells: [
            {
              children: (
                <UserAccountCard
                  address={outgoingStake?.recipient?.address}
                  name={outgoingStake?.recipient?.name}
                />
              ),
            },
            {
              children: <Currency amount={validator?.validatorWeight || 0} symbol={'KLY'} />,
            },

            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {formatCommission(validator?.commission)} %
                </Typography>
              ),
            },
            {
              children: (
                <Currency amount={outgoingStake?.params?.stakes[0].amount} symbol={'KLY'} />
              ),
            },
          ],
        };
      })
    : getTableSkeletons(validatorStakeOutgoingTableHead.length);
};

export const createValidatorBlockRows = (blocks: BlockType[] | undefined, loading: boolean) => {
  return !loading
    ? blocks?.map((block) => {
        return {
          cells: [
            {
              children: (
                <Link href={`/blocks/${block.id}`}>
                  <Typography color="onBackground" variant="paragraph-sm">
                    {block.id}
                  </Typography>
                </Link>
              ),
            },
            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {block.height?.toLocaleString() ?? '0'}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {fromNowFormatter((block.timestamp ?? 0) * 1000, 'DD MMM YYYY')}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {block.numberOfTransactions}
                </Typography>
              ),
            },
            {
              children: <Currency amount={block.reward || 0} decimals={2} symbol={'KLY'} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorBlocksTableHead.length);
};

export const createValidatorEventsRow = (events: EventsType[] | undefined, loading: boolean) => {
  return !loading
    ? events?.map((event) => {
        return {
          cells: [
            {
              children: (
                <Typography color="onBackground" variant="paragraph-sm">
                  {fromNowFormatter((event.block.timestamp ?? 0) * 1000, 'DD MMM YYYY')}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {event.block.height?.toLocaleString() ?? '0'}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {event.module}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {event.name}
                </Typography>
              ),
            },
            {
              children: <Currency amount={event.data.amount || 0} decimals={5} symbol={'KLY'} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorBlocksTableHead.length);
};

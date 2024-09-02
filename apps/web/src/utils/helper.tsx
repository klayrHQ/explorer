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
  StatusIcon,
  KeyValueComponent,
  FlexGrid,
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
import { formatCommission, getAmountFromTx } from './dataHelpers.tsx';

export const createTransactionRows = (
  transactions: TransactionType[],
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
) => {
  return !loading
    ? transactions?.length > 0
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
                  <KeyValueComponent
                    contentValue={
                      <Link href={`/transactions/${transaction.id}`}>
                        <Typography className={'hover:underline'} link>
                          {' '}
                          {shortString(transaction?.id, 12, 'center')}
                        </Typography>
                      </Link>
                    }
                    keyValue={<StatusIcon status={transaction.executionStatus} />}
                  />
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
                    amount={getAmountFromTx(transaction)}
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

export const createEventsRows = (events: EventsType[], loading: boolean) => {
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

export const createValidatorsRows = (
  validators: ValidatorType[],
  loading: boolean,
  stackingRewards = false,
) => {
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
                      addressColor="onBackgroundLow"
                      addressVariant="caption"
                      name={validator?.account.name}
                      nameColor="onBackgroundMedium"
                      nameFontWeight="semibold"
                      nameVariant="paragraph-sm"
                    />
                  </div>
                </Link>
              ),
            },
            stackingRewards
              ? {
                  children: (
                    <div className="flex flex-col items-end">
                      <Currency
                        amount={'198419841984'}
                        className="text-paragraph-sm text-lobster font-semibold" //text-onBackground
                        decimals={2}
                        symbol={'KLY'}
                      />
                      <Currency
                        amount={'777777777'}
                        className="text-lobster text-caption font-normal" //text-onBackgroundLow
                        decimals={2}
                        symbol={'KLY'}
                      />
                    </div>
                  ),
                }
              : null,
            {
              children: (
                <StatusBadge
                  nextAllocatedTime={
                    validator.nextAllocatedTime
                      ? fromNowFormatter(validator.nextAllocatedTime * 1000, 'DD MMM YYYY')
                      : undefined
                  }
                  status={validator.status}
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
                  {/* onBackgroundLow */}
                  <Typography color="lobster">{'90'}%</Typography>
                </div>
              ),
            },
            {
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={validator?.validatorWeight}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                  {/* onBackgroundLow */}
                  <Typography color={'lobster'} variant={'caption'}>
                    {'90.56%'}
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                //Not sure about data
                <div className="flex justify-end">
                  <Currency
                    amount={validator?.selfStake}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                </div>
              ),
            },
            {
              children: (
                //how to get the percentage?
                <div className="flex justify-end">
                  <Currency
                    amount={validator?.totalStake}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                </div>
              ),
            },
            {
              children: (
                //how to get the percentage?
                <div className="flex justify-end">
                  <Typography color={'onBackgroundLow'}>
                    {'{formatCommission(validator?.commission)}%'}
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end text-lobster">
                  <Currency amount={877777899} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end text-lobster">
                  <Currency amount={8767777899} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end text-lobster">
                  <Currency amount={90977778997} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
          ].filter(Boolean),
        };
      })
    : getTableSkeletons(validatorsTableHead.length);
};

export const createValidatorIncomingStakeRows = (
  incomingStakes: TransactionType[],
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
              className: 'desktop:w-1/5',
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
  outgoingStakes: TransactionType[],
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
                  {'{formatCommission(validator?.commission)} %'}
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

export const createValidatorBlockRows = (blocks: BlockType[], loading: boolean) => {
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

export const createValidatorEventsRow = (events: EventsType[], loading: boolean) => {
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
                <Typography color="onBackground" variant="paragraph-sm">
                  {fromNowFormatter((event.block.timestamp ?? 0) * 1000, 'DD MMM YYYY')}
                </Typography>
              ),
              className: 'desktop:w-1/5',
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
              className: 'desktop:w-1/5',
            },
            {
              children: <Currency amount={event.data.amount || 0} decimals={5} symbol={'KLY'} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorBlocksTableHead.length);
};

export const createStakesOverviewRows = (stakes: TransactionType[], loading: boolean) => {
  return !loading
    ? stakes?.map((stake) => {
        return {
          cells: [
            {
              children: (
                <Link href={`/transactions/${stake.id}`}>
                  <Typography className={'hover:underline'} link>
                    {shortString(stake?.id, 12, 'center')}
                  </Typography>
                </Link>
              ),
            },
            {
              children: (
                <Tooltip
                  placement={'top'}
                  text={dayjs((stake?.block.timestamp ?? 0) * 1000).format('DD MMM YYYY HH:mm')}
                >
                  <Typography className={'whitespace-nowrap'} color={'onBackgroundLow'}>
                    {fromNowFormatter((stake.block.timestamp ?? 0) * 1000, 'DD MMM YYYY')}
                  </Typography>
                </Tooltip>
              ),
            },
            {
              children: (
                <UserAccountCard address={stake?.sender?.address} name={stake?.sender?.name} />
              ),
            },
            {
              children: (
                <>
                  <div className="flex flex-col ">
                    {stake?.params?.stakes?.map((param: any) => {
                      const amount = param?.amount;
                      const color = amount > 0 ? 'success' : 'error';
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div className="flex items-center justify-between gap-8 w-72 -m-0.5">
                          <UserAccountCard address={param?.validatorAddress} />
                          <Currency
                            amount={amount}
                            className="text-right self-end"
                            color={color}
                            decimals={2}
                            fontWeight="normal"
                            symbol={'KLY'}
                            variant="paragraph-sm"
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(validatorStakeIncomingTableHead.length);
};

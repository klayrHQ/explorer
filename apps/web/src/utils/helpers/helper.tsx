import {
  BlockType,
  EventsType,
  FavouriteType,
  StakesCalculatorPeriodType,
  UsersType,
  StakeType,
  TransactionType,
  ValidatorType,
} from '../types.ts';
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
} from '@repo/ui/atoms';
import { Link } from '../../components/link.tsx';
import React from 'react';
import { commandColors, decimals } from '../constants.tsx';
import { convertKLYToBeddows, getSeedRevealFromAssets, getTableSkeletons } from './dataHelpers.tsx';
import {
  eventsTableHead,
  validatorsTableHead,
  validatorBlocksTableHead,
  validatorStakeIncomingTableHead,
  validatorStakeOutgoingTableHead,
  transactionTableHead,
  blockTableHead,
  stakesOverviewTableHead,
  favouritesTableHead,
} from './tableHeaders.tsx';
import { DataType } from '@repo/ui/types';
import { formatCommission, getAmountFromTx } from './dataHelpers.tsx';

export const createTransactionRows = (
  transactions: TransactionType[],
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
  statusOfTransaction?: boolean,
) => {
  const columnCount = transactionTableHead(() => '', '', '').length;
  return !loading
    ? transactions?.length > 0
      ? transactions?.map((transaction) => {
          const cells = [
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
                        handleCopy(transaction?.block?.height?.toString() ?? '', setCopyTooltipText)
                      }
                    >
                      <Icon
                        className={'desktop:group-hover/child:inline desktop:hidden cursor-pointer'}
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
                <Link
                  href={
                    transaction?.sender?.name ? `/validators/${transaction?.sender?.address}` : ``
                  }
                >
                  <UserAccountCard
                    address={transaction?.sender?.address}
                    name={transaction?.sender?.name}
                  />
                </Link>
              ),
            },
            {
              children: transaction?.recipient ? (
                <Link
                  href={
                    transaction?.recipient?.name
                      ? `/validators/${transaction?.recipient?.address}`
                      : ``
                  }
                >
                  <UserAccountCard
                    address={transaction?.recipient?.address}
                    name={transaction?.recipient?.name}
                  />
                </Link>
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

export const createEventsRows = (events: EventsType[], loading: boolean) => {
  const columnCount = eventsTableHead.length;

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
    : getTableSkeletons(columnCount);
};

export const createValidatorsRows = (
  validators: ValidatorType[],
  loading: boolean,
  stakingRewards = false,
  stakingCalculatorProps: {
    stakingCalculatorAmount: number;
    stakingCalculatorPeriod: StakesCalculatorPeriodType;
    totalActiveStake: bigint;
  } = {
    stakingCalculatorAmount: 1000,
    stakingCalculatorPeriod: 'day',
    totalActiveStake: BigInt(0),
  },
) => {
  const columnCount = validatorsTableHead(() => '', '', '').length;
  const { stakingCalculatorAmount, stakingCalculatorPeriod, totalActiveStake } =
    stakingCalculatorProps;

  const calculateReward = (validator: ValidatorType) => {
    if (!totalActiveStake) {
      return {
        resultPerBlock: '0',
        inputStake: 0,
        capacity: 0,
        newBlockReward: '0',
      };
    }

    const newStake = BigInt(stakingCalculatorAmount) * BigInt(1_0000_0000);
    const newStakeFloat = parseFloat(newStake.toString(10));
    const newTotalStake = totalActiveStake + BigInt(newStake);
    const newTotalStakeFloat = parseFloat(newTotalStake.toString(10));
    const newValidatorWeight =
      parseFloat(validator.validatorWeight) + newStakeFloat > parseFloat(validator.selfStake) * 10
        ? parseFloat(validator.selfStake) * 10
        : parseFloat(validator.validatorWeight) + newStakeFloat;
    const Commission = validator.commission / 100;
    const newVoteShare =
      parseFloat(newStake.toString(10)) / (parseFloat(validator.totalStake) + newStakeFloat);
    const share = (100 - Commission) / 100;
    const rewardPerBlock = (newValidatorWeight / newTotalStakeFloat) * 90.9 + 0.1;
    const newBlockReward = newVoteShare * rewardPerBlock * share;
    const RewardPerBlock = parseInt(validator.blockReward, 10);
    const stakingCalculatorBeddows = stakingCalculatorAmount * 100000000;
    const Stake = parseFloat(validator.totalStake) + stakingCalculatorBeddows;
    const capacity =
      (parseFloat(validator.totalStake) / (parseFloat(validator.selfStake) * 10)) * 100;

    const stakersRewardPerBlock = (RewardPerBlock: any, Commission: any, Stake: any) =>
      RewardPerBlock * (1 - Commission / 100) * (stakingCalculatorBeddows / Stake);
    const resultPerBlock =
      validator.status === 'active'
        ? parseInt(stakersRewardPerBlock(RewardPerBlock, Commission, Stake).toString()).toString()
        : '0';
    return {
      resultPerBlock,
      inputStake: stakingCalculatorBeddows,
      capacity,
      newBlockReward:
        validator.status === 'active'
          ? newBlockReward > 90.9 * 0.1 + 0.1
            ? convertKLYToBeddows((90.9 * 0.1 + 0.1).toFixed(8))
            : convertKLYToBeddows(newBlockReward.toFixed(8))
          : '0',
    };
  };

  return !loading
    ? validators?.map((validator) => {
        const { inputStake, newBlockReward } = calculateReward(validator);
        const resultPerPeriod =
          stakingCalculatorPeriod === 'block'
            ? newBlockReward
            : stakingCalculatorPeriod === 'day'
              ? (parseInt(newBlockReward) * 84).toString(10)
              : stakingCalculatorPeriod === 'month'
                ? (parseInt(newBlockReward) * 2516).toString(10)
                : stakingCalculatorPeriod === 'year'
                  ? (parseInt(newBlockReward) * 2516 * 12).toString(10)
                  : (parseInt(newBlockReward) * 2516 * 12).toString(10);

        const APR = ((parseInt(newBlockReward) * 2516 * 12) / inputStake) * 100;

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
            stakingRewards
              ? {
                  children: (
                    <div className="flex flex-col items-end">
                      <Tooltip
                        placement={'top'}
                        text={`Staking Rewards per ${stakingCalculatorAmount} KLY per ${stakingCalculatorPeriod}`}
                      >
                        <Currency
                          amount={resultPerPeriod}
                          className="text-paragraph-sm text-lobster font-semibold" //text-onBackground
                          decimals={2}
                          symbol={'KLY'}
                        />
                      </Tooltip>
                      <Tooltip
                        placement={'bottom'}
                        text={`APR is the yearly rate of return on staking ${stakingCalculatorAmount} KLY`}
                      >
                        <Typography
                          color={'lobster'}
                          variant={'caption'}
                        >{`${APR.toFixed(2)}%`}</Typography>
                      </Tooltip>
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
                <div className="flex flex-col items-end">
                  <Currency
                    amount={validator?.validatorWeight}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                  <Typography color={'onBackgroundLow'} variant={'caption'}>
                    {Number(
                      (
                        (Number(validator?.validatorWeight || 0) /
                          Number(validator?.selfStake || 1)) *
                        10
                      ).toFixed(2),
                    )}
                    %
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
                    {formatCommission(validator?.commission)}%
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end text-onBackgroundLow">
                  <Currency amount={validator.totalRewards} decimals={0} symbol={'KLY'} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex justify-end text-onBackgroundLow">
                  <Currency amount={validator.blockReward} decimals={5} symbol={'KLY'} />
                </div>
              ),
            },
          ].filter(Boolean),
        };
      })
    : getTableSkeletons(columnCount);
};

export const createValidatorIncomingStakeRows = (incomingStakes: StakeType[], loading: boolean) => {
  return !loading
    ? incomingStakes?.map((incomingStake) => {
        return {
          cells: [
            {
              children: (
                <Link href={incomingStake?.name ? `/validators/${incomingStake?.address}` : ``}>
                  <UserAccountCard address={incomingStake?.address} name={incomingStake?.name} />
                </Link>
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: <Currency amount={incomingStake?.amount} symbol={'KLY'} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorStakeIncomingTableHead.length);
};

export const createValidatorOutgoingStakeRows = (
  outgoingStakes: StakeType[],
  validator: ValidatorType | undefined,
  loading: boolean,
) => {
  return !loading
    ? outgoingStakes?.map((outgoingStake) => {
        return {
          cells: [
            {
              children: (
                <Link href={outgoingStake?.name ? `/validators/${outgoingStake?.address}` : ``}>
                  <UserAccountCard address={outgoingStake?.address} name={outgoingStake?.name} />
                </Link>
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
              children: <Currency amount={outgoingStake?.amount} symbol={'KLY'} />,
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
              children: (
                <Typography color="onBackgroundLow" variant="paragraph-sm">
                  {'-'}
                </Typography>
              ),
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
                <Link href={stake?.sender?.name ? `/validators/${stake?.sender?.address}` : ``}>
                  <UserAccountCard address={stake?.sender?.address} name={stake?.sender?.name} />
                </Link>
              ),
            },
            {
              children: (
                <>
                  <div className="flex flex-col ">
                    {stake?.params?.stakes?.length > 1
                      ? stake?.params?.stakes?.map((param: any) => {
                          const amount = param?.amount;
                          const color = amount > 0 ? 'success' : 'error';
                          return (
                            <div
                              className="flex items-center justify-between gap-8 w-72 -m-0.5"
                              key={param?.validatorAddress}
                            >
                              <Link
                                href={param?.name ? `/validators/${param?.validatorAddress}` : ``}
                              >
                                <UserAccountCard
                                  address={param?.validatorAddress}
                                  name={param?.name}
                                  nameOnly
                                  nameVariant="paragraph-sm"
                                />
                              </Link>
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
                        })
                      : stake?.params?.stakes?.map((param: any) => {
                          const amount = param?.amount;
                          const color = amount > 0 ? 'success' : 'error';
                          return (
                            <div
                              className="flex items-center justify-between gap-8 w-72 -m-0.5"
                              key={param?.validatorAddress}
                            >
                              <Link
                                href={param?.name ? `/validators/${param?.validatorAddress}` : ``}
                              >
                                <UserAccountCard
                                  address={param?.validatorAddress}
                                  name={param?.name}
                                />
                              </Link>
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
    : getTableSkeletons(stakesOverviewTableHead.length);
};

export const createBlockRows = (
  blocks: BlockType[],
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
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
                    <Link href={`/blocks/${block.id}`}>
                      <Typography link>{shortString(block.id, 12, 'center')}</Typography>
                    </Link>
                  }
                  keyValue={<StatusIcon connected={block.isFinal} />}
                />
              ),
            },
            {
              children: (
                <Typography
                  className={'whitespace-nowrap inline-flex gap-sm items-center cursor-pointer'}
                  color={'onBackgroundLow'}
                >
                  {block?.height?.toLocaleString() ?? ''}
                  <Tooltip placement={'bottom'} text={copyTooltipText}>
                    <span
                      className={'w-4 block'}
                      onClick={() =>
                        handleCopy(block?.height?.toString() ?? '', setCopyTooltipText)
                      }
                    >
                      <Icon
                        className={'desktop:group-hover/child:inline desktop:hidden cursor-pointer'}
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
                <div className="flex items-center">
                  <Tooltip
                    placement={'top'}
                    text={dayjs((block.timestamp ?? 0) * 1000).format('DD MMM YYYY HH:mm')}
                  >
                    <Typography className={'whitespace-nowrap'} color={'onBackgroundLow'}>
                      {fromNowFormatter((block.timestamp ?? 0) * 1000, 'DD MMM YYYY')}
                    </Typography>
                  </Tooltip>
                </div>
              ),
            },
            {
              children: (
                <Link href={`/validators/${block.generator.address}`}>
                  <UserAccountCard address={block.generator.address} name={block.generator.name} />
                </Link>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {shortString(getSeedRevealFromAssets(block.assets), 12, 'center')}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {(block.numberOfTransactions || 0).toLocaleString()}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {(block.numberOfEvents || 0).toLocaleString()}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {(block.numberOfAssets || 0).toLocaleString()}
                </Typography>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(columnCount);
};

export const createFavouritesRows = (favourites: FavouriteType[], loading: boolean) => {
  return !loading
    ? favourites?.map((fav) => {
        return {
          cells: [
            {
              children: (
                <Link href={`/blocks/${fav.address}`}>
                  <UserAccountCard address={fav.address} name={fav.name} />
                </Link>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(favouritesTableHead.length);
};

export const createUsersRows = (users: UsersType[], loading: boolean) => {
  return !loading
    ? users?.map((user) => {
        return {
          cells: [
            {
              //mock_data
              children: <Typography link>{user.rank}</Typography>,
            },
            {
              //mock_data
              children: (
                <Link href={`/users/${user?.account.address}`}>
                  <div className={` relative inline-flex items-center gap-1 ml-2.5`}>
                    <UserAccountCard
                      address={user?.account.address}
                      addressColor="onBackgroundLow"
                      addressVariant="caption"
                      name={user?.account.name}
                      nameColor="onBackgroundMedium"
                      nameFontWeight="semibold"
                      nameVariant="paragraph-sm"
                    />
                  </div>
                </Link>
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={user?.validatorWeight}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                  <Typography color={'onBackgroundLow'} variant={'caption'}>
                    {Number(
                      (
                        (Number(user?.validatorWeight || 0) / Number(user?.selfStake || 1)) *
                        10
                      ).toFixed(2),
                    )}
                    %
                  </Typography>
                </div>
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={user?.validatorWeight}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                  <Typography color={'onBackgroundLow'} variant={'caption'}>
                    {Number(
                      (
                        (Number(user?.validatorWeight || 0) / Number(user?.selfStake || 1)) *
                        10
                      ).toFixed(2),
                    )}
                    %
                  </Typography>
                </div>
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={user?.validatorWeight}
                    className="font-semibold"
                    decimals={0}
                    symbol={'KLY'}
                  />
                  <Typography color={'onBackgroundLow'} variant={'caption'}>
                    {Number(
                      (
                        (Number(user?.validatorWeight || 0) / Number(user?.selfStake || 1)) *
                        10
                      ).toFixed(2),
                    )}
                    %
                  </Typography>
                </div>
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Typography color={'onBackgroundLow'} variant={'caption'}>
                    {'77.77%'}
                  </Typography>
                </div>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(6);
};

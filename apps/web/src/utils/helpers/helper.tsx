import {
  BlockType,
  EventsType,
  FavouriteType,
  StakesCalculatorPeriodType,
  AccountType,
  StakeType,
  TransactionType,
  ValidatorType,
  NodeType,
  TokenType,
  NftType,
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
  IconButton,
  ImageContainer,
  Avatar,
  TokenCard,
} from '@repo/ui/atoms';
import { Link } from '@repo/ui/atoms';
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
  accountsTableHead,
  favouritesTableHead,
} from './tableHeaders.tsx';
import { ChainType, DataType } from '@repo/ui/types';
import { formatCommission, getAmountFromTx } from './dataHelpers.tsx';
import { Currency } from '../../components/currency.tsx';
import { FormattedValue } from '../../components/formattedValue.tsx';

export const createTransactionRows = (
  transactions: TransactionType[],
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
  basePath: string,
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
                  colorVariant={commandColors[transaction.command]}
                  label={replaceColonWithSpace(`${transaction?.module}:${transaction?.command}`)}
                />
              ),
            },
            {
              children: <FormattedValue format={'account'} value={transaction.sender} />,
            },
            {
              children: transaction?.recipient ? (
                <FormattedValue format={'account'} value={transaction.recipient} />
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
                <FormattedValue
                  value={event.module}
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                />
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: (
                <FormattedValue
                  value={event.name}
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                />
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
  basePath: string,
  stakingRewards = false,
  stakingCalculatorProps:
    | {
        stakingCalculatorAmount: number;
        stakingCalculatorPeriod: StakesCalculatorPeriodType;
        totalActiveStake: bigint;
      }
    | undefined = {
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
        const weightPercents = Number(
          ((Number(validator?.totalStake || 0) / Number(validator?.selfStake || 1)) * 10).toFixed(
            2,
          ),
        );
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
                <FormattedValue
                  value={validator?.account}
                  format={'account'}
                  accountIconComponent={
                    <NotificationIcon
                      className="absolute -translate-x-3 -translate-y-3"
                      notificationValue={validator?.rank < 999 ? validator?.rank : ''}
                      size="lg"
                    />
                  }
                />
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
              children: <FormattedValue value={validator?.generatedBlocks} format={'number'} />,
              className: 'text-right',
            },
            {
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={validator?.validatorWeight}
                    className="font-semibold"
                    decimals={0}
                  />
                  <FormattedValue
                    value={weightPercents}
                    format={'percentage'}
                    tooltip={{
                      text: 'The percentage of the validator’s total stake relative to its maximum allowable weight.',
                      placement: 'top',
                    }}
                    typographyProps={{
                      color: weightPercents > 100 ? 'error' : 'onBackgroundLow',
                    }}
                  />
                </div>
              ),
            },
            {
              children: (
                <Currency amount={validator?.selfStake} className="font-semibold" decimals={0} />
              ),
              className: 'text-right',
            },
            {
              children: (
                <Currency amount={validator?.totalStake} className="font-semibold" decimals={0} />
              ),
              className: 'text-right',
            },
            {
              children: (
                <FormattedValue
                  value={formatCommission(validator?.commission)}
                  format={'percentage'}
                  typographyProps={{ variant: 'paragraph-sm' }}
                />
              ),
              className: 'text-right',
            },
            {
              children: (
                <Currency amount={validator.totalRewards} color={'onBackgroundLow'} decimals={0} />
              ),
              className: 'text-right',
            },
            {
              children: (
                <Currency amount={validator.blockReward} color={'onBackgroundLow'} decimals={5} />
              ),
              className: 'text-right',
            },
          ].filter(Boolean),
        };
      })
    : getTableSkeletons(columnCount);
};

export const createValidatorIncomingStakeRows = (
  incomingStakes: StakeType[],
  loading: boolean,
  basePath: string,
) => {
  return !loading
    ? incomingStakes?.map((incomingStake) => {
        return {
          cells: [
            {
              children: <FormattedValue value={incomingStake} format={'account'} />,
              className: 'desktop:w-1/5',
            },
            {
              children: <Currency amount={incomingStake?.amount} />,
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
  basePath: string,
) => {
  return !loading
    ? outgoingStakes?.map((outgoingStake) => {
        return {
          cells: [
            {
              children: <FormattedValue value={outgoingStake} format={'account'} />,
            },
            {
              children: <Currency amount={validator?.validatorWeight || 0} />,
            },
            {
              children: (
                <FormattedValue
                  value={formatCommission(validator?.commission)}
                  format={'percentage'}
                  typographyProps={{ variant: 'paragraph-sm' }}
                />
              ),
            },
            {
              children: <Currency amount={outgoingStake?.amount} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorStakeOutgoingTableHead.length);
};

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
                <FormattedValue value={block.id} format={'string'} link={`/blocks/${block.id}`} />
              ),
            },
            {
              children: <FormattedValue value={block.height} format={'number'} />,
            },
            {
              children: <FormattedValue value={block.timestamp} format={'fromNow'} />,
            },
            {
              children: <FormattedValue value={block.numberOfTransactions} format={'number'} />,
            },
            {
              children: <Currency amount={block.reward ?? 0} decimals={2} />,
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
                <FormattedValue
                  value={event.block.timestamp}
                  format={'fromNow'}
                  typographyProps={{ color: 'onBackground' }}
                />
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: <FormattedValue value={event.block.height} format={'number'} />,
            },
            {
              children: <FormattedValue value={event.module} format={'string'} />,
            },
            {
              children: <FormattedValue value={event.name} format={'string'} />,
              className: 'desktop:w-1/5',
            },
            {
              children: <Currency amount={event.data.amount || 0} decimals={5} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorBlocksTableHead.length);
};

export const createStakesOverviewRows = (
  stakes: TransactionType[],
  loading: boolean,
  basePath: string,
) => {
  return !loading
    ? stakes?.map((stake) => {
        return {
          cells: [
            {
              children: (
                <FormattedValue
                  value={stake?.id}
                  format={'address'}
                  link={`/transactions/${stake.id}`}
                />
              ),
            },
            {
              children: <FormattedValue value={stake.block.timestamp} format={'fromNow'} />,
            },
            {
              children: <FormattedValue value={stake?.sender} format={'account'} />,
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
                                basePath={basePath}
                                href={`/account/${param?.name ?? param?.validatorAddress}`}
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
                                basePath={basePath}
                                href={`/account/${param?.name ?? param?.validatorAddress}`}
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
              children: <FormattedValue value={block.generator} format={'account'} />,
            },
            {
              children: (
                <FormattedValue value={getSeedRevealFromAssets(block.assets)} format={'address'} />
              ),
            },
            {
              children: (
                <FormattedValue value={block.numberOfTransactions || 0} format={'number'} />
              ),
            },
            {
              children: <FormattedValue value={block.numberOfEvents || 0} format={'number'} />,
            },
            {
              children: <FormattedValue value={block.numberOfAssets || 0} format={'number'} />,
            },
          ],
        };
      })
    : getTableSkeletons(columnCount);
};

export const createFavouritesRows = (
  favourites: FavouriteType[],
  loading: boolean,
  basePath: string,
  removeFavourite: (favourite: FavouriteType) => void,
) => {
  return !loading
    ? favourites?.map((fav) => {
        return {
          cells: [
            {
              children: <FormattedValue value={fav} format={'account'} />,
            },
            {
              children: (
                <IconButton
                  className={'group-hover:block desktop:hidden'}
                  icon={'Trash'}
                  onClick={() => removeFavourite(fav)}
                  variant={'quaternary'}
                />
              ),
              className: 'w-iconButtonWidth',
            },
          ],
        };
      })
    : getTableSkeletons(favouritesTableHead.length);
};

export const createAccountsRows = (accounts: AccountType[], loading: boolean, basePath: string) => {
  return !loading
    ? accounts?.map((account, index) => {
        return {
          cells: [
            {
              //mock_data
              children: <Typography>{index + 1}</Typography>,
            },
            {
              //mock_data
              children: (
                <FormattedValue
                  value={account}
                  format={'account'}
                  accountProps={{
                    addressColor: 'onBackgroundLow',
                    addressVariant: 'caption',
                    nameColor: 'onBackgroundMedium',
                    nameFontWeight: 'semibold',
                    nameVariant: 'paragraph-sm',
                  }}
                />
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Currency amount={account?.totalBalance} className="font-semibold" decimals={0} />
                </div>
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={account?.availableBalance}
                    className="font-semibold"
                    decimals={0}
                  />
                  <FormattedValue
                    value={Number(
                      (
                        (Number(account?.availableBalance || 0) /
                          Number(account?.totalBalance || 1)) *
                        100
                      ).toFixed(2),
                    )}
                    format={'percentage'}
                  />
                </div>
              ),
            },
            {
              //mock_data
              children: (
                <div className="flex flex-col items-end">
                  <Currency
                    amount={account?.lockedBalance}
                    className="font-semibold"
                    decimals={0}
                  />
                  <FormattedValue
                    value={Number(
                      (
                        (Number(account?.lockedBalance || 0) / Number(account?.totalBalance || 1)) *
                        100
                      ).toFixed(2),
                    )}
                    format={'percentage'}
                  />
                </div>
              ),
            },
            {
              //mock_data
              children: <FormattedValue format={'percentage'} value={0} />,
              className: 'text-right',
            },
          ],
        };
      })
    : getTableSkeletons(6);
};

export const createChainRows = (chains: ChainType[], loading: boolean) => {
  return !loading
    ? chains?.map((chain) => {
        return {
          cells: [
            {
              children: (
                <Link href={`/chains/${chain.chainId}`}>
                  <div className="flex items-center gap-2">
                    <ImageContainer alt={chain.chainName} src={chain.logo} variant={'avatar'} />
                    <Typography>{chain.chainName}</Typography>
                  </div>
                </Link>
              ),
            },
            {
              children: (
                <FormattedValue
                  value={chain.chainId}
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                />
              ),
            },
            {
              children: <StatusBadge status={'Active'} />,
            },
            {
              children: (
                <FormattedValue
                  value={{
                    address: 'klyu9hw585j9fcod9ca5qxeffukhd29pyh9drrzhf',
                    name: 'Chain Creator',
                  }}
                  format={'account'}
                />
              ),
            },
            {
              children: <Currency amount={21302000000000} decimals={0} />,
            },
            {
              children: <FormattedValue value={1599456799} format={'fromNow'} />,
            },
            {
              children: <FormattedValue value={1599456799} format={'fromNow'} />,
            },
          ],
        };
      })
    : getTableSkeletons(7);
};

export const createUserDetailsTokensRow = (
  token: TokenType[],
  chain: ChainType,
  loading: boolean,
) => {
  return !loading
    ? token?.map((token) => {
        const totalBalance =
          Number(token.availableBalance) + Number(token.lockedBalances?.[0]?.amount ?? 0);
        const availablePercentage =
          totalBalance > 0
            ? ((Number(token.availableBalance) / totalBalance) * 100).toFixed(2)
            : '0.00';
        const lockedPercentage =
          totalBalance > 0
            ? ((Number(token.lockedBalances?.[0]?.amount ?? 0) / totalBalance) * 100).toFixed(2)
            : '0.00';

        return {
          cells: [
            {
              children: (
                <TokenCard
                  chainImage={
                    'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g'
                  }
                  image={'https://cdn.pixabay.com/photo/2023/10/17/17/01/cat-8321993_1280.jpg'}
                  name={'Monkeyz'}
                  symbol={'MON'}
                />
              ),
            },
            {
              children: (
                <div className="flex flex-col">
                  <Currency amount={totalBalance} decimals={0} fontWeight={'semibold'} />
                  <Currency
                    amount={Number(token.availableBalance) * 2}
                    className="text-onBackgroundLow text-caption"
                    decimals={2}
                    sign={'$'}
                  />
                </div>
              ),
            },
            {
              children: (
                <div className="flex flex-col ">
                  <Currency amount={token.availableBalance} decimals={0} fontWeight={'semibold'} />
                  <FormattedValue value={availablePercentage} format={'percentage'} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex flex-col ">
                  <Currency
                    amount={token.lockedBalances?.[0]?.amount ?? 0}
                    decimals={0}
                    fontWeight={'semibold'}
                  />
                  <FormattedValue value={lockedPercentage} format={'percentage'} />
                </div>
              ),
            },
            {
              children: <FormattedValue value={2} format={'number'} />,
            },
            {
              children: (
                <div className="flex gap-2 items-center">
                  <ImageContainer alt={'kly'} src={chain.logo} variant={'avatar'} />
                  <Typography
                    color={'onBackgroundMedium'}
                    fontWeight={'semibold'}
                    variant={'paragraph-sm'}
                  >
                    {chain.chainName}
                  </Typography>
                </div>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(6);
};

export const createTokensRows = (tokens: TokenType[], loading: boolean) => {
  return !loading
    ? tokens?.map((token) => {
        return {
          cells: [
            {
              children: (
                <Link href={`/tokens/${token.tokenId}`}>
                  <TokenCard
                    chainImage={
                      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g'
                    }
                    image={'https://cdn.pixabay.com/photo/2023/10/17/17/01/cat-8321993_1280.jpg'}
                    name={'Monkeyz'}
                    symbol={'MON'}
                  />
                </Link>
              ),
            },
            {
              children: (
                <div className="flex gap-2 items-center">
                  <ImageContainer
                    alt={'kly'}
                    src={
                      'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g'
                    }
                    variant={'avatar'}
                  />
                  <Typography
                    color={'onBackgroundMedium'}
                    fontWeight={'semibold'}
                    variant={'paragraph-sm'}
                  >
                    {'Klayr-main'}
                  </Typography>
                </div>
              ),
            },
            {
              children: (
                <KeyValueComponent
                  keyValue={<StatusIcon status={'successful'} />}
                  contentValue={
                    <FormattedValue
                      value={'Testnet'}
                      format={'string'}
                      typographyProps={{ color: 'onBackgroundHigh' }}
                    />
                  }
                />
              ),
            },
            {
              children: (
                <FormattedValue
                  value={'The description of the token and its purpose'}
                  format={'string'}
                />
              ),
            },
          ],
        };
      })
    : getTableSkeletons(4);
};

export const createNodesRows = (nodes: NodeType[], loading: boolean) => {
  return !loading
    ? nodes?.map((node) => {
        return {
          cells: [
            {
              children: <FormattedValue value={node.ipAddress} format={'string'} />,
            },
            {
              children: <FormattedValue value={node.port} format={'string'} />,
            },
            {
              children: (
                <div className="flex gap-2 items-center">
                  <div className="flex h-6 w-6 bg-white rounded-full items-center justify-center">
                    <div className="flex h-3 w-3 bg-error rounded-full"></div>
                  </div>
                  <Typography
                    color={'onBackgroundMedium'}
                    fontWeight={'semibold'}
                    variant={'paragraph-sm'}
                  >
                    {'Japan'}
                  </Typography>
                </div>
              ),
            },
            {
              children: <FormattedValue value={node.options.blockVersion} format={'number'} />,
            },
            {
              children: <FormattedValue value={node.options.height} format={'number'} />,
            },
            {
              children: <StatusBadge status={'online'} />,
            },
          ],
        };
      })
    : getTableSkeletons(6);
};

export const createNftsRows = (nfts: NftType[], loading: boolean) => {
  return !loading
    ? nfts?.map((nft) => {
        return {
          cells: [
            {
              children: (
                <div className="flex gap-2 items-center">
                  <ImageContainer alt={'kly'} src={nft.image ?? ''} variant={'avatar'} />
                  <Typography color="onBackgroundMedium" fontWeight="semibold">
                    {nft.name}
                  </Typography>
                </div>
              ),
            },
            {
              children: <FormattedValue value={nft.collection} format={'string'} />,
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
              children: <FormattedValue value={`#${nft.rarityRank}`} format={'string'} />,
            },
            {
              children: (
                <div className="flex gap-2 items-center">
                  <ImageContainer alt={'kly'} src={nft.chainImage ?? ''} variant={'avatar'} />
                  <Typography color="onBackgroundMedium" fontWeight="semibold">
                    {nft.chain ?? ''}
                  </Typography>
                </div>
              ),
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
              children: (
                <div className="flex gap-2 items-center">
                  <ImageContainer alt={'kly'} src={nft.image ?? ''} variant={'avatar'} />
                  <Typography color="onBackgroundMedium" fontWeight="semibold">
                    {nft.name}
                  </Typography>
                </div>
              ),
            },
            {
              children: <FormattedValue value={nft.collection} format={'string'} />,
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
              children: (
                <div className="flex gap-2 items-center">
                  <ImageContainer alt={'kly'} src={nft.chainImage ?? ''} variant={'avatar'} />
                  <Typography color="onBackgroundMedium" fontWeight="semibold">
                    {nft.chain ?? ''}
                  </Typography>
                </div>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(5);
};

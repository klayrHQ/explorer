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
import { get } from 'http';

export const createTransactionRows = (
  transactions: TransactionType[],
  currentChain: ChainType,
  chains: ChainType[],
  loading: boolean,
  copyTooltipText: string,
  setCopyTooltipText: (text: string) => void,
  basePath: string,
  statusOfTransaction?: boolean,
) => {
  const columnCount = transactionTableHead(() => '', '', '').length;

  const chainLogo = currentChain?.logo;
  const getChainLogo = (chainID: string) => {
    const fromChain = chains.find((chain) => {
      const isTheChain = chain.chainId === chainID;
      return isTheChain;
    });
    const logo = fromChain?.logo;
    return logo;
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
                  colorVariant={commandColors[transaction.command]}
                  label={replaceColonWithSpace(`${transaction?.module}:${transaction?.command}`)}
                />
              ),
            },
            {
              children: (
                <FormattedValue
                  format={'account'}
                  value={transaction.sender}
                  accountIconComponent={
                    transaction.receivingChainID ? (
                      <div className="w-5 h-5">
                        <img
                          alt="Chain Icon"
                          className="absolute left-2 bottom-4 rounded-full"
                          height={20}
                          src={chainLogo}
                          width={20}
                        />
                      </div>
                    ) : null
                  }
                />
              ),
            },
            {
              children: transaction?.recipient ? (
                <FormattedValue
                  format={'account'}
                  value={transaction.recipient}
                  accountIconComponent={
                    transaction.receivingChainID ? (
                      <div className="w-5 h-5">
                        <img
                          alt="Chain Icon"
                          className="absolute left-2 bottom-4 rounded-full"
                          height={20}
                          src={getChainLogo(transaction.receivingChainID)}
                          width={20}
                        />
                      </div>
                    ) : null
                  }
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
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                  value={event.module}
                />
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: (
                <FormattedValue
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                  value={event.name}
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
                  accountIconComponent={
                    <NotificationIcon
                      className="absolute -translate-x-3 -translate-y-3"
                      notificationValue={validator?.rank < 999 ? validator?.rank : ''}
                      size="lg"
                    />
                  }
                  format={'account'}
                  value={validator?.account}
                />
              ),
            },
            stakingRewards
              ? {
                  children: (
                    <div className="flex flex-col items-end">
                      <FormattedValue
                        currencyProps={{
                          className: 'font-semibold',
                          color: 'error',
                          variant: 'paragraph-sm',
                          decimals: 2,
                        }}
                        format={'currency'}
                        tooltip={`Staking Rewards per ${stakingCalculatorAmount} KLY per ${stakingCalculatorPeriod}`}
                        value={resultPerPeriod}
                      />
                      <FormattedValue
                        format={'percentage'}
                        tooltip={{
                          placement: 'bottom',
                          text: `APR is the yearly rate of return on staking ${stakingCalculatorAmount} KLY`,
                        }}
                        typographyProps={{ color: 'error', variant: 'caption' }}
                        value={APR.toFixed(2)}
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
              children: <FormattedValue format={'number'} value={validator?.generatedBlocks} />,
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
                    format={'percentage'}
                    tooltip={{
                      text: 'The percentage of the validator’s total stake relative to its maximum allowable weight.',
                      placement: 'top',
                    }}
                    typographyProps={{
                      color: weightPercents > 100 ? 'error' : 'onBackgroundLow',
                    }}
                    value={weightPercents}
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
                  format={'percentage'}
                  typographyProps={{ variant: 'paragraph-sm' }}
                  value={formatCommission(validator?.commission)}
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
              children: <FormattedValue format={'account'} value={incomingStake} />,
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
              children: <FormattedValue format={'account'} value={outgoingStake} />,
            },
            {
              children: <Currency amount={validator?.validatorWeight || 0} />,
            },
            {
              children: (
                <FormattedValue
                  format={'percentage'}
                  typographyProps={{ variant: 'paragraph-sm' }}
                  value={formatCommission(validator?.commission)}
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
                  format={'fromNow'}
                  typographyProps={{ color: 'onBackground' }}
                  value={event.block.timestamp}
                />
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: <FormattedValue format={'number'} value={event.block.height} />,
            },
            {
              children: <FormattedValue format={'string'} value={event.module} />,
            },
            {
              children: <FormattedValue format={'string'} value={event.name} />,
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
                <KeyValueComponent
                  contentValue={
                    <FormattedValue
                      format={'address'}
                      link={`/transactions/${stake.id}`}
                      value={shortString(stake?.id, 12, 'center')}
                    />
                  }
                  keyValue={<StatusIcon status={stake.executionStatus} />}
                />
              ),
            },
            {
              children: <FormattedValue format={'fromNow'} value={stake.block.timestamp} />,
            },
            {
              children: <FormattedValue format={'account'} value={stake?.sender} />,
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
                              <FormattedValue
                                format={'account'}
                                value={{ address: param?.validatorAddress, name: param?.name }}
                              />
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
                              <FormattedValue
                                format={'account'}
                                value={{ address: param?.validatorAddress, name: param?.name }}
                              />
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
              children: <FormattedValue format={'account'} value={fav} />,
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
                  accountProps={{
                    addressColor: 'onBackgroundLow',
                    addressVariant: 'caption',
                    nameColor: 'onBackgroundMedium',
                    nameFontWeight: 'semibold',
                    nameVariant: 'paragraph-sm',
                  }}
                  format={'account'}
                  value={account}
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
                    format={'percentage'}
                    value={Number(
                      (
                        (Number(account?.availableBalance || 0) /
                          Number(account?.totalBalance || 1)) *
                        100
                      ).toFixed(2),
                    )}
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
                    format={'percentage'}
                    value={Number(
                      (
                        (Number(account?.lockedBalance || 0) / Number(account?.totalBalance || 1)) *
                        100
                      ).toFixed(2),
                    )}
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
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                  value={chain.chainId}
                />
              ),
            },
            {
              children: <StatusBadge status={'Active'} />,
            },
            {
              children: (
                <FormattedValue
                  format={'account'}
                  value={{
                    address: 'klyu9hw585j9fcod9ca5qxeffukhd29pyh9drrzhf',
                    name: 'Chain Creator',
                  }}
                />
              ),
            },
            {
              children: <Currency amount={21302000000000} decimals={0} />,
            },
            {
              children: <FormattedValue format={'fromNow'} value={1599456799} />,
            },
            {
              children: <FormattedValue format={'fromNow'} value={1599456799} />,
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
                  <FormattedValue format={'percentage'} value={availablePercentage} />
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
                  <FormattedValue format={'percentage'} value={lockedPercentage} />
                </div>
              ),
            },
            {
              children: <FormattedValue format={'number'} value={2} />,
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
                  contentValue={
                    <FormattedValue
                      format={'string'}
                      typographyProps={{ color: 'onBackgroundHigh' }}
                      value={'Testnet'}
                    />
                  }
                  keyValue={<StatusIcon status={'successful'} />}
                />
              ),
            },
            {
              children: (
                <FormattedValue
                  format={'string'}
                  value={'The description of the token and its purpose'}
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
              children: <FormattedValue format={'string'} value={node.ipAddress} />,
            },
            {
              children: <FormattedValue format={'string'} value={node.port} />,
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
              children: <FormattedValue format={'number'} value={node.options.blockVersion} />,
            },
            {
              children: <FormattedValue format={'number'} value={node.options.height} />,
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

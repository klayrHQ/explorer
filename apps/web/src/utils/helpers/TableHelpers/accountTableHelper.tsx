import {
  AccountType,
  StakesCalculatorPeriodType,
  TopAccountType,
  ValidatorType,
} from '../../types.ts';
import {
  accountsTableHead,
  stakesCalculatorTableHead,
  validatorsTableHead,
} from '../tableHeaders.tsx';
import { convertKLYToBeddows, formatCommission, getTableSkeletons } from '../dataHelpers.tsx';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { NotificationIcon, StatusBadge, Tooltip, Typography } from '@repo/ui/atoms';
import { cls, fromNowFormatter } from '@repo/ui/utils';
import { Currency } from '../../../components/currency.tsx';
import React, { useEffect } from 'react';
import { tokenSummaryStore } from '../../../store/tokenSummaryStore.ts';

export const createValidatorsRows = (
  validators: ValidatorType[],
  loading: boolean,
  isScrolled: boolean,
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
  const columnCount = stakingRewards
    ? stakesCalculatorTableHead(() => '', '', '').length
    : validatorsTableHead(() => '', '', '').length;
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

    const newStake =
      BigInt(stakingCalculatorAmount ? stakingCalculatorAmount : 0) * BigInt(1_0000_0000);
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

        const getWeightPercents = (validator: ValidatorType) => {
          const rawPercents = Number(
            ((Number(validator?.totalStake || 0) / Number(validator?.selfStake || 1)) * 10).toFixed(
              2,
            ),
          );
          if (isNaN(rawPercents)) {
            return 0;
          } else if (!isFinite(rawPercents)) {
            return 0;
          } else {
            return rawPercents;
          }
        };
        const weightPercents = getWeightPercents(validator);

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
              className: cls([
                !stakingRewards && 'sticky left-0 bg-background group-hover:bg-backgroundSecondary',
                !stakingRewards && isScrolled ? 'shadow-border-r' : '',
              ]),
            },
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
            stakingRewards
              ? null
              : {
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
                      text: 'Stake capacity',
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
            stakingRewards
              ? null
              : {
                  children: (
                    <div className="flex flex-col items-end">
                      <Currency
                        amount={validator?.totalStake}
                        className="font-semibold"
                        decimals={0}
                      />
                      <FormattedValue
                        format={'currency'}
                        tooltip={{
                          text: 'Self stake',
                          placement: 'top',
                        }}
                        currencyProps={{
                          decimals: 0,
                          className: 'text-caption text-onBackgroundLow',
                        }}
                        value={validator?.selfStake}
                      />
                    </div>
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
            stakingRewards
              ? {
                  children: (
                    <div className="flex flex-col items-end">
                      <FormattedValue
                        value={resultPerPeriod}
                        format={'currency'}
                        tooltip={{
                          text: `Staking Rewards per ${stakingCalculatorAmount} KLY per ${stakingCalculatorPeriod}`,
                          placement: 'top',
                        }}
                        currencyProps={{ className: 'text-paragraph-sm font-semibold' }}
                      />
                      <FormattedValue
                        value={APR.toFixed(2)}
                        format={'percentage'}
                        tooltip={{
                          text: `APR is the yearly rate of return on staking ${stakingCalculatorAmount} KLY`,
                          placement: 'bottom',
                        }}
                      />
                    </div>
                  ),
                }
              : null,
          ].filter(Boolean),
        };
      })
    : getTableSkeletons(columnCount);
};
export const createAccountsRows = (
  accounts: TopAccountType[],
  loading: boolean,
  basePath: string,
  totalSupply: string,
) => {
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
                  copy
                  showCopyOnHover
                  copyIcon
                />
              ),
            },
            {
              children: account?.description ? (
                <Typography color={'onBackgroundMedium'} variant={'caption'}>
                  {account?.description}
                </Typography>
              ) : null,
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
              children: (
                <FormattedValue
                  format={'percentage'}
                  value={Number(
                    ((Number(account?.totalBalance) || 0) / Number(totalSupply || 1)) * 100,
                  )}
                />
              ),
              className: 'text-right',
            },
          ],
        };
      })
    : getTableSkeletons(accountsTableHead().length);
};

import { StakeType, TransactionType, ValidatorType } from '../../types.ts';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { Currency } from '../../../components/currency.tsx';
import { formatCommission, getTableSkeletons } from '../dataHelpers.tsx';
import {
  stakesOverviewTableHead,
  validatorStakeIncomingTableHead,
  validatorStakeOutgoingTableHead,
} from '../tableHeaders.tsx';
import React from 'react';
import { KeyValueComponent, StatusIcon } from '@repo/ui/atoms';
import { shortString } from '@repo/ui/utils';

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
  validators: ValidatorType[] | undefined,
  loading: boolean,
  basePath: string,
) => {
  return !loading
    ? outgoingStakes?.map((outgoingStake) => {
        const validator = validators?.find(
          (validator) => validator.address === outgoingStake.address,
        );
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

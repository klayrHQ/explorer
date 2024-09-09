import { BlockAssetType, TransactionType } from '../types';
import { decode } from 'html-entities';
import {
  BlocksQueryParams,
  EventsQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
} from '../api/types';
import { SkeletonComponent } from '@repo/ui/atoms';

const FIXED_POINT = 10 ** 8
const KLAYR_MAX_DECIMAL_POINTS = 8
const MAX_UINT64 = BigInt("18446744073709551615") // BigInt((2 ** 64) - 1) - 1

enum TransactionCommands {
  POS_STAKE = 'pos:stake',
  POS_CLAIM_REWARDS = 'pos:claimRewards',
}

export const getSeedRevealFromAssets = (assets: BlockAssetType[]) => {
  return assets.find((asset) => asset.module === 'random')?.data.seedReveal;
};

export const formatCommission = (value: number | undefined): string => {
  if (value === undefined) return '';
  return (value / 100).toFixed(2);
};

export const getAmountFromTx = (tx: TransactionType) => {
  switch (`${tx.module}:${tx.command}`) {
    case TransactionCommands.POS_STAKE:
      return tx.params.stakes.reduce((total: number, stake: any) => total + (stake.amount || 0), 0);
    // TODO: claimRewards based on the event
    default:
      return tx.params?.amount;
  }
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
};

export const cleanText = (htmlString: string) => {
  const strippedString = htmlString.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
  return decode(strippedString); // Decode HTML entities
};

export const fetchPaginatedData = async (
  callFunction: Function,
  params: BlocksQueryParams | EventsQueryParams | TransactionQueryParams | ValidatorQueryParams,
  pageNumber: number,
  defaultLimit: string,
) => {
  const offset = (Number(pageNumber) - 1) * Number(defaultLimit);
  const updatedParams = { ...params, limit: defaultLimit, offset };
  return callFunction(updatedParams);
};

export const getTableSkeletons = (cells: number) => {
  return Array.from({ length: 10 }, (_) => {
    return {
      cells: Array.from({ length: cells }, (_) => {
        return {
          children: <SkeletonComponent height="6" width="full" />,
        };
      }),
    };
  });
};

export const parseBeddows = (beddows: number, decimals: number = 2) => {
  if (beddows) {
    const amountFromBeddows = beddows / 100000000;
    return amountFromBeddows.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  return 0;
};

const getDecimalPlaces = (amount: string): number => (amount.split('.')[1] || '').length;

export const convertKLYToBeddows = (lskAmount?: string): string => {
  if (typeof lskAmount !== 'string') {
    throw new Error('Cannot convert non-string amount');
  }
  if (getDecimalPlaces(lskAmount) > KLAYR_MAX_DECIMAL_POINTS) {
    throw new Error('KLY amount has too many decimal points');
  }
  const splitAmount = lskAmount.split('.');
  const liskAmountInt = BigInt(splitAmount[0]);
  const liskAmountFloatBigInt = BigInt(
    (splitAmount[1] ?? '0').padEnd(KLAYR_MAX_DECIMAL_POINTS, '0'),
  );
  const beddowsAmountBigInt = liskAmountInt * BigInt(FIXED_POINT) + liskAmountFloatBigInt;
  if (beddowsAmountBigInt > MAX_UINT64) {
    throw new Error('KLY amount out of range');
  }

  return beddowsAmountBigInt.toString();
};
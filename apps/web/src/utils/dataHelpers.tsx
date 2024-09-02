import { BlockAssetType, TransactionType } from './types';
import { decode } from 'html-entities';
import {
  BlocksQueryParams,
  EventsQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
} from './api/types';

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

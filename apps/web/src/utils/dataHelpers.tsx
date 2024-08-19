import { BlockAssetType, TransactionType } from './types';

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

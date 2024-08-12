import { BlockAssetType } from './types';

export const getSeedRevealFromAssets = (assets: BlockAssetType[]) => {
  return assets.find((asset) => asset.module === 'random')?.data.seedReveal;
};

export const formatCommission = (value: number | undefined): string => {
  if (value === undefined) return '';
  return (value / 100).toFixed(2);
};

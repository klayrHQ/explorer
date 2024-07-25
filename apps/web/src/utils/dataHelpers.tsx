import { BlockAssetType } from './types';

export const getSeedRevealFromAssets = (assets: BlockAssetType[]) => {
  return assets.find((asset) => asset.module === 'random')?.data.seedReveal;
};

import { create } from 'zustand';
import { BlockDetailsType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

export interface BlocksQueryParams {
  blockID?: string;
  limit?: string;
  offset?: number;
  includeAssets?: boolean;
  generatorAddress?: string;
  sort?: string;
}

interface BlockStore {
  blocks: BlockDetailsType[];
  totalBlocks: number;
  setBlocks: (blocks: BlockDetailsType[]) => void;
  setTotalBlocks: (totalBlocks: number) => void;
  callGetBlocks: (params: BlocksQueryParams) => Promise<GatewayRes<BlockDetailsType[]>>;
}

export const useBlockStore = create<BlockStore>()((set, get) => ({
  blocks: [],
  totalBlocks: 0,
  setBlocks: (blocks: BlockDetailsType[]) => set(() => ({ blocks })),
  setTotalBlocks: (totalBlocks: number) => set(() => ({ totalBlocks })),

  callGetBlocks: async (params: BlocksQueryParams): Promise<GatewayRes<BlockDetailsType[]>> => {
    const { blockID, limit, generatorAddress, offset = '0', includeAssets = true, sort } = params;

    try {
      const { data } = await gatewayClient.get<GatewayRes<BlockDetailsType[]>>('blocks', {
        params: {
          blockID,
          limit,
          offset,
          includeAssets,
          generatorAddress,
          sort
        },
      });

      if (data) {
        return data;
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

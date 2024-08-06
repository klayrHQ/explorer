import { create } from 'zustand';
import { BlockDetailsType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

export interface BlocksQueryParams {
  blockID?: string;
  limit?: string;
  offset?: number;
  includeAssets?: boolean;
}

interface BlockStore {
  block: BlockDetailsType | undefined;
  blocks: BlockDetailsType[];
  totalBlocks: number;
  setBlock: (block: BlockDetailsType) => void;
  setBlocks: (blocks: BlockDetailsType[]) => void;
  setTotalBlocks: (totalBlocks: number) => void;
  callGetBlocks: (params: BlocksQueryParams) => Promise<void>;
}

export const useBlockStore = create<BlockStore>()((set, get) => ({
  block: undefined,
  blocks: [],
  totalBlocks: 0,
  setBlock: (block: BlockDetailsType) => set(() => ({ block })),
  setBlocks: (blocks: BlockDetailsType[]) => set(() => ({ blocks })),
  setTotalBlocks: (totalBlocks: number) => set(() => ({ totalBlocks })),

  callGetBlocks: async (params: BlocksQueryParams) => {
    const { setBlock, setBlocks, setTotalBlocks } = get();
    const { blockID, limit, offset = '0', includeAssets = true } = params;

    gatewayClient
      .get<GatewayRes<BlockDetailsType[]>>('blocks', {
        params: {
          blockID,
          limit,
          offset,
          includeAssets,
        },
      })
      .then(({ data }) => {
        if (data) {
          setTotalBlocks(data.meta.total);
          if (data.data.length === 1) {
            setBlock(data.data[0]);
          } else {
            setBlocks(data.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
}));

import { create } from 'zustand';
import { TransactionType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

export interface TransactionQueryParams {
  blockID?: string;
  transactionID?: string;
  limit?: string;
  offset?: number;
  address?: string;
  moduleCommand?: string;
  senderAddress?: string;
  recipientAddress?: string;
  sort?: string; // Include the sort parameter
}

interface TransactionStore {
  transactions: TransactionType[];
  totalTxs: number;
  setTransactions: (transaction: TransactionType[]) => void;
  setTotalTxs: (totalTxs: number) => void;
  callGetTransactions: (params: TransactionQueryParams) => Promise<GatewayRes<TransactionType[]>>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  totalTxs: 0,
  setTransactions: (transactions: TransactionType[]) => set(() => ({ transactions })),
  setTotalTxs: (totalTxs: number) => set(() => ({ totalTxs })),

  callGetTransactions: async (
    params: TransactionQueryParams,
  ): Promise<GatewayRes<TransactionType[]>> => {
    const { blockID, transactionID, limit, offset, address, moduleCommand, senderAddress, recipientAddress, sort } = params;

    try {
      const { data } = await gatewayClient.get<GatewayRes<TransactionType[]>>('transactions', {
        params: {
          blockID,
          transactionID,
          limit,
          offset,
          address,
          moduleCommand,
          senderAddress,
          recipientAddress,
          sort, // Pass the sort parameter to the API request
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
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
}

interface TransactionStore {
  transaction: TransactionType | undefined;
  transactions: TransactionType[];
  totalTxs: number;
  setTransaction: (transaction: TransactionType) => void;
  setTransactions: (transaction: TransactionType[]) => void;
  setTotalTxs: (totalTxs: number) => void;
  callGetTransactions: (params: TransactionQueryParams) => Promise<void>;  
  callGetTransactionsByAddressAndModuleCommand: (address: string, moduleCommand: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transaction: undefined,
  transactions: [],
  totalTxs: 0,
  setTransaction: (transaction: TransactionType) => set(() => ({ transaction })),
  setTransactions: (transactions: TransactionType[]) => set(() => ({ transactions })),
  setTotalTxs: (totalTxs: number) => set(() => ({ totalTxs })),

  callGetTransactions: async (params: TransactionQueryParams) => {
    const { setTransaction, setTransactions, setTotalTxs } = get();
    const { blockID, transactionID, limit, offset, address, moduleCommand } = params;

    gatewayClient
      .get<GatewayRes<TransactionType[]>>('transactions', {
        params: {
          blockID,
          transactionID,
          limit,
          offset,
          address,
          moduleCommand,
        },
      })
      .then(({ data }) => {
        if (data?.data) {
          setTotalTxs(data.meta.total);
          if (data.data.length === 1) {
            setTransaction(data.data[0]);
          } else {
            setTransactions(data.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  callGetTransactionsByAddressAndModuleCommand: async (address: string, moduleCommand: string) => {
    const { setTransaction, setTransactions, setTotalTxs } = get();
  
    gatewayClient
      .get<GatewayRes<TransactionType[]>>('transactions', {
        params: { address, moduleCommand },
      })
      .then(({ data }) => {
        if (data?.data) {
          setTotalTxs(data.meta.total);
          if (data.data.length === 1) {
            setTransaction(data.data[0]);
          } else {
            setTransactions(data.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
}));
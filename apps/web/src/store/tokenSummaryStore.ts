import { create } from 'zustand';
import { callGetTokenSummary } from '../utils/api/apiCalls';

interface TokenSummary {
  totalSupply: { totalSupply: string }[];
  escrowedAmounts: { amount: string }[];
  totalAccounts: number;
  totalTransactions: number;
  marketCap?: number;
  totalValueLocked?: number;
}

interface TokenSummaryStore {
  tokenSummary: TokenSummary;
  setTokenSummary: (tokenSummary: TokenSummary) => void;
  fetchTokenSummary: () => Promise<void>;
}

export const tokenSummaryStore = create<TokenSummaryStore>((set) => ({
  tokenSummary: {
    totalSupply: [],
    escrowedAmounts: [],
    totalAccounts: 0,
    totalTransactions: 0,
  },
  setTokenSummary: (tokenSummary) => set(() => ({ tokenSummary })),
  fetchTokenSummary: async () => {
    try {
      const data = await callGetTokenSummary();
      const tokenSummary = data.data;
      const marketCap = tokenSummary.totalSupply.reduce(
        (acc: number, token: { totalSupply: string }) => acc + parseInt(token.totalSupply),
        0,
      );
      const totalValueLocked = tokenSummary.escrowedAmounts.reduce(
        (acc: number, token: { amount: string }) => acc + parseInt(token.amount),
        0,
      );

      set(() => ({
        tokenSummary: {
          ...tokenSummary,
          marketCap,
          totalValueLocked,
        },
      }));
    } catch (error) {
      console.error('Failed to fetch token summary:', error);
    }
  },
}));

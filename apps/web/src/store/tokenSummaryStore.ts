import { create } from 'zustand';
import { callGetTokenSummary } from '../utils/api/apiCalls';
import { ChainTokenType, TokenSummaryType } from '../utils/types';

interface TokenSummary {
  totalSupply: { tokenID: string; amount: string }[];
  escrowedAmounts: { escrowChainID: string; tokenID: string; amount: string }[];
  totalAccounts: number;
  totalTransactions: number;
  marketCap?: number;
  totalValueLocked?: number;
}

interface TokenSummaryStore {
  tokenSummary: TokenSummary;
  setTokenSummary: (tokenSummary: TokenSummary) => void;
  fetchTokenSummary: (currentChainToken: ChainTokenType) => Promise<void>;
}

export const tokenSummaryStore = create<TokenSummaryStore>((set) => ({
  tokenSummary: {
    totalSupply: [],
    escrowedAmounts: [],
    totalAccounts: 0,
    totalTransactions: 0,
  },
  setTokenSummary: (tokenSummary) => set(() => ({ tokenSummary })),
  fetchTokenSummary: async (currentChainToken: ChainTokenType) => {
    try {
      const data = await callGetTokenSummary();
      const tokenSummary = data.data;
      const currentTokenID = currentChainToken.tokenID;

      const marketCap = tokenSummary.totalSupply.reduce(
        (acc: number, token: TokenSummaryType['totalSupply'][0]) =>
          currentTokenID === token.tokenID ? acc + parseInt(token.amount) : acc,
        0,
      );
      const totalEscrowed = tokenSummary.escrowedAmounts.reduce(
        (acc: number, token: TokenSummaryType['escrowedAmounts'][0]) =>
          currentTokenID === token.tokenID ? acc + parseInt(token.amount) : acc,
        0,
      );
      const totalLocked = tokenSummary.totalLocked.reduce(
        (acc: number, token: TokenSummaryType['totalLocked'][0]) =>
          currentTokenID === token.tokenID ? acc + parseInt(token.total) : acc,
        0,
      );
      const totalValueLocked = totalEscrowed + totalLocked;

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

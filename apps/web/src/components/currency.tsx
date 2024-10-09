'use client';
import { Currency as UICurrency, CurrencyProps } from '@repo/ui/atoms';
import { useChainNetworkStore } from '../store/chainNetworkStore.ts';

export const Currency = ({ symbol, ...props }: CurrencyProps) => {
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const currency = currentChain?.currency;

  return <UICurrency {...props} symbol={symbol ?? currency?.symbol} />;
};

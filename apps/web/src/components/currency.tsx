'use client';
import { Currency as UICurrency, CurrencyProps } from '@repo/ui/atoms';
import { useChainNetwork } from '../providers/chainNetworkProvider.tsx';

export const Currency = ({ symbol, ...props }: CurrencyProps) => {
  const { currentChain } = useChainNetwork();
  const currency = currentChain?.currency;

  return <UICurrency {...props} symbol={symbol ?? currency?.symbol} />;
};

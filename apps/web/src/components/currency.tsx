'use client';
import { Currency as UICurrency, CurrencyProps } from '@repo/ui/atoms';
import { useChainNetworkStore } from '../store/chainNetworkStore.ts';
import { useSettingsStore } from '../store/settingsStore.ts';

export const Currency = ({ symbol, decimals, ...props }: CurrencyProps) => {
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const currentChainToken = useChainNetworkStore((state) => state.currentChainToken);
  const currency = currentChainToken?.symbol;
  const {
    currency: { mantissaSize, trailingZeroes, decimalSeparator, formatting },
  } = useSettingsStore((state) => state.settings);

  const isMainChain = currentChain?.chainName === 'klayr_mainchain';

  return (
    <UICurrency
      {...props}
      symbol={formatting.includes('Symbol') ? (symbol ?? currency ?? 'KLY') : undefined}
      sign={formatting.includes('Sign') && isMainChain ? 'Ҝ' : undefined}
      decimals={decimals ?? Number(mantissaSize)}
      trailingZeroes={trailingZeroes}
      separator={decimalSeparator as 'Comma' | 'Period'}
    />
  );
};

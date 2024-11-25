import { Typography, TypographyProps } from '@repo/ui/atoms';
import { cls, parseBeddows } from '../../../utils/functions.ts';

export interface CurrencyProps extends Omit<TypographyProps, 'children'> {
  amount: string | number;
  sign?: string;
  symbol?: string;
  decimals?: number;
  marketValue?: number;
  separator?: 'Comma' | 'Period';
  trailingZeroes?: boolean;
}

export const Currency = ({
  amount,
  sign,
  symbol,
  decimals,
  className,
  marketValue,
  separator,
  trailingZeroes,
  ...props
}: CurrencyProps) => {
  return (
    <Typography {...props} className={cls(['gap-0.5', className])}>
      {amount ? (
        <>
          {sign && <span>{sign}</span>}
          {parseBeddows(Number(amount), decimals, separator, trailingZeroes)}
          {symbol && (
            <span>
              {'\u00A0'}
              {symbol}
            </span>
          )}
        </>
      ) : (
        '-'
      )}
      {marketValue && (
        <>
          {'\u00A0|\u00A0'}
          <span>{'$'}</span>
          {marketValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,})}
        </>
      )}
    </Typography>
  );
};

import { Typography, TypographyProps } from '@repo/ui/atoms';
import { cls, parseBeddows } from '../../../utils/functions.ts';

interface CurrencyProps extends Omit<TypographyProps, 'children'> {
  amount: string | number;
  sign?: string;
  symbol?: string;
  decimals?: number;
  marketValue?: number;
}

export const Currency = ({
  amount,
  sign,
  symbol,
  decimals,
  className,
  marketValue,
  ...props
}: CurrencyProps) => {
  return (
    <Typography {...props} className={cls(['gap-0.5', className])}>
      {amount ? (
        <>
          {sign && <span>{sign}</span>}
          {parseBeddows(Number(amount), decimals)}
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
          {marketValue.toFixed(2)}
        </>
      )}
    </Typography>
  );
};

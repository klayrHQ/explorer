import { Typography, TypographyProps } from "@repo/ui/atoms";
import {cls, parseBeddows} from "../../../utils/functions.ts";

interface CurrencyProps extends Omit<TypographyProps, 'children'> {
  amount: string | number;
  sign?: string;
  symbol?: string;
  decimals?: number;
}

export const Currency = ({
  amount,
  sign,
  symbol,
  decimals,
  className,
  ...props
}: CurrencyProps) => {
  return (
    <Typography {...props} className={cls(["inline-flex gap-0.5", className])}>
      {
        amount ? (
          <>
            <span>{sign} </span>
            {parseBeddows(Number(amount), decimals)}
            <span>{symbol}</span>
          </>
        ) : (
          "-"
        )
      }
    </Typography>
  );
};
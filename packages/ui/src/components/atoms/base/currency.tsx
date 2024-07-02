import { Typography, TypographyProps } from "@repo/ui/atoms";
import {parseBeddows} from "../../../utils/functions.ts";

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
  ...props
}: CurrencyProps) => {
  return (
    <Typography {...props} className="inline-flex gap-0.5">
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
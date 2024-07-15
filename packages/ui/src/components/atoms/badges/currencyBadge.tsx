import { ColorType } from "../../../types/types";
import { Currency } from "../base/currency";

type BadgeProps = {
  borderColor?: ColorType;
  backgroundColor?: ColorType | string;
  className?: string;
  amount: string | number;
  symbol?: string;
};


export const CurrencyBadge = ({ className,  borderColor='success', backgroundColor='greenOpacity', amount, symbol }: BadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-1.5 p-1.5 rounded-md bg-${backgroundColor} border border-${borderColor} ${className}`}>
      <Currency amount={amount} symbol={symbol} variant="caption"   fontWeight="normal" />
    </div>
  ); 
};

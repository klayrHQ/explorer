import { Typography, TypographyProps } from "@repo/ui/atoms";

interface CurrencyProps extends Omit<TypographyProps, 'children'> {
    amount: string | number;
    sign?: string;
    symbol?: string;
}

export const Currency = ({
    amount,
    sign, 
    symbol,
    ...props
}: CurrencyProps) => {
    return (
        <Typography {...props} className="inline-flex gap-0.5" fontWeight="semibold">
           <div>{sign} </div> 
            {amount}
            <div>{symbol}</div>
        </Typography>
    );
};
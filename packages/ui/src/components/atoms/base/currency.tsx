import { Typography, TypographyProps } from "@repo/ui/atoms";

interface CurrencyProps extends TypographyProps {
    amount: string | number;
    sign?: string;
    symbol?: string;
}

export const Currency = ({
    amount,
    sign = "$",
    symbol = "KLY",
    ...props
}: CurrencyProps) => {
    return (
        <Typography {...props}>
            {sign}
            {amount}
            {symbol}
        </Typography>
    );
};
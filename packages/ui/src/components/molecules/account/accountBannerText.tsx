import { Typography } from '../../atoms';
import { Currency } from '../../atoms/base/currency';
export interface ValidatorBannerTextProps {
  transactions: string | number;
  coinRate?: number;
  balance?: string | number;
  balanceSymbol?: string;
}

export const AccountBannerText = ({
  transactions,
  coinRate,
  balance,
  balanceSymbol,
}: ValidatorBannerTextProps) => {
  const dollarValue = coinRate ? Number(balance) * Number(coinRate) : 0;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-5 desktop:mt-4">
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'user'}
      </Typography>
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'with'}
      </Typography>
      {/*{Number(incomingTransactions) > 0 ? (
        <Typography fontWeight="semibold" variant="paragraph-md">
          {Number(incomingTransactions)} {'incoming'}
        </Typography>
      ) : null}*/}

      {/*<Typography color="onBackgroundMedium" variant="paragraph-md">
        {'and'}
      </Typography>*/}

      <Typography fontWeight="semibold" variant="paragraph-md">
        {Number(transactions)} {/*{'outgoing'}*/}
      </Typography>
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'transactions and a total balance of'}
      </Typography>

      <Currency amount={balance ?? 0} decimals={3} fontWeight="semibold" symbol={balanceSymbol} />
      <span>
        (<Currency amount={dollarValue ?? 0} decimals={2} fontWeight="semibold" sign={'$'} />)
      </span>
    </div>
  );
};

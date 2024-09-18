import { Typography } from '../../atoms';
import { Currency } from '../../atoms/base/currency';
import { BadgeNoIcon } from '../../atoms';

export interface ValidatorBannerTextProps {
  incomingTransactions: string | number;
  outgoingTransactions: string | number;
  coinRate?: number;
  value?: string | number;
  valueSymbol?: string;
  rank: number | string;
}

export const UserBannerText = ({
  incomingTransactions,
  outgoingTransactions,
  coinRate,
  value,
  valueSymbol,
  rank,
}: ValidatorBannerTextProps) => {
  const dollarValue = coinRate ? Number(value) * Number(coinRate) : 0;

  return (
    <div className="transitionBannerContainerWidthMobile desktop:max-w-transitionBannerContainerWidth  flex flex-wrap items-center gap-1.5 mt-5 desktop:mt-4">
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'user'}
      </Typography>
      <Typography className="capitalize" color="onBackgroundMedium" variant="paragraph-md">
        {rank}
      </Typography>
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'with'}
      </Typography>
      {Number(incomingTransactions) > 0 ? (
        <Typography fontWeight="semibold" variant="paragraph-md">
          {Number(incomingTransactions)} {'incoming'}
        </Typography>
      ) : null}

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'and'}
      </Typography>

      <Typography fontWeight="semibold" variant="paragraph-md">
        {Number(outgoingTransactions)} {'outgoing'}
      </Typography>
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'ransactions and a total holding of'}
      </Typography>

      <Currency amount={value ?? 0} decimals={3} fontWeight="semibold" symbol={valueSymbol} />
      <Currency amount={dollarValue ?? 0} decimals={2} fontWeight="semibold" sign={'$'} />
    </div>
  );
};
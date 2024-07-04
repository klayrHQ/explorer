import { Typography } from "../../atoms";
import { CurrencyBadge } from "../../atoms/badges/currencyBadge";
import { Currency } from "../../atoms/base/currency";

export interface ValidatorBannerTextProps {
  senderName?: string | null;
  stakes?: number;
  value?: string | number;
  valueSymbol?: string;
  selfStake?: string | number;
  selfStakeSymbol?: string;
  capacity?: string | number;
  capacitySymbol?: string;
}

export const ValidatorBannerText = ({
  senderName,
  stakes = 0,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  capacitySymbol,
}: ValidatorBannerTextProps) => {
  const getStakeWord = (stake: number) => {
    return stake > 1 ? "stakes" : "stake";
  };

  return (
    <div className="transitionBannerContainerWidthMobile desktop:w-transitionBannerContainerWidth  flex flex-wrap items-center gap-1.5 mt-6">
      <Typography variant="paragraph-md" color="onBackgroundMedium">
        {senderName} has a total of
      </Typography>

      <Typography fontWeight="semibold" variant="paragraph-md">
        {stakes} {getStakeWord(stakes)}
      </Typography>

      <Typography variant="paragraph-md" color="onBackgroundMedium">
        with a value of
      </Typography>

      <Currency amount={value ?? 0} symbol={valueSymbol} />

      <Typography variant="paragraph-md" color="onBackgroundMedium">
        and self stake of
      </Typography>

      <Currency amount={selfStake ?? 0} symbol={selfStakeSymbol} />

      <Typography variant="paragraph-md" color="onBackgroundMedium">
        and capacity of
      </Typography>

      <CurrencyBadge amount={capacity ?? 0} symbol={capacitySymbol} />
    </div>
  );
};

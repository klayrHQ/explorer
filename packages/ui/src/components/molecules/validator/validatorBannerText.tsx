import { Typography } from "../../atoms";
import { CurrencyBadge } from "../../atoms/badges/currencyBadge";
import { Currency } from "../../atoms/base/currency";
import { Badge } from "../../atoms";

export interface ValidatorBannerTextProps {
  senderName?: string | null;
  stakes?: number;
  value?: string | number;
  valueSymbol?: string;
  selfStake?: string | number;
  selfStakeSymbol?: string;
  capacity?: number;
}

export const ValidatorBannerText = ({
  senderName,
  stakes = 0,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
}: ValidatorBannerTextProps) => {
  const getStakeWord = (stake: number) => {
    return stake > 1 ? "stakes" : "stake";
  };

  return (
    <div className="transitionBannerContainerWidthMobile desktop:w-transitionBannerContainerWidth  flex flex-wrap items-center gap-1.5 mt-5">
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

      {capacity && capacity > 100 ? (
        <Badge
          label={`${capacity}%`}
          padding="1.5"
          variant="caption"
          colorVariant="success"
          borderColor="success"
          backgroundColor="greenOpacity"
        />
      ) : (
        <Badge
          label={`${capacity}%`}
          padding="1.5"
          variant="caption"
          colorVariant="error"
          borderColor="error"
          backgroundColor="redOpacity"
        />
      )}
    </div>
  );
};

import { Typography } from "../../atoms";
import { Badge } from "../../atoms";
import { CurrencyBadge } from "../../atoms/badges/currencyBadge";
import { ImageName } from "../../atoms/account/avatarAddress";
import { Currency } from "../../atoms/base/currency";
import { trimSix, trimFour } from "../../../utils/functions";
import {
  dayjs,
  fromNowFormatter,
  replaceColonWithSpace,
} from "../../../utils/functions";

interface TransactionBannerProps {
  amount?: string | number;
  symbol?: string;
  senderName?: string | null;
  senderAddress: string;
  senderImageUrl?: string | null;
  receiverName?: string | null;
  receiverAddress?: string;
  receiverImageUrl?: string | null;
  moduleCommand?: string;
  executionStatus?: string;
  timestamp?: number;
  badgeColor?: string;
  stakes?: string | number;
  value?: string | number;
  valueSymbol?: string;
  selfStake?: string | number;
  selfStakeSymbol?: string;
  capacity?: string | number;
  capacitySymbol?: string;
}

export const BannerText = ({
  senderName,
  stakes,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  capacitySymbol,
}: TransactionBannerProps) => {
  const getStakeWord = (stake: number) => {
    return stake > 1 ? "stakes" : "stake";
  };

  return (
    <div className="transitionBannerContainerWidthMobile desktop:w-transitionBannerContainerWidth  flex flex-wrap items-center gap-1.5 mt-6">
      <Typography variant="paragraph-md" color="onBackgroundMedium">
        {senderName} has a total of
      </Typography>

      <Typography fontWeight="semibold" variant="paragraph-md">
        {stakes} [getStakeWord(stakes)]
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

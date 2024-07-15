import { Typography } from "../../atoms";
import { Badge } from "../../atoms";
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
}

export const BannerText = ({
  amount,
  symbol,
  senderName,
  senderAddress,
  senderImageUrl,
  receiverName,
  receiverAddress,
  receiverImageUrl,
  moduleCommand,
  executionStatus,
  timestamp=1,
  badgeColor,
}: TransactionBannerProps) => {

  const date = dayjs(timestamp * 1000);

  const fromNowPrefix = dayjs().diff(date, "hour") >= 1 ? "on" : "over";
  

  return (
    <div className="transitionBannerContainerWidthMobile desktop:w-transitionBannerContainerWidth  flex flex-wrap items-center gap-1.5 mt-6">
      {/* SENDER */}
      <ImageName
        imageUrl={
          senderImageUrl ||
          "https://i.pinimg.com/originals/33/43/f1/3343f1d93df9126c9123917f67893927.jpg"
        }
        name={senderName || trimFour(senderAddress)}
      />

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        send
      </Typography>

      {/* RECEIVER */}
      {receiverAddress && (
        <ImageName
          imageUrl={
            receiverImageUrl ||
            "https://i.pinimg.com/originals/33/43/f1/3343f1d93df9126c9123917f67893927.jpg"
          }
          name={receiverName || trimFour(receiverAddress)}
        />
      )}

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        the amount of
      </Typography>

      {/* AMOUNT */}
      <Currency amount={amount ?? 0} fontWeight={"semibold"} symbol={symbol} />

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        in type
      </Typography>

      {/* MODULE COMMAND */}
      <Badge
        borderColor="gray-1"
        className="flex-grow-0 capitalize"
        colorVariant={badgeColor || "green"}
        label={replaceColonWithSpace(moduleCommand ?? "")}
      />

      {/* TIMESTAMP */}
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {fromNowPrefix}
      </Typography>
      <Typography fontWeight="semibold" variant="paragraph-md">
        {fromNowFormatter(timestamp * 1000)}
      </Typography>

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        and was
      </Typography>

      {/* EXECUTION STATUS */}
      {executionStatus === "successful" ? (
        <Badge
          backgroundColor="greenOpacity"
          borderColor="success"
          className="flex-grow-0"
          colorVariant="success"
          label="Successful"
        />
      ) : (
        <Badge
          backgroundColor="redOpacity"
          borderColor="error"
          className="flex-grow-0"
          colorVariant="error"
          label="Failed"
        />
      )}
    </div>
  );
};

import { Typography } from "../../atoms";
import { Badge } from "../../atoms";
import { ImageName } from "./imageName";
import { Currency } from "../../atoms/base/currency";
import { trimSix, trimFour } from "../../../utils/functions";
import {dayjs, fromNowFormatter} from "../../../utils/functions";

interface TransactionBannerProps {
  amount: string | number;
  symbol: string;
  senderName?: string | null;
  senderAddress: string;
  senderImageUrl?: string | null;
  receiverName?: string | null;
  receiverAddress?: string;
  receiverImageUrl?: string | null;
  moduleCommand: string;
  executionStatus?: string;
  timestamp: number;
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
  timestamp,
  badgeColor,
}: TransactionBannerProps) => {
  
  return (
    <div className="transitionBannerContainerWidthMobile desktop:w-transitionBannerContainerWidth  flex flex-wrap items-center gap-1.5 mt-6">
      <ImageName
        imageUrl={
          senderImageUrl ||
          "https://i.pinimg.com/originals/33/43/f1/3343f1d93df9126c9123917f67893927.jpg"
        }
        name={senderName || trimFour(senderAddress)}
      />
      <Typography variant="paragraph-md" color="onBackgroundMedium">send</Typography>
      {receiverAddress && (
        <ImageName
          imageUrl={
            receiverImageUrl ||
            "https://i.pinimg.com/originals/33/43/f1/3343f1d93df9126c9123917f67893927.jpg"
          }
          name={receiverName || trimFour(receiverAddress)}
        />
      )}
      <Typography variant="paragraph-md" color="onBackgroundMedium">the amount of</Typography>
      <Currency amount={amount} symbol={symbol} />
      <Typography variant="paragraph-md" color="onBackgroundMedium">in type</Typography>
      <Badge
        borderColor="gray-1"
        className="flex-grow-0 capitalize"
        colorVariant={badgeColor || "green"}
        label={moduleCommand || "Transfer"}
      />
      {/* <Typography variant="paragraph-md">over </Typography> */}
      <Typography fontWeight="semibold" variant="paragraph-md">

        {/* {dayjs(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss")} */}
        {fromNowFormatter(timestamp * 1000)}

      </Typography>
      <Typography variant="paragraph-md" color="onBackgroundMedium">and was</Typography>
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

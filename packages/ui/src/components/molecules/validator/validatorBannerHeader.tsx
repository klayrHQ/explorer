import { trimSix } from "../../../utils/functions";
import { Badge, Typography } from "../../atoms";
import { CopyIcon } from "../../atoms/input/copyIcon";
import { ImageNotification } from "../../atoms";
import { BadgeIcon } from "../../atoms";
import { ValidatorBannerButtons } from "./validatorBannerButtons";


export interface ValidatorBannerHeaderProps {
  senderAddress: string;
  senderName?: string;
  online?: boolean;
  notificationValue: number | string;
  imageUrl: string;
  name?: string;
}

export const ValidatorBannerHeader = ({
  senderAddress,
  senderName,
  online,
  notificationValue,
  imageUrl,
  name = "User Avatar",
}: ValidatorBannerHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <ImageNotification
          notificationValue={notificationValue}
          imageUrl={imageUrl}
          name={name}
        />
        {senderName ? (
          <div className="flex flex-col ">
            <div className=" ">
                <h3 className="text-heading-4 desktop:text-heading-3 font-bold">{senderName}</h3>
            </div>

            <div className="flex gap-2 items-center">
              <Typography
                variant="caption"
                fontWeight="normal"
                color="onBackgroundMedium"
              >
                {trimSix(senderAddress)}
              </Typography>
              <CopyIcon size="xxs" content={senderAddress} />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <h3 className="text-heading-4 desktop:text-heading-3 font-bold"> {trimSix(senderAddress)}</h3>
            <CopyIcon size="xs" content={senderAddress} />
          </div>
        )}

        <div className="hidden desktop:flex"> 
          {online ? (
            <Badge
              label="Online"
              padding="1.5"
              variant="caption"
              colorVariant="success"
              borderColor="success"
              backgroundColor="greenOpacity"
            />
          ) : (
            <Badge
              label="Offline"
              padding="1.5"
              variant="caption"
              colorVariant="error"
              borderColor="error"
              backgroundColor="redOpacity"
            />
          )}
        </div>
        <div className="flex desktop:hidden"> 
          {online ? (
            <div className=" flex items-center justify-center w-5 h-5 rounded-sm border-1 border-success shadow-sm">
                <BadgeIcon colorVariant="success" width="1.5" height="1.5" />
            </div>
          ) : (
            <div>
                <div className=" flex items-center justify-center w-5 h-5 rounded-sm border-1 border-error shadow-sm">
                <BadgeIcon colorVariant="error" width="1.5" height="1.5" />
            </div>
            </div>
          )}
          <ValidatorBannerButtons />
        </div>
      </div>
    </div>
  );
};

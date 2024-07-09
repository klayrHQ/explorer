import { trimSix } from "../../../utils/functions";
import { Badge, Typography } from "../../atoms";
import { CopyIcon } from "../../atoms/input/copyIcon";
import { ImageNotification } from "../../atoms";
import { Popover } from "../../atoms/utilities/popover";
import { IconButton } from "../../atoms/input/iconButton";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <ImageNotification
          notificationValue={notificationValue}
          imageUrl={imageUrl}
          name={name}
        />
        {senderName ? (
          <div className="flex flex-col gap-2">
            <div className=" ">
              <Typography fontWeight="bold" variant="h3">
                {senderName}
              </Typography>
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
            <Typography fontWeight="bold" variant="h3">
              {trimSix(senderAddress)}
            </Typography>
            <CopyIcon size="xs" content={senderAddress} />
          </div>
        )}

        <div>
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
      </div>
    </div>
  );
};

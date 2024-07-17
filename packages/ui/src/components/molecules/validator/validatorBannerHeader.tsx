import { trimSix, trimFour } from '../../../utils/functions';
import { Badge, Typography } from '../../atoms';
import { CopyIcon } from '../../atoms/input/copyIcon';
import { ImageNotification } from '../../atoms';
import { BadgeIcon } from '../../atoms';
import { ValidatorBannerButtons } from './validatorBannerButtons';

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
  name = 'User Avatar',
}: ValidatorBannerHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <ImageNotification imageUrl={imageUrl} name={name} notificationValue={notificationValue} />
        {senderName ? (
          <div className="flex flex-col ">
            <div className="  w-full max-w-24 desktop:max-w-96">
              <h3 className="text-heading-4 desktop:text-heading-3 font-bold hidden desktop:inline-flex">
                {senderName}
              </h3>
              <h3 className="text-heading-4 desktop:text-heading-3 font-bold desktop:hidden truncate ">
                {senderName}
              </h3>
            </div>

            <div className="flex gap-2 items-center">
              <Typography
                className="hidden desktop:flex"
                color="onBackgroundMedium"
                fontWeight="normal"
                variant="caption"
              >
                {trimSix(senderAddress)}
              </Typography>
              <Typography
                className="desktop:hidden"
                color="onBackgroundMedium"
                fontWeight="normal"
                variant="caption"
              >
                {trimFour(senderAddress)}
              </Typography>
              <CopyIcon content={senderAddress} size="xxs" />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <h3 className="text-heading-4 desktop:text-heading-3 font-bold">
              {' '}
              {trimSix(senderAddress)}
            </h3>
            <CopyIcon content={senderAddress} size="xs" />
          </div>
        )}

        <div className="hidden desktop:flex">
          {online ? (
            <Badge
              backgroundColor="greenOpacity"
              borderColor="success"
              colorVariant="success"
              label="Online"
              padding="1.5"
              variant="caption"
            />
          ) : (
            <Badge
              backgroundColor="redOpacity"
              borderColor="error"
              colorVariant="error"
              label="Offline"
              padding="1.5"
              variant="caption"
            />
          )}
        </div>
        <div className="flex items-center desktop:hidden">
          {online ? (
            <div className=" flex items-center justify-center w-5 h-5 mr-0.5 rounded-sm border-1 border-success shadow-sm">
              <BadgeIcon colorVariant="success" height="1.5" width="1.5" />
            </div>
          ) : (
            <div>
              <div className=" flex items-center justify-center w-5 h-5 rounded-sm border-1 border-error shadow-sm">
                <BadgeIcon colorVariant="error" height="1.5" width="1.5" />
              </div>
            </div>
          )}
          <ValidatorBannerButtons />
        </div>
      </div>
    </div>
  );
};

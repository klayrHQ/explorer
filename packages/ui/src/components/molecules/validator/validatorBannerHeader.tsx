import { Badge, Typography } from '../../atoms';
import { CopyIcon } from '../../atoms/input/copyIcon';
import { ImageNotification } from '../../atoms';
import { BadgeIcon } from '../../atoms';
import { ValidatorBannerButtons } from './validatorBannerButtons';
import { UserAccountCard } from '../../atoms/account/userAccountCard';

export interface ValidatorBannerHeaderProps {
  senderAddress: string;
  senderName?: string;
  status?: string;
  notificationValue: number | string;
}

export const ValidatorBannerHeader = ({
  senderAddress,
  senderName,
  status,
  notificationValue,
}: ValidatorBannerHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <ImageNotification notificationValue={notificationValue} />
        <UserAccountCard
          address={senderAddress}
          addressColor="onBackgroundMedium"
          addressVariant="caption"
          copyIcon
          name={senderName}
          nameColor="onBackground"
          nameFontWeight="bold"
          nameVariant="h3"
          size={40}
          width="auto"
        />
        <div className="hidden desktop:flex">
          {status === 'active' ? (
            <Badge
              backgroundColor="greenOpacity"
              borderColor="success"
              colorVariant="success"
              label="Active"
              padding="1.5"
              variant="caption"
            />
          ) : (
            <Badge
              backgroundColor="redOpacity"
              borderColor="error"
              colorVariant="error"
              label={status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : ''}
              padding="1.5"
              variant="caption"
            />
          )}
        </div>
        <div className="flex items-center desktop:hidden">
          {status === 'active' ? (
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
          {/* <ValidatorBannerButtons /> */}
        </div>
      </div>
    </div>
  );
};

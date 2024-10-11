import { Badge, StatusBadge, Typography } from '../../atoms';
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
        <div className=" desktop:flex mb-4">
          <StatusBadge status={status || ''} />
        </div>
      </div>
    </div>
  );
};

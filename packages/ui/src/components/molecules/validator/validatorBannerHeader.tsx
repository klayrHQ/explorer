import { Avatar, Badge, StatusBadge, Typography } from '../../atoms';
import { CopyIcon } from '../../atoms/input/copyIcon';
import { ImageNotification } from '../../atoms';
import { BadgeIcon } from '../../atoms';
import { ValidatorBannerButtons } from './validatorBannerButtons';
import { UserAccountCard } from '../../atoms/account/userAccountCard';
import { UserAccountCentered } from '../../atoms/account/useAccountCentered';

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
    <div className="flex flex-col gap-1.5 desktop:gap-0  justify-between items-start desktop:items-center">
      <div className="desktop:hidden flex gap-2">
        <UserAccountCentered
          address={senderAddress}
          name={senderName}
          notificationValue={notificationValue}
          status={status}
        />
      </div>
      <div className="desktop:flex gap-2 items-center hidden">
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
        <div className="hidden desktop:flex mb-4">
          <StatusBadge status={status || ''} />
        </div>
      </div>
    </div>
  );
};

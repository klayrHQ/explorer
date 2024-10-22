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
    <div className="flex gap-1 desktop:gap-2  justify-between items-center ">
      <UserAccountCentered
        address={senderAddress}
        name={senderName}
        notificationValue={notificationValue}
        status={status}
      />
      <div className="hidden desktop:flex mb-4">
        <StatusBadge status={status || ''} />
      </div>
    </div>
  );
};

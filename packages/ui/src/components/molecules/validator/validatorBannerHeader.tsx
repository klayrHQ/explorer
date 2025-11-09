import { Avatar, Badge, StatusBadge, Typography } from '../../atoms';
import { CopyIcon } from '../../atoms/input/copyIcon';
import { ImageNotification } from '../../atoms';
import { BadgeIcon } from '../../atoms';
import { ValidatorBannerButtons } from './validatorBannerButtons';
import { UserAccountCard } from '../../atoms/account/userAccountCard';
import { UserAccountCentered } from '../../atoms/account/useAccountCentered';
import { CSSProperties } from 'react';

export interface ValidatorBannerHeaderProps {
  style?: CSSProperties;
  senderAddress: string;
  publicKey?: string;
  senderName?: string;
  status?: string;
  loading?: boolean;
  notificationValue: number | string;
  isMobile?: boolean;
}

export const ValidatorBannerHeader = ({
  style,
  senderAddress,
  senderName,
  publicKey,
  status,
  loading,
  notificationValue,
  isMobile,
}: ValidatorBannerHeaderProps) => {
  return (
    <div className="flex gap-1 desktop:gap-2  justify-between items-center " style={style}>
      <UserAccountCentered
        address={senderAddress}
        name={senderName}
        publicKey={publicKey}
        notificationValue={notificationValue}
        status={status}
        loading={loading}
        isMobile={isMobile}
      />
      <div className="hidden desktop:flex mb-4">
        <StatusBadge status={status || ''} />
      </div>
    </div>
  );
};

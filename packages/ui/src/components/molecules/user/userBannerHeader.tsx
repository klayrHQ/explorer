import { StatusBadge, Typography } from '../../atoms';
import { UserAccountCard } from '../../atoms/account/userAccountCard';

export interface ValidatorBannerHeaderProps {
  senderAddress: string;
  senderName?: string;
  status: string;
}

export const UserBannerHeader = ({
  senderAddress,
  senderName,
  status,
}: ValidatorBannerHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
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
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

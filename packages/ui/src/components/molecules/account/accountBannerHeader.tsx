import { StatusBadge, Typography } from '../../atoms';
import { UserAccountCard } from '../../atoms/account/userAccountCard';
import { UserAccountCentered } from '../../atoms/account/useAccountCentered';

export interface ValidatorBannerHeaderProps {
  senderAddress?: string;
  senderName?: string;
  status: string;
}

export const AccountBannerHeader = ({
  senderAddress = '',
  senderName,
  status,
}: ValidatorBannerHeaderProps) => {
  return (
    <div className="flex gap-1 desktop:gap-2  justify-between items-center ">
      <UserAccountCentered
        address={senderAddress}
        name={senderName}
        status={status}
        role=""
        validator={false}
      />
      <div className="hidden desktop:flex mb-4">
        <StatusBadge status={status || ''} />
      </div>
    </div>
  );
};

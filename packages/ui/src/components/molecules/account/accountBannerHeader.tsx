import { StatusBadge, Typography } from '../../atoms';
import { UserAccountCentered } from '../../atoms/account/useAccountCentered';
export interface AccountBannerHeaderProps {
  senderAddress?: string;
  senderName?: string;
  publicKey?: string;
}

export const AccountBannerHeader = ({
  senderAddress = '',
  publicKey,
  senderName,
}: AccountBannerHeaderProps) => {
  return (
    <div className="flex gap-1 desktop:gap-2  justify-between items-center ">
      <UserAccountCentered
        address={senderAddress}
        name={senderName}
        publicKey={publicKey}
        role=""
        validator={false}
      />
    </div>
  );
};

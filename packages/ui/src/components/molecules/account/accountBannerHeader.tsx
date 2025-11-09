import { CSSProperties } from 'react';
import { StatusBadge, Typography } from '../../atoms';
import { UserAccountCentered } from '../../atoms/account/useAccountCentered';
export interface AccountBannerHeaderProps {
  style?: CSSProperties;
  senderAddress?: string;
  senderName?: string;
  publicKey?: string;
  isMobile?: boolean;
}

export const AccountBannerHeader = ({
  style,
  senderAddress = '',
  publicKey,
  senderName,
  isMobile,
}: AccountBannerHeaderProps) => {
  return (
    <div className="flex gap-1 desktop:gap-2  justify-between items-center " style={style}>
      <UserAccountCentered
        address={senderAddress}
        name={senderName}
        publicKey={publicKey}
        role=""
        validator={false}
        isMobile={isMobile}
      />
    </div>
  );
};

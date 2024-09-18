import { BannerFrame } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import Link from 'next/link';
import { UserBannerText } from '../../molecules/user/userBannerText';
import { UserBannerHeader } from '../../molecules/user/userBannerHeader';

interface UserBannerProps {
  senderAddress: string;
  senderName?: string;
  status: string;
  incomingTransactions: string | number;
  outgoingTransactions: string | number;
  coinRate?: number;
  value?: string | number;
  valueSymbol?: string;
  rank: number | string;
  image: string;
}

export const UserBanner = ({
  senderAddress,
  senderName,
  status,
  incomingTransactions,
  outgoingTransactions,
  coinRate,
  value,
  valueSymbol,
  rank,
  image,

  ...props
}: UserBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid direction="col" gap="0" justify="between">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Link href="/validators">
            <Icon
              className="hover:-translate-x-0.5 cursor-pointer transition-transform"
              color="white"
              icon="ArrowLeft"
            />
          </Link>
          <UserBannerHeader senderAddress={senderAddress} senderName={senderName} status={status} />
        </FlexGrid>
        <UserBannerText
          coinRate={coinRate}
          incomingTransactions={incomingTransactions}
          outgoingTransactions={outgoingTransactions}
          rank={rank}
          value={value}
          valueSymbol={valueSymbol}
        />
      </FlexGrid>
    </BannerFrame>
  );
};

import { BannerFrame } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import Link from 'next/link';
import { UserBannerText } from '../../molecules/user/userBannerText';
import { UserBannerHeader } from '../../molecules/user/userBannerHeader';
import { UserBannerProps } from '../../../types/types';
import { UserBannerButtons } from '../../molecules/user/userBannerButton';

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
  isFavorite,
  setFavorite,
  removeFavorite,

  ...props
}: UserBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid direction="col" gap="0" justify="between">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Link href="/users">
            <Icon
              className="hover:-translate-x-0.5 cursor-pointer transition-transform"
              color="white"
              icon="ArrowLeft"
            />
          </Link>
          <UserBannerHeader senderAddress={senderAddress} senderName={senderName} status={status} />
          <UserBannerButtons
            className="desktop:hidden"
            isFavorite={isFavorite}
            removeFavorite={removeFavorite}
            setFavorite={setFavorite}
            validatorAddress={senderAddress || ''}
          />
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
      <UserBannerButtons
        className="absolute top-8 right-32 hidden desktop:flex"
        isFavorite={isFavorite}
        removeFavorite={removeFavorite}
        setFavorite={setFavorite}
        validatorAddress={senderAddress || ''}

      />
    </BannerFrame>
  );
};

import { BannerFrame } from '../../atoms';
import {
  ValidatorBannerText,
  ValidatorBannerTextProps,
  ValidatorBannerButtons,
} from '../../molecules';
import {
  ValidatorBannerHeader,
  ValidatorBannerHeaderProps,
} from '../../molecules/validator/validatorBannerHeader';
import {
  ValidatorBannerCard,
  ValidatorBannerCardProps,
} from '../../molecules/validator/validatorBannerCard';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import { Link } from '../../atoms';

interface ValidatorBannerProps extends ValidatorBannerTextProps, ValidatorBannerHeaderProps {
  image: string;
  senderName?: string;
  blockTime?: number;
  basePath: string;
  isFavorite: boolean;
  removeFavorite: () => void;
  setFavorite: () => void;
}

export const ValidatorBanner = ({
  senderAddress,
  senderName,
  image,
  stakes,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  status,
  notificationValue,
  blockTime,
  basePath,
  isFavorite,
  removeFavorite,
  setFavorite,
  ...props
}: ValidatorBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid direction="col" gap="0" justify="between">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Link basePath={basePath} href="/validators">
            <Icon
              className="hover:-translate-x-0.5 cursor-pointer transition-transform"
              color="white"
              icon="ArrowLeft"
            />
          </Link>
          <ValidatorBannerHeader
            notificationValue={notificationValue}
            senderAddress={senderAddress}
            senderName={senderName}
            status={status}
          />
        </FlexGrid>
        <ValidatorBannerText
          capacity={capacity}
          selfStake={selfStake}
          selfStakeSymbol={selfStakeSymbol}
          senderName={senderName}
          stakes={stakes}
          value={value}
          valueSymbol={valueSymbol}
          {...props}
        />
      </FlexGrid>
      <ValidatorBannerCard
        blockTime={blockTime || 0}
        isFavorite={isFavorite}
        removeFavorite={removeFavorite}
        setFavorite={setFavorite}
      />
      <ValidatorBannerButtons
        className="desktop:hidden absolute top-6 right-6"
        isFavorite={isFavorite}
        removeFavorite={removeFavorite}
        setFavorite={setFavorite}
      />
    </BannerFrame>
  );
};

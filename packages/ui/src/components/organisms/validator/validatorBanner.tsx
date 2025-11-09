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
  publicKey?: string;
  nextAllocatedTime?: number;
  basePath?: string;
  isFavorite: boolean;
  loading?: boolean;
  isMobile?: boolean;
  removeFavorite: () => void;
  setFavorite: () => void;
  onBack: () => void;
}

export const ValidatorBanner = ({
  senderAddress,
  senderName,
  publicKey,
  image,
  stakes,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  status,
  notificationValue,
  nextAllocatedTime,
  basePath,
  isFavorite,
  loading,
  isMobile,
  removeFavorite,
  setFavorite,
  onBack,
  ...props
}: ValidatorBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid
        direction="col"
        gap="0"
        justify="between"
        style={{ width: '100%', maxWidth: '100%' }}
      >
        <FlexGrid
          alignItems="center"
          className={'desktop:gap-4'}
          style={{ width: '100%', maxWidth: '100%' }}
          gap="1"
          justify="start"
          mobileDirection="row"
        >
          <Icon
            onClick={onBack}
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />
          <ValidatorBannerHeader
            style={{ overflow: 'hidden' }}
            notificationValue={notificationValue}
            senderAddress={senderAddress}
            publicKey={publicKey}
            senderName={senderName}
            status={status}
            loading={loading}
            isMobile={isMobile}
          />
          <ValidatorBannerButtons
            className="desktop:hidden ml-auto"
            isFavorite={isFavorite}
            removeFavorite={removeFavorite}
            setFavorite={setFavorite}
          />
        </FlexGrid>
        <div className="hidden desktop:block">
          <ValidatorBannerText
            capacity={capacity}
            selfStake={selfStake}
            selfStakeSymbol={selfStakeSymbol}
            senderName={senderName}
            stakes={stakes}
            value={value}
            valueSymbol={valueSymbol}
            loading={loading}
            {...props}
          />
        </div>
      </FlexGrid>
      <ValidatorBannerCard
        isFavorite={isFavorite}
        nextAllocatedTime={nextAllocatedTime}
        removeFavorite={removeFavorite}
        setFavorite={setFavorite}
      />
    </BannerFrame>
  );
};

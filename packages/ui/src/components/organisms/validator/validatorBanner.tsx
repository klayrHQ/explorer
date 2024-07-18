import { BannerFrame } from '../../atoms';
import {
  ValidatorBannerText,
  ValidatorBannerTextProps,
} from '../../molecules/validator/validatorBannerText';
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

interface ValidatorBannerProps extends ValidatorBannerTextProps, ValidatorBannerHeaderProps {
  image: string;
  senderName?: string;
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
  online,
  notificationValue,
  imageUrl,
  name,

  ...props
}: ValidatorBannerProps) => {
  return (
    <BannerFrame image={image}>
      <FlexGrid direction="col" justify="between">
        <FlexGrid alignItems="center" gap="4" justify="start">
          <Icon
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />

          <ValidatorBannerHeader
            imageUrl={imageUrl}
            name={name}
            notificationValue={notificationValue}
            online={online}
            senderAddress={senderAddress}
            senderName={senderName}
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
      <ValidatorBannerCard blockTime={100} />
    </BannerFrame>
  );
};

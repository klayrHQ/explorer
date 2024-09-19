import { BannerFrame } from '../../atoms';
import {
  ValidatorBannerText,
  ValidatorBannerTextProps,
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
import { Link } from 'web/src/components/link';

interface ValidatorBannerProps extends ValidatorBannerTextProps, ValidatorBannerHeaderProps {
  image: string;
  senderName?: string;
  blockTime?: number;
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

  ...props
}: ValidatorBannerProps) => {
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
      <ValidatorBannerCard blockTime={blockTime || 0} />
    </BannerFrame>
  );
};

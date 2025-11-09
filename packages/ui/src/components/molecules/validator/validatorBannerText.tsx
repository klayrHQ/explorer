import { SkeletonComponent, Typography } from '../../atoms';
import { Currency } from '../../atoms/base/currency';
import { BadgeNoIcon } from '../../atoms';

export interface ValidatorBannerTextProps {
  senderName?: string | null;
  stakes?: number | string;
  value?: string | number;
  valueSymbol?: string;
  selfStake?: string | number;
  selfStakeSymbol?: string;
  capacity?: number | string;
  loading?: boolean;
}

export const ValidatorBannerText = ({
  senderName,
  stakes = 0,
  value,
  valueSymbol,
  selfStake,
  selfStakeSymbol,
  capacity,
  loading,
}: ValidatorBannerTextProps) => {
  const getStakeWord = (stake: number) => {
    return stake > 1 || stake === 0 ? 'stakes' : 'stake';
  };

  const capacityValue = capacity ? (Number.isNaN(Number(capacity)) ? 0 : Number(capacity)) : 0;

  return loading ? (
    <div className="flex flex-wrap items-center gap-1.5 mt-5 desktop:mt-5">
      <SkeletonComponent width={'80'} height={'5'} />
    </div>
  ) : (
    <div className="flex flex-wrap items-center gap-1.5 mt-5 desktop:mt-4">
      <Typography className="capitalize" color="onBackgroundMedium" variant="paragraph-md">
        {senderName}
      </Typography>
      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'has a total of'}
      </Typography>

      <Typography fontWeight="semibold" variant="paragraph-md">
        {Number(stakes)} {getStakeWord(Number(stakes))}
      </Typography>

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'with a value of'}
      </Typography>

      <Currency amount={value ?? 0} decimals={2} fontWeight="semibold" symbol={valueSymbol} />

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {' and self stake of'}
      </Typography>

      <Currency
        amount={selfStake ?? 0}
        decimals={0}
        fontWeight="semibold"
        symbol={selfStakeSymbol}
      />

      <Typography color="onBackgroundMedium" variant="paragraph-md">
        {'and capacity of'}
      </Typography>

      {capacityValue && Number(capacityValue) > 100 ? (
        <BadgeNoIcon
          backgroundColor="redOpacity"
          borderColor="error"
          label={`${capacityValue}%`}
          padding="1.5"
          typographyVariant="caption"
        />
      ) : (
        <BadgeNoIcon
          backgroundColor="greenOpacity"
          borderColor="success"
          label={`${capacityValue}%`}
          padding="1.5"
          typographyVariant="caption"
        />
      )}
    </div>
  );
};

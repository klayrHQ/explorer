'use client';
import { ValidatorBannerButtons } from './validatorBannerButtons';
import { Typography } from '../../atoms';

export interface ValidatorBannerCardProps {
  blockTime: number;
  isFavorite: boolean;
  removeFavorite: () => void;
  setFavorite: () => void;
}

export const ValidatorBannerCard = ({
  blockTime,
  isFavorite,
  removeFavorite,
  setFavorite,
}: ValidatorBannerCardProps) => {
  return (
    <div className="hidden desktop:flex gap-4">
      <div className="hidden desktop:flex">
        <ValidatorBannerButtons
          isFavorite={isFavorite}
          removeFavorite={removeFavorite}
          setFavorite={setFavorite}
        />
      </div>

      {/* BLOCK */}
      <div className="border border-onBackground rounded-xl w-max  hidden desktop:block desktop:w-auto">
        <div className="p-6 flex flex-1 items-start flex-col gap-6 w-max">
          <Typography color="onBackground" fontWeight="semibold" variant="paragraph-md">
            {'Next block in'}
          </Typography>
          <Typography color="onBackground" fontWeight="bold" variant="h3">
            {blockTime} {'min'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

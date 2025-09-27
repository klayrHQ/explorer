'use client';
import { ValidatorBannerButtons } from './validatorBannerButtons';
import { Typography } from '../../atoms';
import { fromNowFormatter } from '../../../utils/functions';

export interface ValidatorBannerCardProps {
  nextAllocatedTime?: number;
  isFavorite: boolean;
  removeFavorite: () => void;
  setFavorite: () => void;
}

export const ValidatorBannerCard = ({
  nextAllocatedTime,
  isFavorite,
  removeFavorite,
  setFavorite,
}: ValidatorBannerCardProps) => {
  const now = Date.now();
  const blockPrefix = nextAllocatedTime && now > nextAllocatedTime * 1000 ? 'Last' : 'Next';

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
            {`${blockPrefix} block`}
          </Typography>
          <Typography color="onBackground" fontWeight="bold" variant="h3">
            {nextAllocatedTime ? fromNowFormatter(nextAllocatedTime * 1000) : '-'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

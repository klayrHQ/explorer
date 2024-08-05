'use client';
import { ValidatorBannerButtons } from './validatorBannerButtons';
import { Typography } from '../../atoms';

export interface ValidatorBannerCardProps {
  blockTime: number;
}

export const ValidatorBannerCard = ({ blockTime }: ValidatorBannerCardProps) => {
  return (
    <div className="hidden desktop:flex gap-4">
      <div className="hidden desktop:flex">
        <ValidatorBannerButtons />
      </div>

      {/* BLOCK */}
      <div className="border border-onBackground rounded-xl z-20  w-transitionBannerContainerWidthMobile hidden desktop:block desktop:w-auto">
        <div className="p-6 flex flex-1 items-start flex-col gap-6 ">
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

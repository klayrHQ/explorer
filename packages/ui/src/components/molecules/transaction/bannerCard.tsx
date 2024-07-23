import { Typography } from '../../atoms';
import { trimSix } from '../../../utils/functions';
import Link from 'next/link';

interface BannerCardProps {
  blockHeight: number;
  blockId: string;
}

export const BannerCard = ({ blockHeight, blockId, }: BannerCardProps) => {
  return (
    <div className="border border-onBackground rounded-xl z-20  w-transitionBannerContainerWidthMobile desktop:w-auto">
      <div className="p-6 flex items-start flex-col">
        <Typography
          className="text-right"
          color="white"
          fontWeight="semibold"
          variant="paragraph-md"
        >
          Block height
        </Typography>
        <div className="flex flex-col justify-center items-start">
          <Link href={`/blocks/${blockId}`}>
            <Typography className="text-right" color="white" fontWeight="bold" variant="h3">
              #{blockHeight}
            </Typography>
          </Link>
          <Typography className="text-right" color="onBackgroundMedium" variant="caption">
            {trimSix(blockId)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

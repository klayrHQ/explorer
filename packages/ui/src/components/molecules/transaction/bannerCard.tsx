import { Typography } from '../../atoms';
import { trimSix } from '../../../utils/functions';
import { Link } from '../../atoms';

interface BannerCardProps {
  blockHeight: number;
  blockId: string;
  basePath?: string;
}

export const BannerCard = ({ blockHeight, blockId, basePath }: BannerCardProps) => {
  return (
    <div className="border border-onBackground rounded-xl max-w-transitionBannerContainerWidthMobile hidden desktop:flex desktop:w-auto">
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
          <Link basePath={basePath} href={`/blocks/${blockId}`}>
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

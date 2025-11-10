/* eslint-disable react/jsx-no-literals */
import { SkeletonComponent, Typography } from '../../atoms';
import { trimSix } from '../../../utils/functions';
import { Link } from '../../atoms';

interface BannerCardProps {
  blockHeight: number;
  blockId: string;
  basePath?: string;
  loading?: boolean;
}

export const BannerCard = ({ blockHeight, blockId, basePath, loading }: BannerCardProps) => {
  return (
    <div className="border border-onBackground rounded-xl hidden desktop:flex">
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
            {loading ? (
              <SkeletonComponent width={'32'} height={'6'} className={'my-2'} />
            ) : (
              <Typography className="text-right" color="white" fontWeight="bold" variant="h3">
                #{blockHeight}
              </Typography>
            )}
          </Link>
          {loading ? (
            <SkeletonComponent width={'24'} height={'4'} className={'my-1'} />
          ) : (
            <Typography className="text-right" color="onBackgroundMedium" variant="caption">
              {trimSix(blockId)}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

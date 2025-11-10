import {
  BannerFrame,
  Currency,
  ImageContainer,
  SkeletonComponent,
  StatusBadge,
  Typography,
} from '../../atoms';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import Link from 'next/link';
import { ChainType } from '../../../types/types.ts';

interface ChainDetailsBannerProps {
  image: string;
  chain: ChainType | undefined;
  locked: number;
  status?: string;
  logo: string;
  loading?: boolean;
  onBack: () => void;
}

export const ChainDetailsBanner = ({
  chain,
  image,
  logo,
  locked,
  status,
  loading,
  onBack,
}: ChainDetailsBannerProps) => {
  return (
    <BannerFrame image={image}>
      <div className="items-start justify-start flex flex-col gap-4">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Icon
            onClick={onBack}
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />
          {loading ? (
            <div className="flex items-center gap-2">
              <SkeletonComponent width={'32'} height={'6'} className={'my-2'} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ImageContainer
                alt={chain?.displayName ?? chain?.chainName ?? ''}
                src={logo}
                variant="avatarLg"
              />
              <Typography fontWeight="bold" variant={'h3'}>
                {chain?.displayName ?? chain?.chainName}
              </Typography>
            </div>
          )}
        </FlexGrid>
        {loading ? (
          <div className="hidden desktop:flex items-center gap-1.5">
            <SkeletonComponent width={'80'} height={'5'} />
          </div>
        ) : (
          <div className="hidden desktop:flex items-center gap-1.5">
            <Typography color="onBackgroundMedium" variant="paragraph-md">
              {'a total of '}
            </Typography>
            <Currency amount={locked} decimals={3} fontWeight="semibold" symbol={'KLY'} />
            <Typography color="onBackgroundMedium" variant="paragraph-md">
              {'is locked and the chain status is'}
            </Typography>
            <StatusBadge status={chain?.status ?? 'inactive'} />
          </div>
        )}
      </div>
    </BannerFrame>
  );
};

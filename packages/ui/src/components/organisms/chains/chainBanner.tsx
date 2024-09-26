import { BannerFrame, Currency, ImageContainer, StatusBadge, Typography } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { Icon } from '../../atoms';
import Link from 'next/link';

interface ChainDetailsBannerProps {
  image: string;
  chainName: string;
  locked: number;
  status?: string;
  logo: string;
}

export const ChainDetailsBanner = ({
  chainName,
  image,
  logo,
  locked,
  status,
}: ChainDetailsBannerProps) => {
  return (
    <BannerFrame image={image}>
      <div className="items-start justify-start flex flex-col gap-4">
        <FlexGrid alignItems="center" gap="4" justify="start" mobileDirection="row">
          <Link href="/chains">
            <Icon
              className="hover:-translate-x-0.5 cursor-pointer transition-transform"
              color="white"
              icon="ArrowLeft"
            />
          </Link>
          <div className="flex items-center gap-2">
            <ImageContainer alt={chainName} src={logo} variant="avatarLg" />
            <Typography fontWeight="bold" variant={'h3'}>
              {chainName}
            </Typography>
          </div>
        </FlexGrid>
        <div className="flex items-center gap-1.5">
          <Typography color="onBackgroundMedium" variant="paragraph-md">
            {'a total of '}
          </Typography>
          <Currency amount={21302000000000} decimals={0} fontWeight="semibold" symbol={'KLY'} />
          <Typography color="onBackgroundMedium" variant="paragraph-md">
            {'is locked and the chain status is'}
          </Typography>
          <StatusBadge status={'active'} />
        </div>
      </div>
    </BannerFrame>
  );
};

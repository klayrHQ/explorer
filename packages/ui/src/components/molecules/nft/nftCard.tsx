import { StatusBadge } from '../../atoms';
import { Typography } from '../../atoms/base/typography';
import { Currency } from '../../atoms/base/currency';
import { ImageContainer } from '../../atoms/images/imageContainer';
type NftCardGridProps = {
  image: string;
  title: string;
  collection: string;
  chain?: string;
  chainImage?: string;
  price?: string;
};

export const NftCard = ({
  image,
  title,
  collection,
  price,
  chain,
  chainImage,
}: NftCardGridProps) => {
  return (
    <div className="flex flex-col  overflow-hidden">
      <div className="hidden desktop:block aspect-square ">
        <img
          alt={title}
          className=" object-cover w-full h-full aspect-square rounded-2xl"
          src={image}
        />
      </div>
      <div className="desktop:hidden aspect-video">
        <img
          alt={title}
          className=" object-cover w-full aspect-video h-full rounded-2xl"
          src={image}
        />
      </div>

      <div className="mt-3">
        <Typography color="onBackgroundLow" fontWeight="semibold" variant="paragraph-sm">
          {collection}
        </Typography>
      </div>

      <div className="flex justify-between items-center mt-0.5">
        <Typography color="volt" fontWeight="bold" variant="h6">
          {title}
        </Typography>
        <StatusBadge status="owned" />
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1">
          <ImageContainer
            alt="Chain logo"
            className="rounded-full"
            src={chainImage || ''}
            variant="chainLogo"
          />
          <Typography color="onBackgroundMedium" fontWeight="semibold" variant="footer">
            {chain || ''}
          </Typography>
        </div>
        <Currency
          amount={price ?? ''}
          color="onBackground"
          decimals={2}
          fontWeight="semibold"
          sign={'$'}
          variant="paragraph-lg"
        />
      </div>
    </div>
  );
};

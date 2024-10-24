import { Typography, ImageContainer } from '@repo/ui/atoms';

interface TokenCardProps {
  name: string;
  symbol: string;
  image: string;
  chainImage: string;
}

export const TokenCard = ({ name, symbol, image, chainImage }: TokenCardProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center justify-center relative">
        <ImageContainer
          alt={name}
          className="ml-2 mt-0.5 border-1 border-backgroundTertiary"
          src={image}
          variant={'avatarLg'}
        />
        <img
          alt={name}
          className="absolute top-0 left-0 w-5 h-5 rounded-full border-1 border-black"
          height={16}
          src={chainImage}
          width={16}
        />
      </div>
      <div className="flex flex-col justify-center gap-0.5">
        <Typography color={'onBackgroundMedium'} fontWeight={'semibold'} variant={'paragraph-sm'}>
          {name}
        </Typography>
        <Typography color={'onBackgroundLow'}>{symbol}</Typography>
      </div>
    </div>
  );
};

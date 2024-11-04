import { FlexGrid, ImageContainer, Link } from '..';
import { Typography } from '..';
import { FontWeight, TypographyVariant } from '../../../types/types.ts';
import {cls} from "../../../utils/functions.ts";

export interface ImageNameProps {
  imageUrl: string;
  name: string;
  className?: string;
  color?: string;
  fontWeight?: FontWeight;
  typographyVariant?: TypographyVariant;
  href?: string;
  basePath?: string;
}

export const ImageName = ({
  imageUrl,
  name,
  className,
  color,
  fontWeight,
  typographyVariant,
  href,
  basePath,
}: ImageNameProps) => {
  const innerComponent = () => {
    return (
      <FlexGrid alignItems={'center'} className={cls([className, href && 'cursor-pointer'])} gap={'2'} mobileDirection={'row'}>
        <ImageContainer alt={name} src={imageUrl} variant="avatar" imgClassName={'object-cover'} />
        <Typography
          color={color ?? 'onBackgroundMedium'}
          fontWeight={fontWeight ?? 'semibold'}
          variant={typographyVariant}
        >
          {name}
        </Typography>
      </FlexGrid>
    );
  };

  return href ? (
    <Link basePath={basePath} href={href}>
      {innerComponent()}
    </Link>
  ) : (
    innerComponent()
  );
};

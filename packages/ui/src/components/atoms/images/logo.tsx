import { FlexGrid } from '../base/flexGrid.tsx';
import { Typography } from '../base/typography.tsx';
import { Link } from 'web/src/components/link.tsx';

export interface LogoProps {
  logoSrc: string;
  logoFullSrc?: string;
  altText: string;
  logoText?: string;
  minimized?: boolean;
  className?: string;
}

export const Logo = ({
  logoSrc = '',
  logoFullSrc,
  altText = 'logo',
  minimized,
  className,
}: LogoProps) => {
  return (
    <Link href="/">
      <FlexGrid className={className}>
        {!minimized && logoFullSrc ? (
          <img alt={altText} className={' mt-md mb-lxl'} src={logoFullSrc} />
        ) : (
          <img
            alt={altText}
            className={'h-logoImgHeight w-logoImgWidth mt-md mb-lxl'}
            src={logoSrc}
          />
        )}
      </FlexGrid>
    </Link>
  );
};

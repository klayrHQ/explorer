import { FlexGrid } from '../base/flexGrid.tsx';
import { Link } from '../navigation/link.tsx';

export interface LogoProps {
  logoSrc: string;
  logoFullSrc?: string;
  altText: string;
  logoText?: string;
  minimized?: boolean;
  className?: string;
  basePath?: string;
}

export const Logo = ({
  logoSrc = '',
  logoFullSrc,
  altText = 'logo',
  minimized,
  className,
  basePath,
}: LogoProps) => {
  return (
    <Link basePath={basePath} href="/">
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

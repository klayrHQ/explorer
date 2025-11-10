'use client';
import { cva } from 'class-variance-authority';
import { cloneElement, CSSProperties, ReactElement, useEffect, useState } from 'react';
import { cls } from '../../../utils/functions.ts';
import Placeholder from '../../../assets/images/placeholder.png';

interface ImageContainerProps {
  src: string;
  alt: string;
  variant?: 'avatar' | 'avatarLg' | 'chainLogo';
  className?: string;
  imgClassName?: string;
  component?: ReactElement;
  style?: CSSProperties;
}

const imageContainerStyles = cva(['overflow-hidden'], {
  variants: {
    variant: {
      avatar: 'w-avatarWidth h-avatarHeight rounded-full',
      avatarLg: 'w-avatarLgWidth h-avatarLgHeight rounded-full',
      chainLogo: 'w-chainLogoWidth h-chainLogoHeight',
    },
  },
  defaultVariants: {
    variant: 'avatar',
  },
});

export const ImageContainer = ({
  variant,
  src,
  alt,
  className,
  imgClassName,
  component,
  style,
}: ImageContainerProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => setImgSrc(Placeholder.src);
  useEffect(() => setImgSrc(src), [src]);

  return (
    <div
      className={imageContainerStyles({
        variant,
        className,
      })}
      style={style}
    >
      {component ? (
        cloneElement(component, {
          src: imgSrc,
          alt,
          className: cls(['w-full h-full', imgClassName]),
          onError: handleError,
        })
      ) : (
        <img
          alt={alt}
          src={imgSrc}
          className={cls(['w-full h-full', imgClassName])}
          onError={handleError}
        />
      )}
    </div>
  );
};

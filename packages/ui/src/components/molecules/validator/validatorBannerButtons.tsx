'use client';
import { IconButton } from '../../atoms';

type UserBannerButtonProps = {
  className?: string;
  basePath?: string;
  isFavorite: boolean;
  setFavorite: () => void;
  removeFavorite: () => void;
};

export const ValidatorBannerButtons = ({
  className,
  basePath,
  isFavorite,
  setFavorite,
  removeFavorite,
}: UserBannerButtonProps) => {
  return (
    <div className={`flex ${className}`}>
      <IconButton
        icon={isFavorite ? 'HeartFull' : 'Heart'}
        onClick={isFavorite ? removeFavorite : setFavorite}
      />
    </div>
  );
};

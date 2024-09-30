'use client';
import { FlexGrid, Icon, Typography } from '../../atoms';
import { Popover } from '../../atoms';
import { IconButton } from '../../atoms';
import { useState } from 'react';
import { Link } from '../../atoms';

type UserBannerButtonProps = {
  validatorAddress: string;
  className?: string;
  basePath?: string;
  isFavorite: boolean;
  setFavorite: () => void;
  removeFavorite: () => void;
};

export const AccountBannerButtons = ({
  validatorAddress,
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

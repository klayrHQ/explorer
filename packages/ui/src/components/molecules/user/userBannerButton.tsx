'use client';

import { FlexGrid, Icon, Typography } from '../../atoms';
import { Popover } from '../../atoms/utilities/popover';
import { IconButton } from '../../atoms';
import { useState } from 'react';
import Link from 'next/link';

type UserBannerButtonProps = {
  validatorAddress: string;
  className?: string;
  isFavorite: boolean;
  setFavorite: () => void;
  removeFavorite: () => void;
};

export const UserBannerButtons = ({
  validatorAddress,
  className,
  isFavorite,
  setFavorite,
  removeFavorite,
}: UserBannerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex ${className}`}>
      {/* POPPER */}
      <Popover
        button={
          <IconButton
            className="flex items-center justify-center"
            icon="DotsVertical"
            onClick={() => setIsOpen(!isOpen)}
            variant="semiTransparent"
          />
        }
        isOpen={isOpen}
        placement={'bottom-end'}
        setIsOpen={setIsOpen}
      >
        {/* POPPER CHILDREN */}
        <FlexGrid className="w-full" direction="col" gap="0">
          {/* VIEW AS USER */}
          <Link className="w-full" href={`/validators/${validatorAddress}`}>
            <FlexGrid
              alignItems="center"
              className="cursor-pointer hover:bg-gray-6 hover:rounded-t-md transition-all py-2.5 px-4 w-full"
              direction="row"
              gap="2"
              justify="start"
              mobileDirection="row"
            >
              <Icon color="onBackgroundLow" icon="User" size="xs" />
              <Typography color="onBackgroundMedium" fontWeight="semibold" variant="paragraph-md">
                View as validator
              </Typography>
            </FlexGrid>
          </Link>

      
            {/* FAVORITE TRUE */}
            {isFavorite ? (
              <FlexGrid
                alignItems="center"
                className="cursor-pointer hover:rounded-b-md hover:bg-gray-6 transition-all py-2.5 px-4 w-full"
                direction="row"
                gap="2"
                justify="center"
                mobileDirection="row"
                onClick={removeFavorite}
              >
                <Icon color="onBackgroundLow" icon="Trash" size="inherit" />
                <Typography color="onBackgroundMedium" fontWeight="semibold" variant="paragraph-md">
                  Remove from favorites
                </Typography>
              </FlexGrid>
            ) : (
              //  FAVORITE FALSE
              <FlexGrid
                alignItems="center"
                className="cursor-pointer hover:rounded-b-md hover:bg-gray-6 transition-all py-2.5 px-4 w-full"
                direction="row"
                gap="2"
                justify="center"
                mobileDirection="row"
                onClick={setFavorite}
              >
                <Icon color="onBackgroundLow" icon="Plus" size="inherit" />
                <Typography color="onBackgroundMedium" fontWeight="semibold" variant="paragraph-md">
                  Add to favorites
                </Typography>
              </FlexGrid>
            )}
      
        </FlexGrid>
      </Popover>
    </div>
  );
};

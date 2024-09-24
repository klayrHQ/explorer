'use client';

import { FlexGrid, Icon, Typography } from '../../atoms';
import { Popover } from '../../atoms/utilities/popover';
import { IconButton } from '../../atoms';
import { useState } from 'react';

export const ValidatorBannerButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="flex">
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
        <FlexGrid className="" direction="col" gap="0">
          {/* VIEW AS USER */}
          <FlexGrid
            alignItems="center"
            className="w-full cursor-pointer hover:bg-gray-6 hover:rounded-t-md transition-all py-2.5 px-4"
            direction="row"
            gap="2"
            justify="start"
          >
            <Icon color="onBackgroundLow" icon="User" size="xs" />
            <Typography color="onBackgroundMedium" fontWeight="semibold" variant="paragraph-md">
              View as user
            </Typography>
          </FlexGrid>

          {/* ADD TO FAVORITES */}
          <FlexGrid
            alignItems="center"
            className="cursor-pointer hover:rounded-b-md hover:bg-gray-6 transition-all py-2.5 px-4"
            direction="row"
            gap="2"
            justify="center"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {/* FAVORITE TRUE */}
            {isFavorite ? (
              <>
                <Icon color="onBackgroundLow" icon="Trash" size="inherit" />
                <Typography color="onBackgroundMedium" fontWeight="semibold" variant="paragraph-md">
                  Remove from favorites
                </Typography>
              </>
            ) : (
              //  FAVORITE FALSE
              <>
                <Icon color="onBackgroundLow" icon="Plus" size="inherit" />
                <Typography color="onBackgroundMedium" fontWeight="semibold" variant="paragraph-md">
                  Add to favorites
                </Typography>
              </>
            )}
          </FlexGrid>
        </FlexGrid>
      </Popover>

      {/* BUTTON STAKE NOW
      <Button label="Stake now" variant="primary" className="hidden desktop:flex" />
      <Button label="Stake" variant="primary" className="flex items-center desktop:hidden" /> */}
    </div>
  );
};

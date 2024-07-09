"use client";

import { Button, FlexGrid, Icon, Typography } from "../../atoms";
import { Popover } from "../../atoms/utilities/popover";
import { IconButton } from "../../atoms";
import { useState } from "react";

export const ValidatorBannerButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="flex gap-2 ">
      {/* POPPER */}
      <Popover
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        placement={"bottom-end"}
        button={
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            icon="DotsVertical"
            variant="semiTransparent"
            className="flex items-center justify-center"
          />
        }
      >
        {/* POPPER CHILDREN */}
        <FlexGrid direction="column" gap="0" className="">
          {/* VIEW AS USER */}
          <FlexGrid
            direction="row"
            gap="2"
            alignItems="center"
            justify="start"
            className="w-full cursor-pointer hover:bg-gray-6 hover:rounded-t-md transition-all py-2.5 px-4"
          >
            <Icon icon="User" size="xs" color="onBackgroundLow" />
            <Typography
              fontWeight="semibold"
              variant="paragraph-md"
              color="onBackgroundMedium"
            >
              View as user
            </Typography>
          </FlexGrid>

          {/* ADD TO FAVORITES */}
          <FlexGrid
            direction="row"
            gap="2"
            alignItems="center"
            justify="center"
            className="cursor-pointer hover:rounded-b-md hover:bg-gray-6 transition-all py-2.5 px-4"
            onClick={() => setIsFavorite(!isFavorite)}
          >

            {/* FAVORITE TRUE */}
            {isFavorite ? (
              <>
                <Icon icon="Trash" size="inherit" color="onBackgroundLow" />
                <Typography
                  fontWeight="semibold"
                  variant="paragraph-md"
                  color="onBackgroundMedium"
                >
                  Remove from favorites
                </Typography>
              </>
            ) : (
                
                //  FAVORITE FALSE
              <>
                <Icon icon="Plus" size="inherit" color="onBackgroundLow" />
                <Typography
                  fontWeight="semibold"
                  variant="paragraph-md"
                  color="onBackgroundMedium"
                >
                  Add to favorites
                </Typography>
              </>
            )}
          </FlexGrid>
        </FlexGrid>
      </Popover>

        {/* BUTTON STAKE NOW */}
      <Button label="Stake now" variant="primary" className="hidden desktop:flex" />
      <Button label="Stake" variant="primary" className="flex desktop:hidden" />
    </div>
  );
};

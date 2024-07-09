"use client";

import { Button, FlexGrid, Icon, Typography } from "../../atoms";
import { Popover } from "../../atoms/utilities/popover";
import { IconButton } from "../../atoms";
import { useState } from "react";

export interface ValidatorBannerCardProps {
  blockTime: number;
}

export const ValidatorBannerCard = ({
  blockTime,
}: ValidatorBannerCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="flex gap-4">
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
        <Button label="Stake now" variant="primary" />
      </div>

      {/* BLOCK */}
      <div className="border border-onBackground rounded-xl z-20  w-transitionBannerContainerWidthMobile desktop:w-auto">
        <div className="p-6 flex flex-1 items-start flex-col gap-6 ">
          <Typography
            color="onBackground"
            fontWeight="semibold"
            variant="paragraph-md"
          >
            Next block in
          </Typography>
          <Typography color="onBackground" fontWeight="bold" variant="h3">
            #{blockTime}
          </Typography>
        </div>
      </div>
    </div>
  );
};

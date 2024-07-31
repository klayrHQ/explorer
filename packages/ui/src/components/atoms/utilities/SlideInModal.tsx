import React from 'react';
import { Modal as BaseModal } from '@mui/base';
import { IconButton } from '../input/iconButton';
import { Typography } from '../base/typography';
import { FlexGrid } from '../base/flexGrid';
import { Backdrop } from '../input/modal/modalBackdrop';
import {Slide} from "@mui/material";

interface SlideInModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SlideInModal = ({ open, onClose, title, children }: SlideInModalProps) => {
  return (
    <>
      <BaseModal onClose={onClose} open={open} slots={{ backdrop: Backdrop }}>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <div
            className={`overflow-y-auto fixed top-0 right-0 h-full w-full desktop:w-1/3 bg-backgroundSecondary shadow-lg`}
          >
            <FlexGrid
              alignItems="center"
              className="pt-8 pb-4 desktop:pb-6 px-6"
              justify="between"
              mobileDirection="row"
            >
              {title && (
                <Typography fontWeight="bold" variant="h4">
                  {title}
                </Typography>
              )}
              <IconButton
                align="none"
                className="w-3 h-3"
                icon="CrossClose"
                onClick={onClose}
                variant="transparent"
              />
            </FlexGrid>
            <div className="px-6 my-6">{children}</div>
          </div>
        </Slide>
      </BaseModal>
    </>
  );
};

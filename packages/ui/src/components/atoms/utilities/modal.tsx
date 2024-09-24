import React, { useState } from 'react';

import { Modal as MuiModal } from '@mui/material';
import { FlexGrid } from '../base/flexGrid.tsx';
import { Typography } from '../base/typography.tsx';
import { IconButton } from '../input/iconButton.tsx';
import { Button } from '../input/button.tsx';
import { Backdrop } from '../input/modal/modalBackdrop.tsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <MuiModal
      className="fixed inset-0 flex items-center justify-between p-4"
      onClose={onClose}
      open={open}
      slots={{ backdrop: Backdrop }}
    >
      <div
        className={` bg-backgroundSecondary text-white rounded-lg shadow-lg  outline-none relative w-modalWidthMobile desktop:w-modalWidth`}
      >
        <FlexGrid
          alignItems="center"
          className="pt-8 pb-4 desktop:pb-6 px-6"
          component="div"
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
    </MuiModal>
  );
};

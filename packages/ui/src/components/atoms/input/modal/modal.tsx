import React, { useState } from 'react';
import { Modal as BaseModal } from '@mui/base';
import { Button } from '../button';
import { IconButton } from '../iconButton';
import { Typography } from '../../base/typography';
import { Backdrop } from './modalBackdrop';
import { FlexGrid } from '../../base/flexGrid';
import { Modal } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
}

export const CustomModal = ({ open, onClose, onSave, title, children }: ModalProps) => {
  return (
    <Modal
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
        <FlexGrid alignItems="center" className="pb-6 px-6 desktop:mt-8 " gap="1" justify="end">
          <Button
            align="none"
            className="hidden desktop:flex text-gray-5 hover:text-gray-1"
            label="Cancel"
            onClick={onClose}
            variant="transparent"
          />
          <Button align="none" className="w-full desktop:w-auto" label="Save" onClick={onSave} />
        </FlexGrid>
      </div>
    </Modal>
  );
};

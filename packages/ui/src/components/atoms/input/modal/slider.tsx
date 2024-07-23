import React from 'react';
import { Modal as BaseModal } from '@mui/base';
import { Button } from '../button';
import { IconButton } from '../iconButton';
import { Typography } from '../../base/typography';
import { FlexGrid } from '../../base/flexGrid';
import { Backdrop } from './modalBackdrop';

interface SliderProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
}

export const Slider = ({ open, onClose, onSave, title, children }: SliderProps) => {
  return (
    <>
      <BaseModal onClose={onClose} open={open} slots={{ backdrop: Backdrop }}>
        <div
          className={`fixed top-0 right-0 h-full w-1/3 transform transition-all duration-300 ease-out ${
            open ? 'translate-x-0 ' : 'translate-x-full'
          } bg-backgroundSecondary shadow-lg`}
        >
          <FlexGrid alignItems="center" className="pt-8 pb-4 desktop:pb-6 px-6" justify="between">
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
      </BaseModal>
    </>
  );
};

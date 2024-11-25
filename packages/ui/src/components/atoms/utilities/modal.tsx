import { Modal as MuiModal } from '@mui/material';
import { FlexGrid } from '../base/flexGrid.tsx';
import { Typography } from '../base/typography.tsx';
import { IconButton } from '../input/iconButton.tsx';
import { Backdrop } from '../input/modal/modalBackdrop.tsx';
import { cls } from '../../../utils/functions.ts';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  children: ReactNode;
  width?: string;
}

export const Modal = ({ open, onClose, title, subTitle, children, width }: ModalProps) => {
  return (
    <MuiModal
      className="fixed inset-0 flex items-center justify-between p-4"
      onClose={onClose}
      open={open}
      slots={{ backdrop: Backdrop }}
    >
      <div
        className={cls([
          'bg-backgroundSecondary text-white rounded-lg shadow-lg outline-none relative max-h-screen',
          width ? `w-${width} max-w-80p` : 'w-modalWidthMobile desktop:w-modalWidth',
        ])}
      >
        <FlexGrid
          className="pt-8 pb-4 desktop:pb-6 px-6"
          component="div"
          justify="between"
          mobileDirection="row"
        >
          <FlexGrid direction={'col'} gap={'md'}>
            <Typography fontWeight="bold" variant="h4">
              {title}
            </Typography>
            {subTitle && <Typography variant="paragraph-sm">{subTitle}</Typography>}
          </FlexGrid>
          <IconButton
            align="none"
            className="w-3 h-3"
            icon="CrossClose"
            onClick={onClose}
            variant="transparent"
          />
        </FlexGrid>
        <div className="px-6 my-3">{children}</div>
      </div>
    </MuiModal>
  );
};

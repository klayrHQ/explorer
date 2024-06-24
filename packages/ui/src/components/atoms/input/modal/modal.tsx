import React, {useState} from "react";
import { Modal as BaseModal } from "@mui/base";
import { Button } from "../button";
import { IconButton } from "../iconButton";
import { Typography } from "../../base/typography";
import { Backdrop } from "./modalBackdrop";
import { FlexGrid } from "../../base/flexGrid";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;

}

export const Modal = ({
  open,
  onClose,
  onSave,
  title,
  children,
}: ModalProps) => {
  
  return (
    <BaseModal
      className="fixed inset-0 flex items-center justify-between p-4"
      onClose={onClose}
      open={open}
      slots={{ backdrop: Backdrop, }}
    >
      <div
        className={` bg-backgroundSecondary text-white rounded-lg shadow-lg  outline-none relative w-modalWidthMobile desktop:w-modalWidth`}
      >
        <FlexGrid alignItems="center" className="py-8 px-6" component='div' justify="between">
          {title && (
            <Typography fontWeight="bold" variant="h4">
              {title}
            </Typography>
          )}
          <IconButton
            align="none"
            className="w-2 h-2"
            icon="CrossClose"
            onClick={onClose}
            variant="transparent"
          />
        </FlexGrid>
        <div className="px-6 my-6">{children}</div>
        <FlexGrid alignItems="center" className="pb-6 px-6" gap="1" justify="end">
          <Button
            align="none"
            label="Cancel"
            onClick={onClose}
            variant="transparent"
          />
          <Button
            align="none"
            label="Save"
            onClick={onSave}
          />
        </FlexGrid>
      </div>
    </BaseModal>
  );
};

import React from 'react';
import { Button as MuiButton } from '@mui/base';
import {Typography} from "../base/typography";
import {cva} from "class-variance-authority";

interface MenuItemProps {
    label: string | React.ReactNode
}

const menuItemStyles = cva(
  ["rounded-md flex h-buttonHeight"],
  {
    variants: {
      
    },
    compoundVariants:[
      
    ],
  },
);

export const Button = ({
	label,
}: MenuItemProps) => {

  return (
    <MuiButton>
      <Typography
        className={"inline-flex items-center gap-2 leading-none"}
        fontWeight={"semibold"}
      >
        {label}
      </Typography>
    </MuiButton>
  );
};

import React from 'react';
import { Button as MuiButton } from '@mui/base'
import {cls} from "../../utils/functions";

interface ButtonProps {
  variant?: "primary" | "secondary" | "transparent";
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  variant = "primary",
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {

  return (
    <MuiButton
      className={cls([
        'rounded',
        variant === "primary" ? "bg-volt text-eerie" : variant === "secondary" ? "bg-azule text-white" : "",
        size === "small" ? "py-1 px-2" : size === "medium" ? "p-2" : "p-3",
      ])}
      type="button"
      {...props}
    >
      {label}
    </MuiButton>
  );
};

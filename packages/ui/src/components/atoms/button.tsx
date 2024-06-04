import React from 'react';
import { Button as MuiButton } from '@mui/base';
import {Typography} from "./typography";
import {cva} from "class-variance-authority";

interface ButtonProps {
  variant?: "primary" | "secondary" | "transparent";
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  label: string;
  onClick?: () => void;
}

const buttonStyles = cva(
  ["rounded-md"],
  {
    variants: {
      variant: {
        primary: "bg-volt text-eerie",
        secondary: "bg-azule text-white",
      },
      size: {
        small: "py-md px-lg",
        medium: "py-xl px-2xl",
        large: "py-2xl px-3xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto mx-auto",
      },
    },
  },
);

export const Button = ({
  variant = "primary",
  className,
  size = 'medium',
  fullWidth,
  label,
  onClick,
}: ButtonProps) => {

  return (
    <MuiButton
      className={buttonStyles({
        variant,
        size,
        fullWidth,
        className: className,
      })}
      onClick={onClick}
      type="button"
    >
      <Typography variant={size === "small" ? "paragraph-sm" : "body"}>{label}</Typography>
    </MuiButton>
  );
};

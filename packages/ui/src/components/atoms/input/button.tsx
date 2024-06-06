import React from 'react';
import { Button as MuiButton } from '@mui/base';
import {Typography} from "../base/typography";
import {cva} from "class-variance-authority";

interface ButtonProps {
  variant?: "primary" | "secondary" | "transparent";
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  label: string;
  onClick?: () => void;
  align?: "left" | "center" | "right" | "none";
  hovered?: boolean;
  disabled?: boolean;
}

const buttonStyles = cva(
  ["rounded-md block"],
  {
    variants: {
      variant: {
        primary: "text-gray-8",
        secondary: "hover:bg-azuleDark text-white",
      },
      size: {
        small: "py-md px-lg",
        medium: "py-xl px-2xl",
        large: "py-2xl px-3xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
        undefined: "w-auto",
      },
      align: {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
        none: "",
        undefined: "mx-auto",
      },
    },
    compoundVariants:[
      //hovered
      {
        hovered: true,
        variant: "primary",
        disabled: false,
        className: "bg-voltDark",
      },
      {
        hovered: false,
        variant: "primary",
        disabled: false,
        className: "bg-volt hover:bg-voltDark",
      },
      {
        hovered: true,
        variant: "secondary",
        disabled: false,
        className: "bg-azuleDark",
      },
      {
        hovered: false,
        variant: "secondary",
        disabled: false,
        className: "bg-azule hover:bg-azuleDark",
      },
      //disabled
      {
        disabled: true,
        variant: "primary",
        className: "grayscale-6 bg-volt cursor-not-allowed",
      },
      {
        disabled: true,
        variant: "secondary",
        className: "grayscale-6 bg-azule cursor-not-allowed",
      },
    ],
  },
);

export const Button = ({
  variant = "primary",
  className,
  size = 'medium',
  fullWidth,
  label,
  onClick,
  align,
  hovered = false,
  disabled = false,
}: ButtonProps) => {

  return (
    <MuiButton
      className={buttonStyles({
        variant,
        size,
        fullWidth,
        align,
        hovered,
        disabled,
        className: className,
      })}
      onClick={onClick}
      type="button"
    >
      <Typography fontWeight={"semibold"} variant={size === "small" ? "paragraph-sm" : "body"}>{label}</Typography>
    </MuiButton>
  );
};

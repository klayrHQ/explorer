import React from 'react';
import { Button as MuiButton } from '@mui/base';
import {Typography} from "../base/typography";
import {cva} from "class-variance-authority";

interface ButtonProps {
  variant?: "primary" | "secondary" | "transparent";
  className?: string;
  fullWidth?: boolean;
  label: string | React.ReactNode;
  onClick?: () => void;
  align?: "left" | "center" | "right" | "none";
  hovered?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

const buttonStyles = cva(
  ["rounded-md flex items-center justify-center h-buttonHeight"],
  {
    variants: {
      variant: {
        primary: "text-gray-8",
        secondary: "text-gray-1",
        transparent: "text-gray-1",
      },
      iconOnly: {
        true: "p-xl w-iconButtonWidth",
        false: "py-xl px-2xl",
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
      {
        hovered: true,
        variant: "transparent",
        disabled: false,
        className: "bg-gray-7",
      },
      {
        hovered: false,
        variant: "transparent",
        disabled: false,
        className: "transparent hover:bg-gray-7",
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
      {
        disabled: true,
        variant: "transparent",
        className: "grayscale-6 cursor-not-allowed",
      },
    ],
  },
);

export const Button = ({
  variant = "primary",
  className,
  fullWidth,
  label,
  onClick,
  align,
  hovered = false,
  disabled = false,
  iconOnly = false,
}: ButtonProps) => {

  return (
    <MuiButton
      className={buttonStyles({
        variant,
        fullWidth,
        align,
        hovered,
        disabled,
        iconOnly,
        className: className,
      })}
      onClick={onClick}
      type="button"
    >
      <Typography
        className={"inline-flex items-center gap-2 leading-none"}
        fontWeight={"semibold"}
      >
        {label}
      </Typography>
    </MuiButton>
  );
};

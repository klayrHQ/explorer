import React from 'react';
import { Button as MuiButton } from '@mui/base';
import {cva} from "class-variance-authority";
import {Icon} from "../images/icon";
import {IconComponent} from "../../../types/types";

interface IconButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "semiTransparent" | "transparent" | "iconOnly"
  className?: string;
  icon: IconComponent;
  onClick?: () => void;
  align?: "left" | "center" | "right" | "none";
  hovered?: boolean;
  disabled?: boolean;
}

const iconButtonStyles = cva(
  ["rounded-md block"],
  {
    variants: {
      variant: {
        primary: "text-gray-8 p-xl w-iconButtonWidth h-buttonHeight",
        secondary: "text-gray-1 p-xl w-iconButtonWidth h-buttonHeight",
        tertiary: "text-gray-1 p-xl w-iconButtonWidth h-buttonHeight",
        semiTransparent: "text-gray-1 p-xl w-iconButtonWidth h-buttonHeight",
        transparent: "p-xl w-iconButtonWidth h-buttonHeight",
        iconOnly: "w-auto h-auto p-1",
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
        variant: "tertiary",
        disabled: false,
        className: "bg-gray-7",
      },
      {
        hovered: false,
        variant: "tertiary",
        disabled: false,
        className: "bg-gray-6 hover:bg-gray-7",
      },
      {
        hovered: true,
        variant: "semiTransparent",
        disabled: false,
        className: "bg-gray-6",
      },
      {
        hovered: false,
        variant: "semiTransparent",
        disabled: false,
        className: "bg-transparent hover:bg-gray-6",
      },
      {
        hovered: true,
        variant: "transparent",
        disabled: false,
        className: "text-gray-6",
      },
      {
        hovered: false,
        variant: "transparent",
        disabled: false,
        className: "text-gray-5 hover:text-gray-6",
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

export const IconButton = ({
  variant = "primary",
  className,
  icon,
  onClick,
  align,
  hovered = false,
  disabled = false,
}: IconButtonProps) => {

  return (
    <MuiButton
      className={iconButtonStyles({
        variant,
        align,
        hovered,
        disabled,
        className: className,
      })}
      onClick={onClick}
      type="button"
    >
      <Icon color={"inherit"} icon={icon} />
    </MuiButton>
  );
};

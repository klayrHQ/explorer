import React, {forwardRef, MouseEventHandler} from 'react';
import { Button as MuiButton } from '@mui/base';
import {cva} from "class-variance-authority";
import {Icon} from "../images/icon";
import {ColorType, IconComponent} from "../../../types/types";

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "semiTransparent" | "transparent" | "bordered" | "iconOnly" | "iconOnlyAlt"
  className?: string
  icon: IconComponent
  onClick?: MouseEventHandler<HTMLButtonElement>
  align?: "left" | "center" | "right" | "none"
  active?: boolean
  hovered?: boolean
  disabled?: boolean
  color?: ColorType
}

const iconButtonStyles = cva(
  ["rounded-md block"],
  {
    variants: {
      variant: {
        primary: "text-gray-8 w-iconButtonWidth h-buttonHeight",
        secondary: "text-gray-1 w-iconButtonWidth h-buttonHeight",
        tertiary: "text-gray-1 w-iconButtonWidth h-buttonHeight",
        quaternary: "text-gray-1 w-iconButtonWidth h-buttonHeight bg-backgroundTertiary",
        semiTransparent: "text-gray-1 w-iconButtonWidth h-buttonHeight",
        transparent: "w-iconButtonWidth h-buttonHeight",
        bordered: "border border-backgroundSecondary w-iconButtonWidth h-buttonHeight",
        iconOnly: "w-auto h-auto p-1",
        iconOnlyAlt: "w-auto h-auto p-1",
      },
      align: {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
        none: "",
        undefined: "mx-auto",
      },
      hovered: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
      active: {
        true: "",
        false: "",
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
      {
        hovered: true,
        variant: "bordered",
        disabled: false,
        className: "text-onBackgroundHigh bg-backgroundSecondary",
      },
      {
        hovered: false,
        variant: "bordered",
        disabled: false,
        className: "text-onBackgroundMedium hover:bg-backgroundSecondary hover:text-onBackgroundHigh",
      },
      {
        hovered: true,
        variant: "iconOnly",
        disabled: false,
        className: "text-gray-6",
      },
      {
        hovered: false,
        variant: "iconOnly",
        disabled: false,
        className: "text-gray-5 hover:text-gray-6",
      },
      //active
      {
        active: true,
        variant: "primary",
        disabled: false,
        className: "bg-voltDark",
      },
      {
        active: false,
        variant: "primary",
        disabled: false,
        className: "bg-volt hover:bg-voltDark",
      },
      {
        active: true,
        variant: "secondary",
        disabled: false,
        className: "bg-azuleDark",
      },
      {
        active: false,
        variant: "secondary",
        disabled: false,
        className: "bg-azule hover:bg-azuleDark",
      },
      {
        active: true,
        variant: "tertiary",
        disabled: false,
        className: "bg-gray-7",
      },
      {
        active: false,
        variant: "tertiary",
        disabled: false,
        className: "bg-gray-6 hover:bg-gray-7",
      },
      {
        active: true,
        variant: "semiTransparent",
        disabled: false,
        className: "bg-gray-6",
      },
      {
        active: false,
        variant: "semiTransparent",
        disabled: false,
        className: "bg-transparent hover:bg-gray-6",
      },
      {
        active: true,
        variant: "transparent",
        disabled: false,
        className: "text-gray-6",
      },
      {
        active: false,
        variant: "transparent",
        disabled: false,
        className: "text-gray-5 hover:text-gray-6",
      },
      {
        active: true,
        variant: "bordered",
        disabled: false,
        className: "text-onBackgroundHigh bg-backgroundSecondary",
      },
      {
        active: false,
        variant: "bordered",
        disabled: false,
        className: "text-onBackgroundMedium hover:bg-backgroundSecondary hover:text-onBackgroundHigh",
      },
      {
        active: true,
        variant: "iconOnly",
        disabled: false,
        className: "text-gray-6",
      },
      {
        active: false,
        variant: "iconOnly",
        disabled: false,
        className: "text-gray-5 hover:text-gray-6",
      },
      //disabled
      {
        disabled: true,
        variant: "primary",
        className: "grayscale-60p bg-volt cursor-not-allowed",
      },
      {
        disabled: true,
        variant: "secondary",
        className: "grayscale-60p bg-azule cursor-not-allowed",
      },
      {
        disabled: true,
        variant: "transparent",
        className: "grayscale-60p cursor-not-allowed",
      },
    ],
  },
);

export const IconButton = forwardRef((
  {
    variant = "primary",
    className,
    icon,
    onClick,
    align,
    hovered = false,
    disabled = false,
    active = false,
    color,
    ...props
  }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) => {

  return (
    <MuiButton
      {...props}
      className={iconButtonStyles({
        variant,
        align,
        hovered,
        disabled,
        active,
        className: className,
      })}
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <Icon className={"mx-auto"} color={color ?? "inherit"} icon={icon} size={"small"} />
    </MuiButton>
  );
});

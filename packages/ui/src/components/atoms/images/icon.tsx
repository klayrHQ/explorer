import React from 'react';
import {ColorType, IconComponent} from '../../../types/types';
import { icons } from '../../../assets/icons';
import {cva} from "class-variance-authority";
import {cls} from "../../../utils/functions";

interface ButtonProps {
  className?: string;
  //scales with font size, so inherit will adhere to the font size of the parent or a custom size can be set through the className prop
  size?: "xs" | "small" | "medium" | "large" | "inherit";
  icon: IconComponent;
  color?: ColorType;
  hoverColor?: ColorType;
}

const iconStyles = cva(
  [""],
  {
    variants: {
      size: {
        xs: "text-icon-xs",
        small: "text-icon-sm",
        medium: "text-icon-md",
        large: "text-icon-lg",
        inherit: "text-inherit",
      },
    },
  },
)

export const Icon = ({
  className = "",
  size = 'medium',
  color = 'gray-1',
  hoverColor,
  icon,
}: ButtonProps) => {
  // @ts-ignore
  const Component = icons[icon];

  return (
    <Component
      className={iconStyles({
        size,
        className: cls([
          color ? `text-${color}` : "",
          hoverColor ? `hover:text-${hoverColor}` : "",
          className,
        ]),
      })}
    />
  );
};

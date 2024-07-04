import React, {CSSProperties} from 'react';
import {ColorType, IconComponent} from '../../../types/types';
import { icons } from '../../../assets/icons';
import {cva} from "class-variance-authority";
import {cls} from "../../../utils/functions";

interface ButtonProps {
  className?: string;
  style?: CSSProperties
  //scales with font size, so inherit will adhere to the font size of the parent or a custom size can be set through the className prop
  size?: "3xs" | "2xs" | "xs" | "small" | "medium" | "large" | "inherit" | "custom";
  icon: IconComponent;
  color?: ColorType;
  hoverColor?: ColorType;
}

const iconStyles = cva(
  [""],
  {
    variants: {
      size: {
        "3xs": "text-footer",
        "2xs": "text-caption",
        xs: "text-icon-xs",
        small: "text-icon-sm",
        medium: "text-icon-md",
        large: "text-icon-lg",
        inherit: "text-inherit",
        custom: "",
      },
    },
  },
)

export const Icon = ({
  className = "",
  style,
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
      style={style}
    />
  );
};

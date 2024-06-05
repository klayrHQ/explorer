import React from 'react';
import {cva} from "class-variance-authority";
import {TypographyComponent, FontWeight, TypographyVariant} from "../../../types/types";

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  component?: TypographyComponent;
  align?: "left" | "right" | "center";
  link?: boolean;
  color?: string;
  className?: string;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
  fontWeight?: FontWeight;
}

const typographyStyles = cva(
  ["border-none"],
  {
    variants: {
      variant: {
        "display-1": "text-display-1",
        "display-2": "text-display-2",
        h1: "text-heading-1",
        h2: "text-heading-2",
        h3: "text-heading-3",
        h4: "text-heading-4",
        h5: "text-heading-5",
        h6: "text-heading-6",
        subheading: "text-subheading",
        body: "text-body",
        "paragraph-sm": "text-paragraph-sm",
        "paragraph-md": "text-paragraph-md",
        "paragraph-lg": "text-paragraph-lg",
        "paragraph-xl": "text-paragraph-xl",
        footer: "text-footer",
        caption: "text-caption",
        code: "text-body font-mono",
      },
      italic: {
        true: "italic",
      },
      bold: {
        true: "font-bold",
      },
      underline: {
        true: "underline",
      },
      align: {
        left: "text-left",
        right: "text-right",
        center: "text-center",
      },
      link: {
        true: "hover:underline cursor-pointer text-link",
      },
    },
  },
);

export const Typography = ({
  variant = "body1",
  component = "span",
  className,
  color,
  align,
  link,
  italic,
  bold,
  underline,
  fontWeight,
  children,
}: TypographyProps) => {
  const Component = component as any;

  return (
    <Component className={
      typographyStyles({
        variant,
        align,
        link,
        italic,
        bold,
        underline,
        className: [
          color ? `text-${color}` : "",
          className,
          fontWeight ? `font-${fontWeight}` : "",
        ],
      })
    }
    >
      {children}
    </Component>
  );
};

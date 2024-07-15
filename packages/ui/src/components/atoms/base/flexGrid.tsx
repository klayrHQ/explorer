import { cva } from "class-variance-authority";
import React, { ReactNode } from "react";
import { cls } from "../../../utils/functions.ts";

interface FlexGridProps extends React.HTMLAttributes<any> {
  component?:
    | "div"
    | "section"
    | "article"
    | "aside"
    | "header"
    | "footer"
    | "ul"
    | "main";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  mobileDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  wrap?: boolean;
  justify?: "normal" | "start" | "end" | "center" | "between" | "around";
  alignItems?: "start" | "end" | "center";
  gap?:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "1.5xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "4.5xl"
    | "5xl";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const flexGridStyles = cva(["flex"], {
  variants: {
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
    justify: {
      normal: "justify-normal",
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
    },
    alignItems: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      between: "items-between",
      around: "items-around",
    },
  },
  defaultVariants: {
    wrap: false,
    justify: "start",
    alignItems: "start",
  },
});

export const FlexGrid = ({
  component = "div",
  direction,
  mobileDirection,
  wrap,
  justify,
  alignItems,
  gap = "2",
  onClick,
  className,
  children,
  ...props
}: FlexGridProps) => {
  const Component = component;

  return (
    <Component
      {...props}
      className={flexGridStyles({
        wrap,
        justify,
        alignItems,
        className: cls([
          gap ? `gap-${gap}` : "",
          className,
          !mobileDirection ?
            // todo change back to {direction ?? "row"} and {mobileDirection} after fixing the issue
            `flex-column desktop:flex-${direction ? direction === "column" ? "col" : direction : "row"}`
            :
            `flex-${mobileDirection === "column" ? "col" : mobileDirection} desktop:flex-${direction ? direction === "column" ? "col" : direction : "row"}`,
        ]),
      })}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

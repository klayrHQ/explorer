import {cva} from "class-variance-authority";
import React, {ReactNode} from "react";
import {cls} from "../../../utils/functions.ts";

interface FlexGridProps {
  component?: "div" | "section" | "article" | "aside" | "header" | "footer" | "ul" | "main"
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
  wrap?: boolean
  justify?: "normal" | "start" | "end" | "center" | "between" | "around"
  alignItems?: "start" | "end" | "center"
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "xs" | "sm" | "md" | "lg" | "xl" | "1.5xl" | "2xl" | "3xl" | "4xl"
  className?: string
  children: ReactNode
}

const flexGridStyles = cva(
  ["flex"],
  {
    variants: {
      direction: {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse",
      },
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
      direction: "row",
      wrap: false,
      justify: "start",
      alignItems: "start",
    },
  },
)

export const FlexGrid = ({ component = "div", direction, wrap, justify, alignItems, gap = "2", className, children, }: FlexGridProps) => {
  const Component = component

  return (
    <Component
      className={flexGridStyles({
        direction,
        wrap,
        justify,
        alignItems,
        className: cls([
          gap ? `gap-${gap}` : "",
          className,
        ]),
      })}
    >
      {children}
    </Component>
  )
}
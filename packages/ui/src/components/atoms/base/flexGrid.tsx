import {cva} from "class-variance-authority";
import {ReactNode} from "react";
import {cls} from "../../../utils/functions.ts";

interface FlexGridProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
  wrap?: boolean
  justify?: "normal" | "start" | "end" | "center" | "between" | "around"
  alignItems?: "start" | "end" | "center"
  gap?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
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

export const FlexGrid = ({ direction, wrap, justify, alignItems, gap = "2", className, children, }: FlexGridProps) => {
  return (
    <div
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
    </div>
  )
}
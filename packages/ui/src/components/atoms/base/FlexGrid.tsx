import {cva} from "class-variance-authority";
import {ReactNode} from "react";

interface FlexGridProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  wrap?: boolean;
  justify?: "start" | "end" | "center" | "between" | "around";
  alignItems?: "start" | "end" | "center" | "between" | "around";
  className?: string;
  children: ReactNode;
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

export const FlexGrid = ({ direction, wrap, justify, alignItems, className, children, }: FlexGridProps) => {
  return (
    <div
      className={flexGridStyles({
        direction,
        wrap,
        justify,
        alignItems,
        className,
      })}
    >
      {children}
    </div>
  )
}
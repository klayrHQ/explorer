import {ReactNode} from "react";
import {cva} from "class-variance-authority";
import {cls} from "../../../utils/functions.ts";

interface GridProps {
  columns?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none" | "subgrid"
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none" | "subgrid"
  autoCols?: "auto" | "min" | "max" | "fr"
  autoRows?: "auto" | "min" | "max" | "fr"
  gap?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  desktopGap?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  desktopCols?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none" | "subgrid"
  desktopRows?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none" | "subgrid"
  className?: string
  children: ReactNode
}

const gridStyles = cva(
["grid"],
)

export const Grid = ({ columns, desktopCols, desktopRows, desktopGap, rows, autoCols, autoRows, gap = "2", className, children, }: GridProps) => {
  return (
    <div
      className={gridStyles({
        className: cls([
          columns ? `grid-cols-${columns}` : "grid-cols-1",
          rows ? `grid-rows-${rows}` : "grid-rows-1",
          autoCols ? `auto-cols-${autoCols}` : "",
          autoRows ? `auto-rows-${autoRows}` : "",
          gap ? `gap-${gap}` : "",
          desktopCols ? `desktop:grid-cols-${desktopCols}` : "",
          desktopRows ? `desktop:grid-rows-${desktopRows}` : "",
          desktopGap ? `desktop:gap-${desktopGap}` : "",
          className,
        ]),
      })}
    >
      {children}
    </div>
  )
}
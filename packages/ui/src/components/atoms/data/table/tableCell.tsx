import {HTMLAttributes, ReactNode} from "react";
import {cls} from "../../../../utils/functions.ts";

export interface TableCellProps extends Omit<HTMLAttributes<HTMLTableCellElement>, "content">{
  type?: "head" | "body" | "foot";
  children?: ReactNode;
  lastRow?: boolean;
}

export const TableCell = ({ type, children, className, lastRow, ...props }: TableCellProps) => {
  const Component = type === "head" ? "th" : "td";

  return (
    <Component
      className={cls([
        className,
        type === "head" ? "py-lg px-3xl border-t-0 h-thHeight" : "py-xl px-3xl border-t-1 border-t-borderLow h-trHeight",
        lastRow ? "border-b-0" : "border-b-1 border-borderLow",
      ])}
      {...props}
    >
      {children}
    </Component>
  );
}
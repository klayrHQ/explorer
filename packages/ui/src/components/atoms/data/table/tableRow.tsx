import {HTMLAttributes, ReactNode } from "react";
import {cls} from "../../../../utils/functions.ts";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>{
  children?: ReactNode;
}

export const TableRow = ({ children, className, ...props }: TableRowProps) => {

  return (
    <tr
      className={cls([
        className,
      ])}
      {...props}
    >
      {children}
    </tr>
  );
}
import {HTMLAttributes} from "react";
import {TableRow} from "../../atoms";
import {TableCellType} from "../../../types/types.ts";
import {TableCell} from "../../atoms";
import {cls} from "../../../utils/functions.ts";

export interface TableProps extends HTMLAttributes<HTMLTableElement>{
  keyPrefix: string;
  headCols?: TableCellType[]
  rows?: { cells: TableCellType[] }[]
  pagination?: boolean;
}

export const Table = ({ className, headCols, rows, keyPrefix, pagination, ...props }: TableProps) => {
  return (
    <div className={"w-full max-w-full overflow-auto"}>
      <table
        className={cls([
          className,
          "w-full max-w-full text-paragraph-sm",
        ])}
        {...props}
      >
        <thead>
        <TableRow className={"text-onBackgroundLow font-medium"}>
          {headCols?.map((col, index) => (
            <TableCell
              className={col.className}
              key={`${keyPrefix}-th-${index + 1}`}
              type={"head"}
            >
              {col.children}
            </TableCell>
          ))}
        </TableRow>
        </thead>
        <tbody>
        {rows?.map((row, rowIndex) => (
          <TableRow key={`${keyPrefix}-tr-${rowIndex + 1}`}>
            {row.cells.map((cell, cellIndex) => (
              <TableCell
                key={`${keyPrefix}-td-${rowIndex + 1}-${cellIndex + 1}`}
                lastRow={rowIndex === rows.length - 1}
                {...cell}
              >
                {cell.children}
              </TableCell>
            ))}
          </TableRow>
        ))}
        </tbody>
      </table>
    </div>
  );
}
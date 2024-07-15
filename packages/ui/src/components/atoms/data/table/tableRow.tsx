"use client"
import {HTMLAttributes, ReactNode, useState} from "react";
import {cls} from "../../../../utils/functions.ts";
import {IconButton} from "../../input/iconButton.tsx";
import {Popover} from "../../utilities/popover.tsx";
import {TableCell} from "./tableCell.tsx";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>{
  children?: ReactNode;
  rowDetails?: ReactNode;
  type?: "head" | "body";
}

export const TableRow = ({ children, className, rowDetails, type = "body", ...props }: TableRowProps) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  return (
    <tr
      className={cls([
        type === "body" && "group hover:bg-backgroundSecondary relative",
        openDetails ? "bg-backgroundSecondary" : "",
        className,
      ])}
      {...props}
    >
      {children}
      {
        rowDetails && (
          <TableCell className={"desktop:border-none desktop:absolute top-0 bottom-0 my-auto right-0"}>
            <Popover
              button={
                <IconButton
                  icon={"Eye"}
                  onClick={() => {
                    setOpenDetails(!openDetails);
                  }}
                  variant={"quaternary"}
                />
              }
              containerClassName={cls([
                "desktop:group-hover:flex items-center justify-center",
                openDetails ? "flex" : "desktop:hidden",
              ])}
              isOpen={openDetails}
              placement={"bottom-end"}
              setIsOpen={setOpenDetails}
            >
              {rowDetails}
            </Popover>
          </TableCell>
        )
      }
    </tr>
  );
}
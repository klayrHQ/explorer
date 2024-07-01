"use client"
import {Popper} from "@mui/base";
import {CSSProperties, ReactNode, useState} from "react";
import {Typography} from "./typography.tsx";
import {cls} from "../../../utils/functions.ts";

interface TooltipProps {
  placement: "top" | "bottom" | "left" | "right";
  text: string;
  children: ReactNode;
}

export const Tooltip = ({ placement, text, children, }: TooltipProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const arrowSize = 4;

  let positionStyles: CSSProperties =  {
    left: 0,
    right: 0,
    bottom: `-${arrowSize}px`,
  }

  switch (placement) {
    case "top":
      positionStyles = {
        left: 0,
        right: 0,
        bottom: `-${arrowSize}px`,
      }
      break;
    case "bottom":
      positionStyles = {
        left: 0,
        right: 0,
        top: `-${arrowSize}px`,
        transform: "rotate(180deg)",
      }
      break;
    case "left":
      positionStyles = {
        right: `-${arrowSize + 2}px`,
        top: 0,
        bottom: 0,
        transform: "rotate(270deg)",
      }
      break;
    case "right":
      positionStyles = {
        left: `-${arrowSize + 2}px`,
        top: 0,
        bottom: 0,
        transform: "rotate(90deg)",
      }
      break;
  }

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} ref={setAnchorEl}>
      {children}
      <Popper
        anchorEl={anchorEl}
        className={cls([
            placement === "top" && "pb-lg",
            placement === "bottom" && "pt-lg",
            placement === "left" && "pr-lg",
            placement === "right" && "pl-lg",
        ])}
        open={open}
        placement={placement}
      >
        <div className={"relative bg-background rounded-sm px-lg py-sm shadow-below shadow-shadow-gray-3 z-10 box-border"}>
          <Typography fontWeight={"semibold"} variant={"caption"}>{text}</Typography>
          <div
            className={"absolute m-auto"}
            style={{
              width: "0",
              height: "0",
              borderStyle: "solid",
              borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
              borderColor: "var(--color-background) transparent transparent transparent",
              ...positionStyles,
            }}
          />
        </div>
      </Popper>
    </div>
  )
}
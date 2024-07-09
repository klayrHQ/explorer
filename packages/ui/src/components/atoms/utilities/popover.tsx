"use client"
import {cloneElement, ReactElement, ReactNode, useState} from "react";
import {Button} from "../input/button.tsx";
import {ClickAwayListener, Popper, PopperProps} from "@mui/base";
import {cls} from "../../../utils/functions.ts";

interface PopoverProps extends Omit<PopperProps, "open"> {
  button?: ReactElement;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
  containerClassName?: string;
  className?: string;
}

export const Popover = ({
  button,
  isOpen,
  setIsOpen,
  children,
  containerClassName,
  className,
  popperOptions,
  ...props
}: PopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className={containerClassName}>
        {
          button ? (
            cloneElement(button, {
              active: isOpen,
              onClick: () => setIsOpen(!isOpen),
              ref: setAnchorEl,
            })
          ) : (
            <Button active={isOpen} label={"Open"} onClick={() => setIsOpen(!isOpen)} ref={setAnchorEl} />
          )
        }
          <Popper
            {...props}
            anchorEl={anchorEl}
            open={isOpen}
            popperOptions={popperOptions ?? {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 10],
                  },
                },
              ],
            }}
          >
            <div
              className={cls([
                "bg-background shadow-md border-solid border-1 border-borderLow rounded-md",
                className,
              ])}
            >
              {children}
            </div>
          </Popper>
      </div>
    </ClickAwayListener>
  )
}
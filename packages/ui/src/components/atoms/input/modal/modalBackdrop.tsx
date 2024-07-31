import React from "react";
import {Fade} from "@mui/material";
import {cls} from "../../../../utils/functions.ts";


// eslint-disable-next-line react/display-name
export  const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open: boolean; className?: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <Fade in={open}>
      <div
        className={cls([
          "fixed inset-0",
          className,
        ])}
        ref={ref}
        style={{ backgroundColor: "rgba(from var(--color-black) r g b / 0.8)" }}
        {...other}
      />
    </Fade>
  );
});
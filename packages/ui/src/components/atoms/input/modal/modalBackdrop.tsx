import React from "react";
import clsx from "clsx";


// eslint-disable-next-line react/display-name
export  const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open: boolean; className?: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black  transition-opacity",
        {
          "opacity-0": !open,
          "opacity-80p": open,
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});
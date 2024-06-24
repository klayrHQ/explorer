import * as React from "react";
import { SelectRootSlotProps } from "@mui/base";
import { Typography } from "../base/typography";
import { Icon } from "../images/icon";

interface ButtonProps<TValue extends string | {}, Multiple extends boolean> extends SelectRootSlotProps<TValue, Multiple> {
  value: TValue;
  options: { value: TValue; label: string; labelIcon?: string; labelImage?: string; labelCircle?: boolean }[];
}

export const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: ButtonProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, value, options, ...other } = props;
  const selectedOption = value ? options.find((option) => option.value === value) : null;
  return (
    <button
      type="button"
      {...other}
      className="flex items-center justify-between min-w-36 gap-2 px-4 py-2"
      ref={ref}
    >
      {selectedOption && (
        <div className="flex items-center">
          {selectedOption.labelIcon && <Icon className="mr-2" icon={selectedOption.labelIcon} size="inherit" />}
          {selectedOption.labelImage && <img alt="icon" className="mr-2 w-4 h-4" src={selectedOption.labelImage} />}
          {selectedOption.labelCircle && <div className="mr-2 w-4 h-4 bg-gray-4 rounded-full" />}
          <Typography variant="paragraph-sm">{selectedOption.label}</Typography>
        </div>
      )}
      <Icon
        color="gray-6"
        hoverColor="gray-3"
        icon="ChevronDown"
        size="small"
      />
    </button>
  );
});


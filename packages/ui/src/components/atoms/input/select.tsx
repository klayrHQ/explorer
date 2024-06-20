import * as React from "react";
import {
  Select as BaseSelect,
  Option as BaseOption,
  SelectRootSlotProps,
} from "@mui/base";
import { cva } from "class-variance-authority";
import { Typography } from "../base/typography";
import { Icon } from "../images/icon"; // Ensure you have the icon library installed
import { clsx } from "clsx";


const selectStyles = cva(
  "flex items-center justify-start border rounded-md border-gray-6 focus:outline-none hover:border-gray-5 bg-none text-gray-1 text-paragraph-sm",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed text-gray-1",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

// Custom Button Component for Select Root
const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button
      type="button"
      {...other}
      className="flex items-center justify-between min-w-36 gap-2 px-4 py-2"
      ref={ref}
    >
      {other.children}
      <Icon
        color="gray-6"
        hoverColor="gray-3"
        icon="ChevronDown"
        size="small"
      />
    </button>
  );
});

interface CustomSelectProps {
  disabled?: boolean;
  iconPosition?: "left" | "right" | "none";
  defaultValue?: string;
  options: { value: string; label: string, labelIcon?: string, }[];
}

// eslint-disable-next-line react/no-multi-comp
export const CustomSelect = ({
  options,
  defaultValue,
  disabled,
  iconPosition,
}: CustomSelectProps) => {
  const styles = selectStyles({ disabled,});

  return (
    <div className={styles}>
      <BaseSelect
        defaultValue={defaultValue}
        disabled={disabled}
        slotProps={{
          root: {
            className: "flex items-center justify-center",
          },
          listbox: {
            className:
              "mt-2 px-2 py-1 border border-gray-7 rounded-md shadow-lg",
          },
        }}
        slots={{
          root: Button,
        }}
      >
        {options.map((option) => (
          <BaseOption
            className={clsx(
              "cursor-pointer list-none p-2 mt-1 flex items-center justify-start w-full rounded-md min-w-36 transition duration-150 ease-in-out   ",
              {
                "hover:bg-voltDark hover:text-gray-7": !disabled,
                "focus:bg-gray-7 focus:text-white": !disabled,
                "focus:hover:bg-voltDark focus:hover:text-gray-7": !disabled,
              }
            )}
            key={option.value}
            value={option.value}
          >
            {option.labelIcon && (
              <Icon className="mr-2" icon={option.labelIcon} size="inherit" /> // Render the icon if it exists
            )}
            <Typography variant="paragraph-sm">{option.label}</Typography>
          </BaseOption>
        ))}
      </BaseSelect>
    </div>
  );
};
  
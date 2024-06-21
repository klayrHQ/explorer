import * as React from "react";
import { cva } from "class-variance-authority";
import { Typography } from "../base/typography";
import { Icon } from "../images/icon";
import { clsx } from "clsx";

interface Option {
    value: string;
    label: string;
    labelIcon?: string;
    labelImage?: string;
    labelCircleColor?: string;
  }

const selectStyles = cva(
  "justify-start border rounded-md border-gray-7 focus:outline-none hover:border-gray-5 bg-none text-gray-1 text-paragraph-sm bg-backgroundDark ",
  {
    variants: {
      width: {
        sm: "min-w-36",
        md: "min-w-40",
        lg: "min-w-64",
        xl: "min-w-selectXLWidth",
      },
    },
    defaultVariants: {
      width: "md",
    },
  },
);

export interface CustomSelectProps {
  placeholder?: string;
  defaultValue?: string;
  width?: "sm" | "md" | "lg" | "xl";
  options:  Option[];
}

export const CustomSelect = ({
  options,
  defaultValue,
  placeholder,
  width = "md",
}: CustomSelectProps) => {
  const styles = selectStyles({  width, });
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    defaultValue,
  );
  const [listboxVisible, setListboxVisible] = React.useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setListboxVisible(false);
  };

  const renderSelectedValue = (
    value: string | undefined,
    options: Option[],
  ) => {
    const selectedOption = value
      ? options.find((option) => option.value === value)
      : null;
    return selectedOption ? (
      <div className="flex items-center">
        {selectedOption.labelIcon && (
          <Icon
            className="mr-2 "
            hoverColor="gray-3"
            icon={selectedOption.labelIcon}
            size="inherit"
          />
        )}
        {selectedOption.labelImage && (
          <img
            alt="icon"
            className="mr-2 w-4 h-4"
            src={selectedOption.labelImage}
          />
        )}
        {selectedOption.labelCircleColor && (
          <div
            className={clsx(
              "mr-2 w-2 h-2 rounded-full",
              `bg-${selectedOption.labelCircleColor}`,
            )}
          />
        )}
        <Typography fontWeight="semibold" variant="paragraph-sm">{selectedOption.label} </Typography>
      </div>
    ) : null;
  };

  return (
    <div className={styles}>
      <div className="relative">
        <button
          className={clsx(
            "flex items-center justify-between gap-2 px-4 py-2",
            selectStyles({ width, }),
          )}
          onClick={() => setListboxVisible(!listboxVisible)}
          type="button"
        >
          {renderSelectedValue(selectedValue, options) || (
            <span className="placeholder">{placeholder ?? " "}</span>
          )}
          <Icon
            color="gray-6"
            hoverColor="gray-3"
            icon="ChevronDown"
            size="small"
          />
        </button>
      </div>

      {listboxVisible && (
        <ul
          className={clsx(
            "absolute mt-2 border border-gray-7 rounded-md bg-gray-8 z-10", //bg-color?
            selectStyles({ width, }),
          )}
          role="listbox"
        >
          {options.map((option) => (
            <li
              className={clsx(
                "cursor-pointer list-none  px-4 py-2 flex items-center justify-start w-full rounded-md hover:bg-voltDark hover:text-gray-7 transition duration-150 ease-in-out",
                {
                  "bg-gray-7": selectedValue === option.value,
                },
              )}
              key={option.value}
              onClick={() => handleSelect(option.value)}
              value={option.value}
            >
              {option.labelIcon && (
                <Icon
                  className="mr-2 hover:text-gray-7"
                  icon={option.labelIcon}
                  size="inherit"
                />
              )}
              {option.labelImage && (
                <img
                  alt="icon"
                  className="mr-2 w-4 h-4"
                  src={option.labelImage}
                />
              )}
              {option.labelCircleColor && (
                <div
                  className={clsx(
                    "mr-2 w-2 h-2 rounded-full",
                    `bg-${option.labelCircleColor}`,
                  )}
                />
              )}
              <Typography variant="paragraph-sm">{option.label}</Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

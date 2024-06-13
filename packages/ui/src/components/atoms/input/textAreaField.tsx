import {HTMLProps} from "react";
import {cva} from "class-variance-authority";
import {cls} from "../../../utils/functions.ts";

interface InputFieldProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'label'> {
  variant?: "onBgPrimary" | "onBgSecondary"
  className?: string
}

const inputFieldStyles = cva(
  [
    "border-solid border rounded-md",
    "w-full",
    "pt-lxl pb-lg px-lg",
    "focus:ring-0 focus:outline-none",
    "resize-y",
    "bg-transparent",
  ],
  {
    variants: {
      variant: {
        onBgPrimary: "border-backgroundSecondary focus:border-gray-6 hover:border-gray-6",
        onBgSecondary: "border-backgroundTertiary focus:border-gray-5 hover:border-gray-5",
      },
    },
  },
);

export const TextAreaField = ({ variant = "onBgSecondary", className, ...props}: InputFieldProps) => {
  return (
    <textarea
      className={inputFieldStyles({
        variant,
        className,
      })}
      {...props}
    />
  );
}
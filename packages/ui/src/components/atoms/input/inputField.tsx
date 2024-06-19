import {HTMLProps} from "react";
import {cva} from "class-variance-authority";
import {IconComponent} from "../../../types/types.ts";
import {Icon} from "../images/icon.tsx";
import {cls} from "../../../utils/functions.ts";

interface InputFieldProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  variant?: "onBgPrimary" | "onBgSecondary"
  className?: string
  icon?: IconComponent
  error?: boolean
  success?: boolean
}

const inputFieldStyles = cva(
  [
    "border-solid border rounded-md",
    "h-inputHeight w-full",
    "pt-xl pb-lg",
    "focus:ring-0 focus:outline-none",
    "bg-transparent",
  ],
  {
    variants: {
      variant: {
        onBgPrimary: "border-backgroundSecondary focus:border-gray-6 hover:border-gray-6",
        onBgSecondary: "border-backgroundTertiary focus:border-gray-5 hover:border-gray-5",
      },
      error: {
        true: "border-error",
        false: "",
      },
      success: {
        true: "border-success",
        false: "",
      },
    },
    compoundVariants: [
      {
        error: true,
        variant: "onBgPrimary",
        className: "border-error",
      },
      {
        error: false,
        variant: "onBgPrimary",
        className: "border-backgroundSecondary focus:border-gray-6 hover:border-gray-6",
      },
      {
        error: true,
        variant: "onBgSecondary",
        className: "border-error",
      },
      {
        error: false,
        variant: "onBgSecondary",
        className: "border-backgroundTertiary focus:border-gray-5 hover:border-gray-5",
      },
      {
        success: true,
        variant: "onBgPrimary",
        className: "border-success",
      },
      {
        success: false,
        variant: "onBgPrimary",
        className: "border-backgroundSecondary focus:border-gray-6 hover:border-gray-6",
      },
      {
        success: true,
        variant: "onBgSecondary",
        className: "border-success",
      },
      {
        success: false,
        variant: "onBgSecondary",
        className: "border-backgroundTertiary focus:border-gray-5 hover:border-gray-5",
      },
    ],
  },
);

export const InputField = ({ type = "text", variant = "onBgSecondary", className, icon, error, success, ...props}: InputFieldProps) => {
  return (
    <div className={"relative z-1 w-full"}>
      {
        icon && (
          <Icon className={"absolute left-lg h-max top-0 bottom-0 my-auto -z-1"} color={"gray-5"} icon={icon} />
        )
      }
      <input
        className={inputFieldStyles({
          variant,
          error,
          success,
          className: cls([
            icon ? "pl-10 pr-lg" : "px-lg",
            className,
          ]),
        })}
        style={{}}
        type={type}
        {...props}
      />
    </div>
  )
}
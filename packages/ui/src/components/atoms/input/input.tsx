import {HTMLProps, ReactNode} from "react";
import {Label} from "./label.tsx";
import {FlexGrid} from "../base/flexGrid.tsx";
import {ColorType, IconComponent} from "../../../types/types.ts";
import {TextAreaField} from "./textAreaField.tsx";
import {InputField} from "./inputField.tsx";

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'label'>{
  variant?: "onBgPrimary" | "onBgSecondary"
  label?: string | ReactNode
  labelColor?: ColorType
  labelPosition?: "left" | "top" | "right"
  type?: "text" | "password" | "email" | "number" | "select" | "textarea" | "checkbox" | "radio"
  options?: string[],
  placeholder?: string,
  icon?: IconComponent,
}

export const Input = ({ variant = "onBgSecondary", label, labelColor, labelPosition = "left", type = "text", options, name, placeholder, icon, ...props }: InputProps) => {
  
  return (
    <FlexGrid
      alignItems={"center"}
      direction={labelPosition === "top" ? "column" : labelPosition === "right" ? "row-reverse" : "row"}
      gap={"4"}
      justify={type === "checkbox" ? "start" : "between"}
    >
      {
        label &&
        <Label color={labelColor} htmlFor={name} label={label} />
      }
      {
        type === "textarea" ? (
          <TextAreaField name={name} placeholder={placeholder} variant={variant} />
        ) : type === "checkbox" ? (
          <input name={name} type="checkbox" {...props} />
        ) : type === "radio" ? (
          <FlexGrid direction="column">
            {
              options?.map((option) => (
                <Label className={"flex flex-row-reverse gap-2"} key={`${name}-${option}`} label={option}>
                  <input name={name} type="radio" value={option} {...props} />
                </Label>
              ))
            }
          </FlexGrid>
        ) : type === "select" ? (
          <select name={name}>
            {
              options?.map((option) => (
                <option key={`${name}-${option}`} value={option}>{option}</option>
              ))
            }
          </select>
        ) : (
          <InputField icon={icon} name={name} placeholder={placeholder} type={type} variant={variant} {...props} />
        )
      }
    </FlexGrid>
  )
};
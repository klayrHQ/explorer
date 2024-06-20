import {HTMLProps, ReactNode} from "react";
import {Typography} from "../base/typography.tsx";
import {ColorType} from "../../../types/types.ts";
import {cls} from "../../../utils/functions.ts";

interface LabelProps extends Omit<HTMLProps<HTMLLabelElement>, 'label'> {
  label: string | ReactNode
  color?: ColorType
}

export const Label = ({ label, className, children, color, ...props }: LabelProps) => {
  return (
    <label
      className={cls([
        "flex gap-xl",
        className,
      ])}
      {...props}
    >
      <Typography className={"pt-xs"} color={color} fontWeight={"semibold"} variant={"paragraph-lg"}>{label}</Typography>
      {children}
    </label>
  )
}
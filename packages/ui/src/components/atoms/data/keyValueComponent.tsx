import {Typography} from "../base/typography.tsx";
import {ReactNode} from "react";
import {ColorType, TypographyVariant} from "../../../types/types.ts";

interface KeyValueProps {
  keyValue: string | ReactNode
  contentValue: string | ReactNode;
  color?: ColorType;
  size?: TypographyVariant
}

export const KeyValueComponent = ({ keyValue, contentValue, color = "gray-5", size = "paragraph-sm" }: KeyValueProps) => {
    return (
        <Typography className={"inline-flex items-center"} color={color} variant={size}>
            {keyValue}:&nbsp;{contentValue}
        </Typography>
    )
};
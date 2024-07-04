import {ColorType, TypographyVariant} from "../../../types/types";
import { Typography } from "../base/typography";
import { BadgeIcon } from "./badgeIcon";

type BadgeProps = {
  borderColor?: ColorType;
  colorVariant?: ColorType;
  typographyVariant?: TypographyVariant;
  backgroundColor?: ColorType | string;
  label: string;
  className?: string;
};


export const Badge = ({ colorVariant = "primary", typographyVariant = "paragraph-sm", className, label, borderColor='backgroundTertiary', backgroundColor='transparent', }: BadgeProps) => {
  return (
    <div className={`whitespace-nowrap capitalize inline-flex items-center gap-1.5 p-2 rounded-md bg-${backgroundColor} border border-${borderColor} h-badgeHeight ${className}`}>
      <BadgeIcon colorVariant={colorVariant} />
      <Typography variant={typographyVariant}>{label}</Typography>
    </div>
  );
};

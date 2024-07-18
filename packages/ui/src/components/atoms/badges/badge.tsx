import { ColorType, TypographyVariant } from "../../../types/types";
import { Typography } from "../base/typography";
import { BadgeIcon } from "./badgeIcon";

type BadgeProps = {
  borderColor?: ColorType;
  colorVariant?: ColorType;
  typographyVariant?: TypographyVariant;
  backgroundColor?: ColorType | string;
  label?: string;
  className?: string;
  padding?: string;
  variant?: TypographyVariant | undefined;
};


export const Badge = ({ colorVariant = "primary", variant, typographyVariant = "paragraph-sm", className, label, borderColor='backgroundTertiary', padding='2', backgroundColor='transparent', }: BadgeProps) => {
  return (
    <div className={`whitespace-nowrap capitalize inline-flex items-center gap-1.5 p-${padding} rounded-md bg-${backgroundColor} border border-${borderColor} h-badgeHeight ${className}`}>
      <BadgeIcon colorVariant={colorVariant} />
      <Typography variant={typographyVariant}>{label}</Typography>
    </div>
  );
};

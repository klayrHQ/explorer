import { ColorType, TypographyVariant } from "../../../types/types";
import { Typography } from "../base/typography";
import { BadgeIcon } from "./badgeIcon";

type BadgeProps = {
  borderColor?: ColorType;
  colorVariant?: ColorType;
  backgroundColor?: ColorType | string;
  label: string;
  className?: string;
  padding?: string;
  variant?: TypographyVariant | undefined;
};


export const Badge = ({ colorVariant, className, label, borderColor='backgroundTertiary', backgroundColor='transparent', padding='2', variant='paragraph-sm' }: BadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-1.5 p-${padding} rounded-md bg-${backgroundColor} border border-${borderColor} h-badgeHeight ${className}`}>
      <BadgeIcon colorVariant={colorVariant} />
      <Typography variant={variant}>{label}</Typography>
    </div>
  );
};

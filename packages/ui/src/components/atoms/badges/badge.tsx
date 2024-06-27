import { ColorType } from "../../../types/types";
import { Typography } from "../base/typography";
import { BadgeIcon } from "./badgeIcon";

type BadgeProps = {
  borderColor?: ColorType;
  colorVariant?: ColorType;
  backgroundColor?: ColorType | string;
  label: string;
  className?: string;
};


export const Badge = ({ colorVariant, className, label, borderColor='backgroundTertiary', backgroundColor='transparent', }: BadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-1.5 p-2 rounded-md bg-${backgroundColor} border border-${borderColor} h-badgeHeight ${className}`}>
      <BadgeIcon colorVariant={colorVariant} />
      <Typography variant="paragraph-sm">{label}</Typography>
    </div>
  );
};

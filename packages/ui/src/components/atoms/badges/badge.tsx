import { ColorType } from "../../../types/types";
import { Typography } from "../base/typography";
import { BadgeIcon } from "./badgeIcon";

type BadgeProps = {
  colorVariant?: ColorType;
  label: string;
};

export const Badge = ({ colorVariant, label, }: BadgeProps) => {
  return (
    <div className="flex items-center gap-1.5 p-2 rounded-md bg-transparent border border-gray-6 h-badgeHeight">
      <BadgeIcon colorVariant={colorVariant} />
      <Typography variant="paragraph-sm">{label}</Typography>
    </div>
  );
};

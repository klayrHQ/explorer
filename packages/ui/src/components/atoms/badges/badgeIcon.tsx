import { ColorType } from "../../../types/types";

interface BadgeIconProps {
    colorVariant?: ColorType;
    className?: string;
  }

export const BadgeIcon = ({ colorVariant, className,} : BadgeIconProps) => {
    return <div className={`w-2 h-2 rounded-full bg-${colorVariant}`}></div>;
  };


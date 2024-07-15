import { ColorType } from "../../../types/types";

interface BadgeIconProps {
    colorVariant?: ColorType;
    className?: string;
    width?: string;
    height?: string;
  }

export const BadgeIcon = ({ colorVariant, width='2', height='2', className,} : BadgeIconProps) => {
    return <div className={`w-${width} h-${height} rounded-full bg-${colorVariant}`}></div>;
  };


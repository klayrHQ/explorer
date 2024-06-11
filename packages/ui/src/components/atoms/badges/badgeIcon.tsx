import { ColorType } from "../../../types/types";

interface BadgeIconProps {
    colorVariant?: ColorType;
  }

export const BadgeIcon = ({ colorVariant, } : BadgeIconProps) => {
    return <div className={`w-2 h-2 rounded-full bg-${colorVariant}`}></div>;
  };


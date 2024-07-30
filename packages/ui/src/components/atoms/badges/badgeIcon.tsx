import { ColorType } from '../../../types/types';

interface BadgeIconProps {
  colorVariant?: ColorType;
  className?: string;
  width?: string;
  height?: string;
}

export const BadgeIcon = ({
  colorVariant,
  width = '1.5',
  height = '1.5',
  className,
}: BadgeIconProps) => {
  return <div className={`w-${width} h-${height} m-0.5 rounded-full bg-${colorVariant}`}></div>;
};

import { ColorType, TypographyVariant } from '../../../types/types';
import { Typography } from '../base/typography';
import { BadgeIcon } from './badgeIcon';

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

export const Badge = ({
  colorVariant = 'primary',
  variant = 'caption',
  typographyVariant = 'caption',
  className,
  label,
  borderColor = 'backgroundTertiary',
  padding = '2',
  backgroundColor = 'transparent',
}: BadgeProps) => {
  return (
    <div
      className={`whitespace-nowrap capitalize inline-flex items-center justify-center gap-1.5 p-${padding} rounded-sm bg-${backgroundColor} border border-${borderColor} min-h-6 max-h-6 ${className}`}
    >
      <BadgeIcon colorVariant={colorVariant} />
      <Typography variant={typographyVariant}>{label}</Typography>
    </div>
  );
};

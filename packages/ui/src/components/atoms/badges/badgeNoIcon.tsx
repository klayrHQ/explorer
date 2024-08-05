import { ColorType, TypographyVariant } from '../../../types/types';
import { Typography } from '../base/typography';

type BadgeProps = {
  borderColor?: ColorType;
  typographyVariant?: TypographyVariant;
  backgroundColor?: ColorType | string;
  label?: string;
  className?: string;
  padding?: string;
};

export const BadgeNoIcon = ({
  typographyVariant = 'caption',
  className,
  label,
  borderColor = 'backgroundTertiary',
  padding = '2',
  backgroundColor = 'transparent',
}: BadgeProps) => {
  return (
    <div
      className={`whitespace-nowrap capitalize inline-flex items-center justify-center px-${padding} rounded-sm bg-${backgroundColor} border border-${borderColor} min-h-6 max-h-6 ${className}`}
    >
      <Typography variant={typographyVariant}>{label}</Typography>
    </div>
  );
};

import { Badge } from './badge';
import { ColorType, TypographyVariant } from '../../../types/types';
import { cls } from '../../../utils/functions';

interface BadgeGroupProps {
  badges: { colorVariant?: ColorType; label: string }[];
  className?: string;
  typographyVariant?: TypographyVariant;
}

export const BadgeGroup = ({
  badges,
  className,
  typographyVariant = 'paragraph-sm',
}: BadgeGroupProps) => {
  return (
    <div className={cls(['flex gap-2 flex-wrap', className])}>
      {badges.slice(0, 3).map((badge) => (
        <Badge
          colorVariant={badge.colorVariant}
          key={badge.label}
          label={badge.label}
          typographyVariant={typographyVariant}
        />
      ))}
    </div>
  );
};

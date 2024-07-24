import { Typography } from '../../atoms';
import { Icon } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { LinkComponent } from '../../../types/types.ts';
import { Link } from '../../atoms';
import { cls } from '../../../utils/functions.ts';

interface SectionHeaderProps {
  title: string;
  titleSize?: 'lg' | 'sm';
  subTitle?: string;
  count?: number;
  className?: string;
  href?: string;
  linkComponent?: LinkComponent;
  fullWidth?: boolean;
}

export const SectionHeader = ({
  title,
  titleSize = 'lg',
  subTitle,
  count,
  className,
  href,
  linkComponent,
  fullWidth,
}: SectionHeaderProps) => {
  return (
    <FlexGrid className={cls([className, 'gap-6', fullWidth && 'w-full'])} direction={'col'}>
      {href ? (
        <Link component={linkComponent} href={href}>
          <FlexGrid className={'group'} gap="2" justify="center" mobileDirection="row">
            <Typography
              className=""
              color="gray-1"
              component={titleSize === 'lg' ? 'h1' : 'h2'}
              fontWeight="bold"
              variant={titleSize === 'lg' ? 'h4' : 'h6'}
            >
              {title}
            </Typography>
            <Icon
              className={cls([
                'group-hover:text-volt group-hover:translate-x-px group-hover:-translate-y-px transition-transform duration-300  ease-in-out',
                titleSize === 'lg' ? 'text-heading-4 mt-1.5' : 'text-heading-6 mt-1',
              ])}
              icon="ArrowUpRight"
              size={'custom'}
            />
          </FlexGrid>
        </Link>
      ) : (
        <FlexGrid gap="xl" mobileDirection="row">
          <Typography color="gray-1" component="h4" fontWeight="bold" variant="h4">
            {title}
          </Typography>
          {count && (
            <div
              className={
                'bg-secondary rounded-sm p-2 h-9 min-w-9 flex items-center justify-center '
              }
            >
              <Typography color="onSecondary" variant="paragraph-sm">
                {count}
              </Typography>
            </div>
          )}
        </FlexGrid>
      )}
      {subTitle && (
        <FlexGrid alignItems="center" gap="3">
          <Typography color="gray-5" component="p" variant="paragraph-md">
            {subTitle}
          </Typography>
        </FlexGrid>
      )}
    </FlexGrid>
  );
};

import { PerformanceCardGrid } from './performanceCardGrid';
import { PerformanceCardProps } from '../../molecules';
import { Typography } from '../../atoms';
import { FlexGrid } from '../../atoms';
import { CustomSelect, CustomSelectProps } from '../../atoms';
import { SectionHeader } from '../layout/sectionHeader.tsx';
import { LinkComponent } from '../../../types/types.ts';

interface PerformanceSectionProps {
  stats: PerformanceCardProps[];
  options: CustomSelectProps['options'];
  href?: string;
  linkComponent?: LinkComponent;
}

export const PerformanceSection = ({
  stats,
  options,
  href,
  linkComponent,
}: PerformanceSectionProps) => {
  return (
    <FlexGrid className={'w-full'} component="article" direction="col" gap="6">
      <div className="w-full flex items-center justify-between ">
        <SectionHeader
          className={'hidden desktop:flex'}
          href={href}
          linkComponent={linkComponent}
          title={'Performance'}
          titleSize={'sm'}
        />
        <SectionHeader
          className={'flex desktop:hidden'}
          href={href}
          linkComponent={linkComponent}
          title={'Performance'}
          titleSize={'sm'}
        />
        <FlexGrid alignItems="center" gap="3">
          <Typography
            className={'hidden desktop:inline'}
            color="gray-5"
            component="p"
            fontWeight="semibold"
            variant="paragraph-sm"
            // eslint-disable-next-line react/jsx-no-literals
          >
            Show stats vs
          </Typography>
          <CustomSelect
            backgroundColor="darkBlue"
            defaultValue="lastMonth"
            options={options}
            width="sm"
          />
        </FlexGrid>
      </div>

      <PerformanceCardGrid stats={stats} />
    </FlexGrid>
  );
};

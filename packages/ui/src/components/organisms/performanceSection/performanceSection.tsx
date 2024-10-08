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
  setStatsVS?: (value: string) => void;
  href?: string;
}

export const PerformanceSection = ({
  stats,
  options,
  setStatsVS,
  href,
}: PerformanceSectionProps) => {
  return (
    <FlexGrid className={'w-full'} component="article" direction="col" gap="6">
      <div className="w-full flex items-center justify-between ">
        <SectionHeader href={href} title={'Performance'} titleSize={'sm'} />
        {/*<FlexGrid alignItems="center" gap="3">
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
            classNameList="border-backgroundTertiary border-t-0"
            defaultValue="lastMonth"
            options={options}
            onChange={setStatsVS}
            width="sm"
          />
        </FlexGrid>*/}
      </div>

      <PerformanceCardGrid stats={stats} />
    </FlexGrid>
  );
};

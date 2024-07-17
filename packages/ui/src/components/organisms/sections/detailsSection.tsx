import { FlexGrid, Icon, Tooltip, Typography } from '../../atoms';
import { ReactNode } from 'react';
import { SectionHeader } from '../layout/sectionHeader.tsx';
import { cls } from '../../../utils/functions.ts';

interface DetailsSectionsProps {
  title: string;
  data: {
    label: {
      label: string;
      tooltip?: string;
    };
    value: ReactNode;
    mobileWidth?: 'full' | 'half';
  }[];
}

export const DetailsSection = ({ title, data }: DetailsSectionsProps) => {
  return (
    <FlexGrid className={'w-full'} component={'section'} direction={'col'} gap={'4.5xl'}>
      <SectionHeader title={title} titleSize={'sm'} />
      <FlexGrid
        className={'w-full grid grid-cols-2 desktop:flex'}
        direction={'col'}
        gap={'3xl'}
        justify={'between'}
        mobileDirection={'row'}
        wrap
      >
        {data.map(({ label, value, mobileWidth }, index) => (
          <FlexGrid
            className={cls(['w-full', mobileWidth === 'half' ? 'col-span-1' : 'col-span-2'])}
            direction={'row'}
            gap={'1.5xl'}
            justify={'between'}
            key={`details-section-${index + 1}`}
            mobileDirection={'col'}
          >
            <FlexGrid
              alignItems={'center'}
              className={'shrink-0 w-full desktop:w-detailsLabelWidth'}
              direction={'row'}
              mobileDirection={'row'}
            >
              <Typography
                className={'truncate max-w-full'}
                color={'onBackgroundLow'}
                fontWeight={'semibold'}
                variant={'paragraph-lg'}
              >
                {label.label}
              </Typography>
              {label.tooltip && (
                <Tooltip placement={'top'} text={label.tooltip}>
                  <Icon
                    color={'onBackgroundLow'}
                    icon={'Info'}
                    size={'small'}
                    style={{ fontSize: '19px' }}
                  />
                </Tooltip>
              )}
            </FlexGrid>
            <div className={'w-full'}>
              <Typography className={'truncate max-w-full inline-block'} variant={'paragraph-lg'}>
                {value}
              </Typography>
            </div>
          </FlexGrid>
        ))}
      </FlexGrid>
    </FlexGrid>
  );
};

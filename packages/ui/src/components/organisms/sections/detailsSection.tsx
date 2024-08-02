'use client';
import {
  Button,
  FlexGrid,
  Icon,
  IconButton,
  JsonViewer,
  Popover,
  SlideInModal,
  Tooltip,
  Typography,
} from '../../atoms';
import { ReactNode, useState } from 'react';
import { SectionHeader } from '../layout/sectionHeader.tsx';
import { cls, copyToClipboard } from '../../../utils/functions.ts';
import { DataType } from '../../../types/types.ts';

interface DetailsSectionsProps {
  title: string;
  data: {
    label: {
      label: string;
      tooltip?: string;
    };
    value: ReactNode;
    mobileWidth?: 'full' | 'half' | string;
  }[];
  json?: DataType;
}

export const DetailsSection = ({ title, data, json }: DetailsSectionsProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jsonOpen, setJsonOpen] = useState(false);

  return (
    <FlexGrid className={'w-full'} component={'section'} direction={'col'} gap={'4.5xl'}>
      <FlexGrid
        className={'w-full'}
        alignItems="center"
        justify={'between'}
        mobileDirection={'row'}
      >
        <SectionHeader title={title} titleSize={'sm'} titleSizeNotLink={'h5'} />
        {json && (
          <Popover
            button={
              <IconButton
                active={menuOpen}
                align={'none'}
                icon={'DotsVertical'}
                variant={'semiTransparent'}
              />
            }
            isOpen={menuOpen}
            placement={'bottom-end'}
            setIsOpen={setMenuOpen}
          >
            <Button
              label={
                <Typography
                  className={'inline-flex items-center gap-sm'}
                  color={'onBackgroundMedium'}
                >
                  <Icon color={'onBackgroundLow'} icon={'CodeSquare'} size={'xs'} />
                  {'View as .json'}
                </Typography>
              }
              onClick={() => setJsonOpen(true)}
              variant={'transparent'}
            />
            <SlideInModal
              onClose={() => setJsonOpen(false)}
              open={jsonOpen}
              title={'View as .json'}
            >
              <FlexGrid direction={'col'} gap={'3xl'}>
                <JsonViewer copy data={json} startOpen />
                <Button
                  align={'right'}
                  label={'Copy'}
                  onClick={() => copyToClipboard(JSON.stringify(json, null, 2))}
                />
              </FlexGrid>
            </SlideInModal>
          </Popover>
        )}
      </FlexGrid>
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
            className={cls([
              'w-full desktop:gap-1.5xl',
              mobileWidth === 'half' ? 'col-span-1' : 'col-span-2',
            ])}
            direction={'row'}
            gap={'0'}
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
            <div className={'w-full inline-flex'}>
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

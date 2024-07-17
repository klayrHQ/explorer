import { FlexGrid } from './flexGrid.tsx';
import { Typography } from './typography.tsx';
import { StatusIcon } from './statusIcon.tsx';
import dayjs from 'dayjs';
import { fromNowFormatter } from '../../../utils/functions.ts';

interface DateComponentProps {
  timestamp: number;
  variant?: 'full' | 'fromNowOnly' | 'dateOnly' | 'default';
  format?: string;
  confirmationTime?: number;
}

export const DateComponent = ({
  timestamp,
  variant = 'default',
  format,
  confirmationTime,
}: DateComponentProps) => {
  return (
    <FlexGrid direction={'col'}>
      <Typography>
        {variant === 'fromNowOnly' ||
          (variant === 'full' && (
            <>
              {dayjs(dayjs(timestamp)).fromNow()}
              {variant === 'full' && <span>{'\u00A0|\u00A0'}</span>}
            </>
          ))}
        {variant === 'dateOnly' ||
          (variant === 'full' && dayjs(timestamp).format(format ?? 'DD MMM YYYY HH:mm:ss | Z UTC'))}
        {variant === 'default' && fromNowFormatter(timestamp)}
      </Typography>
      {confirmationTime && (
        <Typography
          className={'flex gap-sm items-center'}
          color={'onBackgroundLow'}
          variant={'paragraph-sm'}
        >
          <StatusIcon connected />
          <span>{`Confirmed in ${confirmationTime} seconds`}</span>
        </Typography>
      )}
    </FlexGrid>
  );
};

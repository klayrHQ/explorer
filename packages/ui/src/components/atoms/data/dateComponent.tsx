import { FlexGrid } from '../base/flexGrid.tsx';
import { Typography } from '../base/typography.tsx';
import { StatusIcon } from '../base/statusIcon.tsx';
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
  const date = dayjs(timestamp);

  return (
    <FlexGrid direction={'col'}>
      <Typography>
        {variant === 'fromNowOnly' ||
          (variant === 'full' && (
            <>
              <span>{dayjs(date).fromNow()}</span>
              <br className={'desktop:hidden'} />
              {variant === 'full' && (
                <span className={'hidden desktop:inline'}>{'\u00A0|\u00A0'}</span>
              )}
            </>
          ))}
        {variant === 'dateOnly' ||
          (variant === 'full' && (
            <>
              <span>{dayjs(timestamp).format(format ?? 'DD MMM YYYY HH:mm:ss')}</span>
              <br className={'desktop:hidden'} />
              <span className={'hidden desktop:inline'}>{'\u00A0|\u00A0'}</span>
              <span>{dayjs(timestamp).format(format ?? 'Z UTC')}</span>
            </>
          ))}
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

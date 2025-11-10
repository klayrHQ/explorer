import { EventsType } from '../../types.ts';
import { eventsTableHead, validatorBlocksTableHead } from '../tableHeaders.tsx';
import { JsonViewer } from '@repo/ui/atoms';
import { DataType } from '@repo/ui/types';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { getTableSkeletons } from '../dataHelpers.tsx';
import React from 'react';
import { Currency } from '../../../components/currency.tsx';

export const createEventsRows = (events?: EventsType[], loading?: boolean) => {
  const columnCount = eventsTableHead.length;

  return !loading
    ? events?.map((event) => {
        return {
          rowDetails: (
            <JsonViewer
              className={'!border-0'}
              copy
              data={{ data: event.data as unknown as DataType }}
              startOpen
            />
          ),
          cells: [
            {
              children: (
                <FormattedValue
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                  value={event.module}
                />
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: (
                <FormattedValue
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh' }}
                  value={event.name}
                />
              ),
            },
          ],
        };
      })
    : getTableSkeletons(columnCount);
};
export const createValidatorEventsRow = (events: EventsType[], loading: boolean) => {
  return !loading
    ? events?.map((event) => {
        return {
          rowDetails: (
            <JsonViewer
              className={'!border-0'}
              copy
              data={{ data: event.data as unknown as DataType }}
              startOpen
            />
          ),
          cells: [
            {
              children: (
                <FormattedValue
                  format={'fromNow'}
                  typographyProps={{ color: 'onBackground' }}
                  value={event.block.timestamp}
                />
              ),
              className: 'desktop:w-1/5',
            },
            {
              children: <FormattedValue format={'number'} value={event.block.height} />,
            },
            {
              children: <FormattedValue format={'string'} value={event.module} />,
            },
            {
              children: <FormattedValue format={'string'} value={event.name} />,
              className: 'desktop:w-1/5',
            },
            {
              children: <Currency amount={event.data.amount || 0} decimals={5} />,
            },
          ],
        };
      })
    : getTableSkeletons(validatorBlocksTableHead.length);
};

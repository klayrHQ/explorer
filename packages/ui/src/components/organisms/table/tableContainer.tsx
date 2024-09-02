import { cls } from '../../../utils/functions.ts';
import { FlexGrid } from '../../atoms';
import { Table, TableProps } from '../../molecules';
import { Pagination } from '../../atoms';
import React from 'react';

interface TableContainerProps extends TableProps {
  pagination?: boolean;
  filtersComponent?: React.ReactNode;
  tableClassName?: string;
  currentNumber?: number;
  setCurrentNumber?: (number: number) => void;
  totalPages?: number;
}

export const TableContainer = ({
  className,
  pagination,
  filtersComponent,
  tableClassName,
  currentNumber,
  setCurrentNumber,
  totalPages,
  ...props
}: TableContainerProps) => {
  return (
    <FlexGrid
      className={cls([
        className,
        'w-full border-collapse border-solid border-borderLow border-1 rounded-xl overflow-hidden',
      ])}
      direction={'col'}
      gap={'0'}
    >
      {filtersComponent && (
        <FlexGrid className={'p-3xl border-b-1 border-borderLow w-full'}>
          {filtersComponent}
        </FlexGrid>
      )}
      <Table className={tableClassName} {...props} />
      {pagination && (
        <FlexGrid className={'px-3xl py-lg border-t-1 border-borderLow w-full'}>
          <Pagination
            currentNumber={currentNumber || 0}
            setCurrentNumber={setCurrentNumber || (() => {})}
            totalPages={totalPages || 0}
          />
        </FlexGrid>
      )}
    </FlexGrid>
  );
};

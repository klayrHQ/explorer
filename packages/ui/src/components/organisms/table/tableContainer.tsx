import { cls } from '../../../utils/functions.ts';
import { FlexGrid } from '../../atoms';
import { Table, TableProps } from '../../molecules';
import { Pagination } from '../../atoms';

interface TableContainerProps extends TableProps {
  pagination?: boolean;
  filters?: boolean;
  tableClassName?: string;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
  totalPages: number;
}

export const TableContainer = ({
  className,
  pagination,
  filters,
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
      {filters && <FlexGrid className={'p-3xl border-b-1 border-borderLow'}>{'Filters'}</FlexGrid>}
      <Table className={tableClassName} {...props} />
      {pagination && (
        <FlexGrid className={'px-3xl py-lg border-t-1 border-borderLow w-full'}>
          <Pagination
            currentNumber={currentNumber}
            setCurrentNumber={setCurrentNumber}
            totalPages={totalPages || 0}
          />
        </FlexGrid>
      )}
    </FlexGrid>
  );
};

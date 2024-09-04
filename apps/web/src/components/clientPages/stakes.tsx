'use client';

import { FlexGrid, TabButtons } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { createStakesOverviewRows, createValidatorsRows } from '../../utils/helpers/helper';
import {
  stakesOverviewTableHead,
  stakesCalculatorTableHead,
} from '../../utils/helpers/tableHeaders';
import { callGetTransactions, callGetValidators } from '../../utils/api/apiCalls';
import { StakeFilters } from '../filterComponents/stakeFilters';
import { TableCellType } from '@repo/ui/types';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting';
  
export const Stakes = () => {
  const {
    data: stakes,
    totalItems: totalStakes,
    loading: loadingStakes,
    pageNumber: overviewPageNumber,
    limit: overviewLimit,
    handlePageChange: handleOverviewPageChange,
    handleLimitChange: handleOverviewLimitChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetTransactions,
    defaultLimit: '10',
    initialSortField: '',
    initialSortOrder: '',
  });

  const {
    data: validators,
    totalItems: totalValidators,
    loading: loadingValidators,
    pageNumber: calculatorPageNumber,
    limit: calculatorLimit,
    sortField: calculatorSortField,
    sortOrder: calculatorSortOrder,
    handlePageChange: handleCalculatorPageChange,
    handleLimitChange: handleCalculatorLimitChange,
    handleSortChange: handleCalculatorSortChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetValidators,
    defaultLimit: '10',
    initialSortField: 'rank',
    initialSortOrder: 'asc',
  });

  const rowsOverview = createStakesOverviewRows(stakes, loadingStakes);
  const rowCalculator = createValidatorsRows(validators, loadingValidators, true).map((row) => ({
    cells: row.cells.filter((cell) => cell !== null) as TableCellType[],
  }));

  const tabs = [
    {
      value: 1,
      label: 'Overview',
      icon: 'Overview',
      content: (
        <TableContainer
          currentNumber={overviewPageNumber}
          defaultValue={overviewLimit}
          headCols={stakesOverviewTableHead}
          keyPrefix={'stakes'}
          onPerPageChange={handleOverviewLimitChange}
          pagination
          rows={rowsOverview}
          setCurrentNumber={handleOverviewPageChange}
          totalPages={totalStakes / Number(overviewLimit)}
        />
      ),
    },
    {
      value: 2,
      label: 'Calculator',
      icon: 'Calculator',
      content: (
        <TableContainer
          currentNumber={calculatorPageNumber}
          defaultValue={calculatorLimit}
          filtersComponent={<StakeFilters />}
          headCols={stakesCalculatorTableHead(
            handleCalculatorSortChange,
            calculatorSortField,
            calculatorSortOrder,
          )}
          keyPrefix={'stakes'}
          onPerPageChange={handleCalculatorLimitChange}
          pagination
          rows={rowCalculator}
          setCurrentNumber={handleCalculatorPageChange}
          totalPages={totalValidators / Number(calculatorLimit)}
        />
      ),
    },
  ];

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader
        count={totalStakes}
        subTitle={'Overview of all stakes on the blockchain'}
        title={'Stakes'}
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

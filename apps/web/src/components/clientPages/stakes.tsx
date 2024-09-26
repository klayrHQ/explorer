'use client';

import { FlexGrid, TabButtons } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useEffect, useState } from 'react';
import { StakesCalculatorPeriodType, TransactionType, ValidatorType } from '../../utils/types';
import { createStakesOverviewRows, createValidatorsRows } from '../../utils/helpers/helper';
import {
  stakesOverviewTableHead,
  stakesCalculatorTableHead,
} from '../../utils/helpers/tableHeaders';
import { callGetTransactions, callGetValidators } from '../../utils/api/apiCalls';
import { StakeFilters } from '../filterComponents/stakeFilters';
import { TableCellType } from '@repo/ui/types';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';

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
    searchParams: {
      moduleCommand: 'pos:stake',
    },
  });

  const [stakingCalculatorAmount, setStakingCalculatorAmount] = useState<number>(1000);
  const [stakingCalculatorPeriod, setStakingCalculatorPeriod] =
    useState<StakesCalculatorPeriodType>('month');
  const [totalActiveStake, setTotalActiveStake] = useState<bigint>(BigInt(0));
  const basePath = useBasePath();

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

  useEffect(() => {
    callGetValidators({}).then((data) => {
      setTotalActiveStake(
        data.data
          .filter((v: ValidatorType) => v.rank <= 51)
          .reduce((acc, val) => acc + BigInt(val.validatorWeight), BigInt(0)),
      );
    });
  }, []);

  const rowsOverview = createStakesOverviewRows(stakes, loadingStakes, basePath);
  const rowCalculator = createValidatorsRows(validators, loadingValidators, basePath, true, {
    stakingCalculatorAmount,
    stakingCalculatorPeriod,
    totalActiveStake,
  }).map((row) => ({
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
          filtersComponent={
            <StakeFilters
              calculatorProps={{
                amount: stakingCalculatorAmount,
                setAmount: setStakingCalculatorAmount,
                setPeriod: setStakingCalculatorPeriod,
              }}
            />
          }
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

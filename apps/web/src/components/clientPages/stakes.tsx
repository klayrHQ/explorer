'use client';

import { FlexGrid, TabButtons } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useEffect, useState } from 'react';
import { StakesCalculatorPeriodType, TransactionType, ValidatorType } from '../../utils/types';
import {
  stakesOverviewTableHead,
  stakesCalculatorTableHead,
} from '../../utils/helpers/tableHeaders';
import { callGetTransactions, callGetValidators } from '../../utils/api/apiCalls';
import { StakeFilters } from '../filterComponents/stakeFilters';
import { TableCellType } from '@repo/ui/types';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { useIsHorizontallyScrolled } from '../../utils/hooks/useIsHorizontallyScrolled.ts';
import { createValidatorsRows } from '../../utils/helpers/TableHelpers/accountTableHelper.tsx';
import { createStakesOverviewRows } from '../../utils/helpers/TableHelpers/stakeTableHelper.tsx';
import { useNodeStore } from '../../store/nodeStore.ts';
import { usePosConstantsStore, useUpdatePosConstants } from '../../store/posConstantsStore.ts';

export const Stakes = () => {
  useUpdatePosConstants();

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
  const nodeInfo = useNodeStore((state) => state.nodeInfo);
  const posConstants = usePosConstantsStore((state) => state.posConstants);
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
    if (totalValidators) {
      callGetValidators({ limit: totalValidators.toString() }).then((data) => {
        setTotalActiveStake(
          data.data
            .filter((v: ValidatorType) => v.rank <= 51)
            .reduce((acc, val) => acc + BigInt(val.validatorWeight), BigInt(0)),
        );
      });
    }
  }, [totalValidators]);

  const [isScrolled, scrollRef] = useIsHorizontallyScrolled();
  const stakeCalculatorProps = {
    stakingCalculatorAmount,
    stakingCalculatorPeriod,
    totalActiveStake,
    blockTime: nodeInfo?.genesis?.blockTime ?? 0,
    roundLength: posConstants?.roundLength ?? 0,
  };

  const rowsOverview = createStakesOverviewRows(stakes, loadingStakes, basePath);
  const rowCalculator = createValidatorsRows(
    validators,
    loadingValidators,
    isScrolled,
    true,
    stakeCalculatorProps,
  ).map((row) => ({
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
          totalPages={Math.ceil(totalStakes / Number(overviewLimit))}
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
          totalPages={Math.ceil(totalValidators / Number(calculatorLimit))}
          scrollRef={scrollRef}
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

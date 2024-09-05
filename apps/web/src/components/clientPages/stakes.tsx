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
import { useGatewayClientStore } from '../../store/clientStore';
import { StakeFilters } from '../filterComponents/stakeFilters';
import { TableCellType } from '@repo/ui/types';
import { fetchPaginatedData } from '../../utils/helpers/dataHelpers';

export const Stakes = () => {
  const [stakes, setStakes] = useState<TransactionType[]>([]);
  const [validators, setValidators] = useState<ValidatorType[]>([]);
  const [totalValidators, setTotalValidators] = useState(0);
  const [totalStakes, setTotalStakes] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const defaultLimit = '10';
  const [rowsPerPage, setRowsPerPage] = useState<number>(21);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [stakingCalculatorAmount, setStakingCalculatorAmount] = useState<number>(1000);
  const [stakingCalculatorPeriod, setStakingCalculatorPeriod] =
    useState<StakesCalculatorPeriodType>('month');
  const [totalActiveStake, setTotalActiveStake] = useState<bigint>(BigInt(0));

  const network = useGatewayClientStore((state) => state.network);

  const [overviewPageNumber, setOverviewPageNumber] = useState<number>(1);
  const handleOverviewPageChange = (newPageNumber: number) => {
    setOverviewPageNumber(newPageNumber);
  };

  const [calculatorPageNumber, setCalculatorPageNumber] = useState<number>(1);
  const handleCalculatorPageChange = (newPageNumber: number) => {
    setCalculatorPageNumber(newPageNumber);
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    setLoading(true);

    const sort = sortField && sortOrder ? `${sortField}:${sortOrder}` : 'rank:asc';

    const overviewPromise = fetchPaginatedData(
      callGetTransactions,
      { moduleCommand: 'pos:stake' },
      overviewPageNumber,
      defaultLimit,
    ).then((data) => {
      setStakes(data.data);
      setTotalStakes(data.meta.total);
    });

    const calculatorPromise = fetchPaginatedData(
      callGetValidators,
      { sort: sort },
      calculatorPageNumber,
      defaultLimit,
    ).then((data) => {
      setValidators(data.data);
      setTotalValidators(data.meta.total);
    });

    Promise.all([calculatorPromise, overviewPromise]).finally(() => setLoading(false));
  }, [sortField, sortOrder, calculatorPageNumber, overviewPageNumber, rowsPerPage, network]);

  useEffect(() => {
    callGetValidators({}).then((data) => {
      setTotalActiveStake(
        data.data.filter((v: ValidatorType) => v.rank <= 51).reduce((acc, val) => acc + BigInt(val.totalStake), BigInt(0)),
      );
    });
  }, []);

  const rowsOverview = createStakesOverviewRows(stakes, loading);
  const rowCalculator = createValidatorsRows(validators, loading, true, {
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
          headCols={stakesOverviewTableHead}
          keyPrefix={'stakes'}
          pagination
          rows={rowsOverview}
          setCurrentNumber={handleOverviewPageChange}
          totalPages={totalStakes / Number(defaultLimit)}
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
          filtersComponent={
            <StakeFilters
              calculatorProps={{
                amount: stakingCalculatorAmount,
                setAmount: setStakingCalculatorAmount,
                setPeriod: setStakingCalculatorPeriod,
              }}
            />
          }
          headCols={stakesCalculatorTableHead(handleSort, sortField, sortOrder)}
          keyPrefix={'stakes'}
          pagination
          rows={rowCalculator}
          setCurrentNumber={handleCalculatorPageChange}
          totalPages={totalValidators / Number(defaultLimit)}
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

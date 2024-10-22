'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { transactionTableHead } from '../../utils/helpers/tableHeaders';
import { createTransactionRows } from '../../utils/helpers/helper.tsx';
import { callGetTransactions } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useState, useCallback, useMemo } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { TransactionsFilter } from '../filterComponents/transactionsFilter.tsx';
import React from 'react';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();

  const [inputValues, setInputValues] = useState({ from: '', to: '' });
  const [filterValues, setFilterValues] = useState({ from: '', to: '' });

  const handleBlur = useCallback(() => {
    if (inputValues.from.length === 41 || inputValues.to.length === 41) {
      setFilterValues(inputValues);
    }
  }, [inputValues]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && (inputValues.from.length === 41 || inputValues.to.length === 41)) {
        setFilterValues(inputValues);
      }
    },
    [inputValues],
  );

  const handleClear = useCallback((field: 'from' | 'to') => {
    setInputValues((prev) => ({ ...prev, [field]: '' }));
    setFilterValues((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const {
    data: transactions,
    totalItems: totalTxs,
    loading,
    pageNumber,
    limit,
    sortField,
    sortOrder,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetTransactions,
    defaultLimit: searchParams.get('limit') || '10',
    changeURL: true,
    searchParams: {
      senderAddress: filterValues.from,
      recipientAddress: filterValues.to,
    },
    additionalDependencies: [filterValues],
  });

  const rows = useMemo(
    () => createTransactionRows(transactions, loading, 'Copy to clipboard', () => {}, basePath),
    [transactions, loading, basePath],
  );

  const totalPages = useMemo(() => Math.ceil(totalTxs / Number(limit)), [totalTxs, limit]);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader
        count={totalTxs}
        subTitle={'Overview of all transactions on the blockchain'}
        title={'Transactions'}
      />
      <TableContainer
        currentNumber={pageNumber}
        defaultValue={limit}
        filtersComponent={
          <TransactionsFilter
            handleClearFrom={() => handleClear('from')}
            handleClearTo={() => handleClear('to')}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            setValueFrom={(value) => setInputValues((prev) => ({ ...prev, from: value }))}
            setValueTo={(value) => setInputValues((prev) => ({ ...prev, to: value }))}
            valueFrom={inputValues.from}
            valueTo={inputValues.to}
          />
        }
        headCols={transactionTableHead(handleSortChange, sortField, sortOrder)}
        keyPrefix={'transactions'}
        onPerPageChange={handleLimitChange}
        pagination
        rows={rows}
        setCurrentNumber={handlePageChange}
        totalPages={totalPages}
      />
    </FlexGrid>
  );
};

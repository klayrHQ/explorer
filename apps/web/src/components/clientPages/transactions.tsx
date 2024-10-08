'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { transactionTableHead } from '../../utils/helpers/tableHeaders';
import { createTransactionRows } from '../../utils/helpers/helper.tsx';
import { callGetTransactions } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useState, useCallback } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { TransactionsFilter } from '../filterComponents/transactionsFilter.tsx';
import React from 'react';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();

  const [filterValueTo, setFilterValueTo] = useState<string>('');
  const [filterValueFrom, setFilterValueFrom] = useState<string>('');
  const [inputValueTo, setInputValueTo] = useState<string>('');
  const [inputValueFrom, setInputValueFrom] = useState<string>('');

  const handleBlur = useCallback(() => {
    setFilterValueTo(inputValueTo);
    setFilterValueFrom(inputValueFrom);
    if (!inputValueTo && !inputValueFrom) {
      setFilterValueTo('');
      setFilterValueFrom('');
    }
  }, [inputValueTo, inputValueFrom]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setFilterValueTo(inputValueTo);
        setFilterValueFrom(inputValueFrom);
      }
    },
    [inputValueTo, inputValueFrom],
  );

  const handleClearFrom = () => {
    setInputValueFrom('');
    setFilterValueFrom('');
  };

  const handleClearTo = () => {
    setInputValueTo('');
    setFilterValueTo('');
  };

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
      senderAddress: filterValueFrom,
      recipientAddress: filterValueTo,
    },
    additionalDependencies: [filterValueFrom, filterValueTo],
  });

  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const rows = createTransactionRows(
    transactions,
    loading,
    copyTooltipText,
    setCopyTooltipText,
    basePath,
  );

  const totalPages = Math.ceil(totalTxs / Number(limit));

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
            handleClearFrom={handleClearFrom}
            handleClearTo={handleClearTo}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            setValueFrom={setInputValueFrom}
            setValueTo={setInputValueTo}
            valueFrom={inputValueFrom}
            valueTo={inputValueTo}
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

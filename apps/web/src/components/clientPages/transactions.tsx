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

export const Transactions = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();

  const [valueFrom, setValueFrom] = useState<string>('');
  const [valueTo, setValueTo] = useState<string>('');

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
      senderAddress: valueFrom,
      recipientAddress: valueTo,
    },
    additionalDependencies: [valueFrom, valueTo],
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
            setValueFrom={setValueFrom}
            setValueTo={setValueTo}
            valueFrom={valueFrom}
            valueTo={valueTo}
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

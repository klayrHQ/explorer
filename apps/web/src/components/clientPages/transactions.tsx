'use client';
import { FilterBadge, FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { transactionTableHead } from '../../utils/helpers/tableHeaders';
import { callGetTransactions, callGetNetworkStatus } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import React from 'react';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { useFilterManagement } from '../../utils/helpers/filterHandlers.ts';
import { createTransactionRows } from '../../utils/helpers/TableHelpers/transactionTableHelper.tsx';
import { UniversalFilter } from '../filterComponents/UniversalFilter.tsx';
import { FilterConfigType } from '../filterComponents/filterTypes.tsx';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();
  const chains = useChainNetworkStore((state) => state.chains);
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const {
    inputValues,
    setInputValues,
    filterValues,
    checkedItems,
    handleClear,
    handleCheckboxChange,
    handleSelectAllChange,
    handleApply,
    handleCheckboxClose,
    clearAllFields,
  } = useFilterManagement();

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
      senderAddress:
        filterValues.from && filterValues.from.length === 41 ? filterValues.from : undefined,
      recipientAddress:
        filterValues.to && filterValues.to.length === 41 ? filterValues.to : undefined,
      moduleCommand:
        filterValues.moduleCommand && filterValues.moduleCommand.includes(':')
          ? filterValues.moduleCommand
          : undefined,
    },
    additionalDependencies: [filterValues],
  });

  const rows = useMemo(
    () =>
      createTransactionRows(
        transactions,
        loading,
        currentChain,
        chains,
        'Copy to clipboard',
        () => {},
        basePath,
      ),
    [transactions, loading, basePath, chains, currentChain],
  );

  const totalPages = useMemo(() => Math.ceil(totalTxs / Number(limit)), [totalTxs, limit]);

  const [commandObject, setCommandObject] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchNetworkStatus = async () => {
      try {
        const status = await callGetNetworkStatus();
        const moduleCommands = status.data.moduleCommands;

        const commandObject: { [key: string]: string[] } = moduleCommands.reduce(
          (acc, command) => {
            const [key, value] = command.split(':');

            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(value);

            return acc;
          },
          {} as { [key: string]: string[] },
        );

        setCommandObject(commandObject);
      } catch (error) {
        console.error('Error fetching network status:', error);
      }
    };

    fetchNetworkStatus();
  }, []);

  const filterConfigurations: FilterConfigType[] = [
    {
      title: 'Transaction Type',
      type: 'checkbox' as 'checkbox',
      dataKey: 'transactionType',
    },
    {
      title: 'Sender Address',
      type: 'input' as 'input',
      dataKey: 'from',
      inputProps: {
        placeholder: 'Type an address',
        validation: (value: string | any[]) => value.length === 41,
        errorMessage: 'Invalid sender address',
      },
    },
    {
      title: 'Receiver Address',
      type: 'input',
      dataKey: 'to',
      inputProps: {
        placeholder: 'Type an address',
        validation: (value: string | any[]) => value.length === 41,
        errorMessage: 'Invalid receiver address',
      },
    },
  ];

  console.log('object', commandObject);

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
          <UniversalFilter
            inputValues={inputValues}
            setInputValues={setInputValues}
            handleClearField={(field: keyof typeof inputValues) => handleClear(field)}
            filterConfigurations={filterConfigurations}
            data={commandObject}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllChange={handleSelectAllChange}
            handleApply={handleApply}
            handleClear={clearAllFields}
            handleCheckboxClose={handleCheckboxClose}
            filterValues={filterValues}
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

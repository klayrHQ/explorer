'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { transactionTableHead } from '../../utils/helpers/tableHeaders';
import { createTransactionRows } from '../../utils/helpers/helper.tsx';
import { callGetTransactions, callGetNetworkStatus } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { TransactionsFilter } from '../filterComponents/transactionsFilter.tsx';
import React from 'react';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();
  const chains = useChainNetworkStore((state) => state.chains);
  const currentChain = useChainNetworkStore((state) => state.currentChain);

  const [inputValues, setInputValues] = useState({ from: '', to: '' });
  const [filterValues, setFilterValues] = useState({ from: '', to: '', moduleCommand: '' });
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({});

  const handleClear = useCallback((field: 'from' | 'to') => {
    setInputValues((prev) => ({ ...prev, [field]: '' }));
    setFilterValues((prev) => ({ ...prev, [field]: '' }));
    setCheckedItems({});
  }, []);

  const handleCheckboxChange = (category: string, value: string, isChecked: boolean) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [value]: isChecked,
      },
    }));
  };

  const handleSelectAllChange = (category: string, values: string[], isChecked: boolean) => {
    setCheckedItems((prevState) => {
      const updatedCategory = values.reduce(
        (acc, value) => {
          acc[value] = isChecked;
          return acc;
        },
        {} as Record<string, boolean>,
      );
      return {
        ...prevState,
        [category]: updatedCategory,
      };
    });
  };

  const handleApply = () => {
    const selectedItems: string[] = [];
    Object.entries(checkedItems).forEach(([category, values]) => {
      Object.entries(values).forEach(([value, isChecked]) => {
        if (isChecked) {
          selectedItems.push(`${category}:${value}`);
        }
      });
    });
    setFilterValues((prev) => ({
      ...prev,
      from: inputValues.from,
      to: inputValues.to,
      moduleCommand: selectedItems.join('=&'), //How to join
    }));
    console.log('Filter values:', filterValues);
    console.log('Checked items:', selectedItems);
  };

  const handleClearAll = () => {
    setInputValues({ from: '', to: '' });
    setFilterValues({ from: '', to: '', moduleCommand: '' });
    setCheckedItems({});
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
    [transactions, loading, basePath],
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
            setValueFrom={(value) => setInputValues((prev) => ({ ...prev, from: value }))}
            setValueTo={(value) => setInputValues((prev) => ({ ...prev, to: value }))}
            valueFrom={inputValues.from}
            valueTo={inputValues.to}
            data={commandObject}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllChange={handleSelectAllChange}
            handleApply={handleApply}
            handleClear={handleClearAll}
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

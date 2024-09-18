'use client';

import { FlexGrid, TabButtons, Typography, CopyIcon } from '@repo/ui/atoms';
import { DetailsSection, SectionHeader, TableContainer } from '@repo/ui/organisms';
import { UsersType, TransactionType } from '../../utils/types.ts';
import { useState, useEffect } from 'react';
import { DataType } from '@repo/ui/types';
import { callGetValidators, callGetTransactions } from '../../utils/api/apiCalls.tsx';
import { transactionTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { createTransactionRows } from '../../utils/helpers/helper.tsx';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import { fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';

export const UserDetails = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UsersType | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const transactionsPagination = usePagination();

  useEffect(() => {
    setLoading(true);
    callGetValidators({
      address: params.id,
    })
      .then((data) => setUser(data.data[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (user && user.account && user.account.address) {
      setLoading(true);

      const addSortingParams = (params: any) => {
        if (sortField && sortOrder) {
          params.sort = `${sortField}:${sortOrder}`;
        }
        return params;
      };

      const transactionsPromise = fetchPaginatedData(
        callGetTransactions,
        addSortingParams({
          address: user.account.address,
        }),
        transactionsPagination.pageNumber,
        transactionsPagination.limit,
      ).then((data) => {
        setTransactions(data.data);
        setTransactionsMeta(data.meta);
      });

      // const incomingStakesPromise = callGetStakers({
      //   address: validator.account.address,
      // }).then((data) => {
      //   setIncomingStakes(data.data.stakers);
      // });

      // const outgoingStakesPromise = callGetStakes({
      //   address: validator.account.address,
      // }).then((data) => {
      //   setOutgoingStakes(data.data.stakes);
      // });

      // const eventsPromise = fetchPaginatedData(
      //   callGetEvents,
      //   { senderAddress: validator.account.address },
      //   eventsPagination.pageNumber,
      //   eventsPagination.limit,
      // ).then((data) => {
      //   setEvents(data.data);
      //   setEventsMeta(data.meta);
      // });

      // const blocksPromise = fetchPaginatedData(
      //   callGetBlocks,
      //   { generatorAddress: validator.account.address },
      //   blocksPagination.pageNumber,
      //   blocksPagination.limit,
      // ).then((data) => {
      //   setBlocks(data.data);
      //   setBlocksMeta(data.meta);
      // });

      Promise.all([
        transactionsPromise,
        // incomingStakesPromise,
        // outgoingStakesPromise,
        // eventsPromise,
        // blocksPromise,
      ]).finally(() => setLoading(false));
    }
  }, [
    user,
    sortField,
    sortOrder,
    // blocksPagination.pageNumber,
    // blocksPagination.limit,
    // eventsPagination.pageNumber,
    // eventsPagination.limit,
    transactionsPagination.pageNumber,
    transactionsPagination.limit,
  ]);

  const createDetails = (label: string, value: any = ' - ', mobileWidth?: string) => {
    return { label: { label }, value, mobileWidth };
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const details = [
    createDetails(
      'Validator address',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{user?.account.address}</Typography>
        <CopyIcon content={user?.account.address || ''} size={'xxs'} />
      </div>,
    ),
    createDetails(
      'Public Key',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{user?.account.publicKey}</Typography>
        <CopyIcon content={user?.account.publicKey || ''} size={'xxs'} />
      </div>,
      'half',
    ),
  ];

  const rows = createTransactionRows(
    transactions,
    loading,
    copyTooltipText,
    setCopyTooltipText,
    true,
  );

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection data={details} json={user as unknown as DataType} title={'User Details'} />
      ),
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={transactionsMeta?.total}
            title={`${user?.account.name} transactions`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            currentNumber={transactionsPagination.pageNumber}
            defaultValue={transactionsPagination.limit}
            headCols={transactionTableHead(handleSort, sortField, sortOrder, true)}
            keyPrefix={'validator-tx'}
            onPerPageChange={transactionsPagination.handleLimitChange}
            pagination={
              transactionsMeta?.total
                ? transactionsMeta?.total > parseInt(transactionsPagination.limit)
                : false
            }
            rows={rows}
            setCurrentNumber={transactionsPagination.handlePageChange}
            totalPages={Math.ceil(
              (transactionsMeta?.total ?? 0) / Number(transactionsPagination.limit),
            )}
          />
        </FlexGrid>
      ),
    },
    {
      value: 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: <>3</>,
    },
    {
      value: 4,
      label: 'Events',
      icon: 'List',
      content: <>4</>,
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

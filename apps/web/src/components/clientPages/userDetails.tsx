'use client';

import { FlexGrid, TabButtons, Typography, CopyIcon } from '@repo/ui/atoms';
import { DetailsSection, SectionHeader, TableContainer, UserBanner } from '@repo/ui/organisms';
import { UsersType, TransactionType } from '../../utils/types.ts';
import { useState, useEffect } from 'react';
import { DataType } from '@repo/ui/types';
import BannerBG from '../../assets/images/bannerBG.png';
import {
  callGetValidators,
  callGetTransactions,
  callGetEvents,
  callGetStakes,
  callGetStakers,
} from '../../utils/api/apiCalls.tsx';
import {
  transactionTableHead,
  validatorEventsTableHead,
  validatorStakeOutgoingTableHead,
} from '../../utils/helpers/tableHeaders.tsx';
import {
  createTransactionRows,
  createValidatorEventsRow,
  createValidatorOutgoingStakeRows,
} from '../../utils/helpers/helper.tsx';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import { fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';

export const UserDetails = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UsersType | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [eventsMeta, setEventsMeta] = useState<any>({});
  const [outgoingStakes, setOutgoingStakes] = useState<any[]>([]);
  const [incomingStakes, setIncomingStakes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const transactionsPagination = usePagination();
  const eventsPagination = usePagination();
  const basePath = useBasePath();

  useEffect(() => {
    setLoading(true);
    callGetValidators({
      address: params.id,
    })
      .then((data) => setUser(data.data[0]))
      .catch((error) => console.error('Error fetching validator:', error))
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
      )
        .then((data) => {
          setTransactions(data.data);
          setTransactionsMeta(data.meta);
        })
        .catch((error) => console.error('Error fetching transactions:', error));

      const outgoingStakesPromise = callGetStakes({
        address: user.account.address,
      })
        .then((data) => {
          setOutgoingStakes(data.data.stakes);
        })
        .catch((error) => console.error('Error fetching outgoing stakes:', error));

      const incomingStakesPromise = callGetStakers({
        address: user.account.address,
      })
        .then((data) => {
          setIncomingStakes(data.data.stakers);
        })
        .catch((error) => console.error('Error fetching incoming stakers:', error));

      const eventsPromise = fetchPaginatedData(
        callGetEvents,
        { senderAddress: user.account.address },
        eventsPagination.pageNumber,
        eventsPagination.limit,
      )
        .then((data) => {
          setEvents(data.data);
          setEventsMeta(data.meta);
        })
        .catch((error) => console.error('Error fetching events:', error));

      Promise.all([
        transactionsPromise,
        outgoingStakesPromise,
        eventsPromise,
        incomingStakesPromise,
      ]).finally(() => setLoading(false));
    }
  }, [
    user,
    sortField,
    sortOrder,
    eventsPagination.pageNumber,
    eventsPagination.limit,
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
    basePath,
    true,
  );
  const eventsRows = createValidatorEventsRow(events, loading);
  const outgoingStake = createValidatorOutgoingStakeRows(outgoingStakes, user, loading, basePath);

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
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={outgoingStakes.length}
            title={`${user?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorStakeOutgoingTableHead}
            keyPrefix={'validator-blocks'}
            rows={outgoingStake}
          />
        </FlexGrid>
      ),
    },
    {
      value: 4,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={eventsMeta?.total}
            title={`${user?.account.name}'s events`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            currentNumber={eventsPagination.pageNumber}
            defaultValue={eventsPagination.limit}
            headCols={validatorEventsTableHead}
            keyPrefix={'validator-blocks'}
            onPerPageChange={eventsPagination.handleLimitChange}
            pagination={
              eventsMeta?.total ? eventsMeta?.total > parseInt(eventsPagination.limit) : false
            }
            rows={eventsRows}
            setCurrentNumber={eventsPagination.handlePageChange}
            totalPages={Math.ceil((eventsMeta?.total ?? 0) / Number(eventsPagination.limit))}
          />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <UserBanner
        basePath={basePath}
        coinRate={0.2}
        image={BannerBG.src}
        incomingTransactions={incomingStakes.length}
        outgoingTransactions={outgoingStakes.length}
        rank={user?.rank || ''}
        senderAddress={user?.account.address}
        senderName={user?.account.name}
        status={user?.status || 'offline'}
        value={232}
        valueSymbol={'KLY'}
      />
      <div className="desktop:hidden w-full">
        <TabButtons padding="6" showLabel={false} tabs={tabs} width="full" />
      </div>
      <div className="hidden desktop:flex w-full">
        <TabButtons tabs={tabs} width="full" />
      </div>
    </FlexGrid>
  );
};

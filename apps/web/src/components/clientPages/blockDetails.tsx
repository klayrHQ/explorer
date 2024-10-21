'use client';
import React, { useEffect, useState } from 'react';
import {
  BlockDetailsBanner,
  DetailsSection,
  SectionHeader,
  TableContainer,
} from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import {
  DateComponent,
  FlexGrid,
  NotFound,
  TabButtons,
  UserAccountCard,
  Typography,
  CopyIcon,
} from '@repo/ui/atoms';
import { eventsTableHead, transactionTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { createEventsRows, createTransactionRows } from '../../utils/helpers/helper.tsx';
import { DataType } from '@repo/ui/types';
import { getSeedRevealFromAssets, fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';
import { BlockDetailsType, EventsType, TransactionType } from '../../utils/types.ts';
import { callGetBlocks, callGetEvents, callGetTransactions } from '../../utils/api/apiCalls.tsx';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import { Link } from '@repo/ui/atoms';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { Currency } from '../currency.tsx';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { FormattedValue } from '../formattedValue.tsx';
import { shortString } from '@repo/ui/utils';

export const BlockDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [block, setBlocks] = useState<BlockDetailsType | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<any>({});
  const [events, setEvents] = useState<EventsType[]>([]);
  const [eventsMeta, setEventsMeta] = useState<any>({});
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const symbol = currentChain?.token.symbol;

  const transactionsPagination = usePagination();
  const eventsPagination = usePagination();
  const basePath = useBasePath();

  useEffect(() => {
    setLoading(true);
    callGetBlocks({
      blockID: id,
    })
      .then((data) => setBlocks(data.data[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (block?.numberOfTransactions && block?.numberOfTransactions >= 0) {
      setLoading(true);

      const addSortingParams = (params: any) => {
        if (sortField) {
          params.sortField = sortField;
          params.sortOrder = sortOrder;
        }
        return params;
      };

      const transactionsPromise = fetchPaginatedData(
        callGetTransactions,
        addSortingParams({
          blockID: id,
        }),
        transactionsPagination.pageNumber,
        transactionsPagination.limit,
      ).then((data) => {
        setTransactions(data.data);
        setTransactionsMeta(data.meta);
      });

      Promise.all([transactionsPromise]).finally(() => setLoading(false));
    }
  }, [
    id,
    block,
    sortField,
    sortOrder,
    transactionsPagination.pageNumber,
    transactionsPagination.limit,
  ]);

  useEffect(() => {
    if (block) {
      setLoading(true);
      const eventsPromise = fetchPaginatedData(
        callGetEvents,
        { height: `${block.height}:${block.height}` },
        eventsPagination.pageNumber,
        eventsPagination.limit,
      ).then((data) => {
        setEvents(data.data);
        setEventsMeta(data.meta);
      });

      Promise.all([eventsPromise]).finally(() => setLoading(false));
    }
  }, [block, eventsPagination.pageNumber, eventsPagination.limit]);

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };
  const details = [
    {
      label: {
        label: 'Block ID',
      },
      value: (
        <>
          <FormattedValue
            copy
            format={'string'}
            typographyProps={{ color: 'onBackgroundHigh', className: 'hidden desktop:inline-flex' }}
            value={block?.id}
          />
          <FormattedValue
            copy
            format={'string'}
            typographyProps={{ color: 'onBackgroundHigh', className: 'desktop:hidden' }}
            value={shortString(block?.id ?? ' ', 16, 'center')}
          />
        </>
      ),
    },
    {
      label: {
        label: 'Block height',
      },
      value: (
        <FormattedValue
          copy
          format={'string'}
          typographyProps={{ color: 'onBackgroundHigh', className: 'hidden desktop:inline-flex' }}
          value={block?.height}
        />
      ),
    },
    {
      label: {
        label: 'Date',
      },
      value: block?.timestamp ? (
        <DateComponent timestamp={block?.timestamp * 1000} variant={'full'} />
      ) : (
        ''
      ),
    },
    {
      label: {
        label: 'Generator',
      },
      value: <FormattedValue format={'account'} value={block?.generator} />,
    },
    {
      label: {
        label: 'Seed reveal',
      },
      value: block?.assets ? getSeedRevealFromAssets(block?.assets) : '-',
    },
    {
      label: {
        label: 'Transactions',
      },
      value: (
        <FormattedValue
          format={'number'}
          typographyProps={{ color: 'onBackgroundHigh' }}
          value={block?.numberOfTransactions}
        />
      ),
    },
    {
      label: {
        label: 'Events',
      },
      value: (
        <FormattedValue
          format={'number'}
          typographyProps={{ color: 'onBackgroundHigh' }}
          value={block?.numberOfEvents}
        />
      ),
    },
    {
      label: {
        label: 'Assets',
      },
      value: (
        <FormattedValue
          format={'number'}
          typographyProps={{ color: 'onBackgroundHigh' }}
          value={block?.numberOfAssets}
        />
      ),
    },
    {
      label: {
        label: 'Reward',
      },
      value: block?.reward ? (
        <Currency
          amount={block.reward}
          className={'truncate max-w-full'}
          decimals={4}
          marketValue={undefined}
        />
      ) : (
        '-'
      ),
    },
  ];

  const transactionRows = createTransactionRows(
    transactions,
    loading,
    copyTooltipText,
    setCopyTooltipText,
    basePath,
  );
  const eventsRows = createEventsRows(events, loading);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: <DetailsSection data={details} json={block as unknown as DataType} />,
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      count: transactionsMeta?.total || '0',
      content: (
        <FlexGrid className="w-full mx-auto" direction={'col'} gap={'4.5xl'}>
          {transactions?.length && transactions.length > 0 ? (
            <TableContainer
              currentNumber={transactionsPagination.pageNumber}
              defaultValue={transactionsPagination.limit}
              headCols={transactionTableHead(handleSort, sortField, sortOrder)}
              keyPrefix={'transactions'}
              onPerPageChange={transactionsPagination.handleLimitChange}
              pagination={
                transactionsMeta?.total
                  ? transactionsMeta?.total > parseInt(transactionsPagination.limit)
                  : false
              }
              rows={transactionRows}
              setCurrentNumber={transactionsPagination.handlePageChange}
              totalPages={Math.ceil(
                (transactionsMeta?.total ?? 0) / Number(transactionsPagination.limit),
              )}
            />
          ) : (
            <NotFound
              className="mt-16"
              headerText={'No transactions found'}
              subheaderText={'We cannot find any transactions in this block'}
            />
          )}
        </FlexGrid>
      ),
    },
    {
      value: 3,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <TableContainer
            currentNumber={eventsPagination.pageNumber}
            defaultValue={eventsPagination.limit}
            headCols={eventsTableHead}
            keyPrefix={'tx-events'}
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
      <BlockDetailsBanner
        basePath={basePath}
        generatorAddress={block?.generator.address || ''}
        generatorName={block?.generator.name || ''}
        height={block?.height || 0}
        image={BannerBG.src}
        isFinal={block?.isFinal || false}
        numberOfTransactions={block?.numberOfTransactions || 0}
        reward={block?.reward || '0'}
        symbol={symbol}
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

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
  Currency,
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
import { getSeedRevealFromAssets } from '../../utils/helpers/dataHelpers.tsx';
import { BlockDetailsType, EventsType, TransactionType } from '../../utils/types.ts';
import { callGetBlocks, callGetEvents, callGetTransactions } from '../../utils/api/apiCalls.tsx';

export const BlockDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [block, setBlocks] = useState<BlockDetailsType | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [events, setEvents] = useState<EventsType[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

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

      callGetTransactions(
        addSortingParams({
          blockID: id,
        }),
      )
        .then((data) => setTransactions(data.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [id, block, sortField, sortOrder]);

  useEffect(() => {
    if (block) {
      setLoading(true);
      callGetEvents({
        height: `${block.height}:${block.height}`,
      })
        .then((data) => setEvents(data.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [block]);

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
        <div className="flex flex-row gap-1.5 items-baseline ">
          <Typography variant={'paragraph-sm'}>{block?.id}</Typography>
          <CopyIcon content={block?.id || ''} size={'xxs'} />
        </div>
      ),
    },
    {
      label: {
        label: 'Block height',
      },
      value: (
        <div className="flex flex-row gap-1.5 items-baseline ">
          <Typography variant={'paragraph-sm'}>{block?.height}</Typography>
          <CopyIcon content={block?.height.toString() || ''} size={'xxs'} />
        </div>
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
      value: (
        <UserAccountCard address={block?.generator?.address ?? ''} name={block?.generator?.name} />
      ),
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
      value: block?.numberOfTransactions,
    },
    {
      label: {
        label: 'Events',
      },
      value: block?.numberOfEvents,
    },
    {
      label: {
        label: 'Assets',
      },
      value: block?.numberOfAssets,
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
          symbol={'KLY'}
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
  );
  const eventsRows = createEventsRows(events, loading);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection
          data={details}
          json={block as unknown as DataType}
          title={'Block Details'}
        />
      ),
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: (
        <FlexGrid className="w-full mx-auto" direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={transactions?.length || '0'}
            title={'Block transactions'}
            titleSizeNotLink={'h5'}
          />
          {transactions?.length && transactions.length > 0 ? (
            <TableContainer
              headCols={transactionTableHead(handleSort, sortField, sortOrder)}
              keyPrefix={'transactions'}
              rows={transactionRows}
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
          <SectionHeader count={events?.length} title={'Block events'} titleSizeNotLink={'h5'} />
          <TableContainer headCols={eventsTableHead} keyPrefix={'tx-events'} rows={eventsRows} />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <BlockDetailsBanner
        generatorAddress={block?.generator.address || ''}
        generatorName={block?.generator.name || ''}
        height={block?.height || 0}
        image={BannerBG.src}
        isFinal={block?.isFinal || false}
        numberOfTransactions={block?.numberOfTransactions || 0}
        reward={block?.reward || '0'}
        symbol="KLY"
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

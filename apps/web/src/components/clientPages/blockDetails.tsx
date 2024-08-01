'use client';
import gatewayClient from '../../network/gatewayClient';
import React, { useEffect, useState } from 'react';
import { GatewayRes, BlockDetailsType, TransactionType, EventsType } from '../../utils/types';
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
} from '@repo/ui/atoms';
import { eventsTableHead, transactionTableHead } from '../../utils/constants.tsx';
import { createEventsRows, createTransactionRows } from '../../utils/helper.tsx';
import { DataType } from '@repo/ui/types';
import { getSeedRevealFromAssets } from '../../utils/dataHelpers.tsx';

export const BlockDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [block, setBlock] = useState<BlockDetailsType>();
  const [transactions, setTransactions] = useState<TransactionType[]>();
  const [events, setEvents] = useState<EventsType[]>();
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlock = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<BlockDetailsType[]>>('blocks', {
          params: {
            blockID: id,
            includeAssets: true,
          },
        });

        if (data?.data) {
          setBlock(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBlock();
  }, [id]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<TransactionType[]>>('transactions', {
          params: {
            blockID: id,
          },
        });

        if (data?.data) {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (block?.numberOfTransactions && block?.numberOfTransactions >= 0) getTransactions();
  }, [id, block]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<EventsType[]>>('events', {
          params: {
            height: `${block?.height}:${block?.height}`,
          },
        });

        if (data?.data) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (block) {
      getEvents();
    }
  }, [block]);

  const details = [
    {
      label: {
        label: 'Block ID',
      },
      value: block?.id,
    },
    {
      label: {
        label: 'Block Height',
      },
      value: block?.height,
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
      icon: 'List',
      content: (
        <FlexGrid className="w-full mx-auto" direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={transactions?.length || '0'}
            title={'Block transactions'}
            titleSizeNotLink={'h5'}
          />
          {transactions?.length && transactions.length > 0 ? (
            <TableContainer
              headCols={transactionTableHead}
              keyPrefix={'transactions'}
              rows={transactionRows}
            />
          ) : (
            <NotFound
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

'use client';
import React, { useEffect, useState } from 'react';
import { TransactionBanner } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import { Currency, DateComponent, FlexGrid, TabButtons, UserAccountCard } from '@repo/ui/atoms';
import { DetailsSection, SectionHeader, TableContainer } from '@repo/ui/organisms';
import { eventsTableHead } from '../../utils/constants.tsx';
import Link from 'next/link';
import { createEventsRows } from '../../utils/helper.tsx';
import { DataType } from '@repo/ui/types';
import { useTransactionStore } from '../../store/transactionStore.ts';
import { useEventsStore } from '../../store/eventStore.ts';
import { EventsType, TransactionType } from '../../utils/types.ts';

export const TransactionDetails = ({ params }: { params: { id: string } }) => {
  const callGetTransactions = useTransactionStore((state) => state.callGetTransactions);
  const callGetEvents = useEventsStore((state) => state.callGetEvents);

  const { id } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<TransactionType | undefined>(undefined);
  const [events, setEvents] = useState<EventsType[] | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    callGetTransactions({
      transactionID: id,
    })
      .then((data) => setTransaction(data.data[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (transaction) {
      setLoading(true);
      callGetEvents({
        transactionID: transaction.id,
      })
        .then((data) => setEvents(data.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [transaction]);

  const details = [
    {
      label: {
        label: 'Transaction ID',
      },
      value: transaction?.id,
    },
    {
      label: {
        label: 'Module',
        tooltip: 'The module that the transaction belongs to',
      },
      value: transaction?.module,
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Command',
        tooltip: 'The command that the transaction belongs to',
      },
      value: transaction?.command,
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Date',
      },
      value: transaction?.block?.timestamp ? (
        <DateComponent timestamp={transaction?.block?.timestamp * 1000} variant={'full'} />
      ) : (
        ''
      ),
    },
    ...(transaction?.params?.amount
      ? [
          {
            label: {
              label: 'Amount',
            },
            value: (
              <Currency
                amount={transaction?.params?.amount}
                className={'truncate max-w-full'}
                marketValue={undefined}
                symbol={'KLY'}
              />
            ),
            mobileWidth: 'half',
          },
        ]
      : []),
    {
      label: {
        label: 'Fee',
      },
      value: (
        <Currency
          amount={transaction?.fee ?? 0}
          className={'truncate max-w-full'}
          decimals={4}
          marketValue={undefined}
          symbol={'KLY'}
        />
      ),
      mobileWidth: transaction?.params?.amount ? 'half' : 'full',
    },
    {
      label: {
        label: 'Nonce',
      },
      value: transaction?.nonce,
    },
    {
      label: {
        label: 'From',
      },
      value: (
        <UserAccountCard
          address={transaction?.sender?.address ?? ''}
          name={transaction?.sender?.name}
        />
      ),
      mobileWidth: 'half',
    },
    ...(transaction?.recipient
      ? [
          {
            label: {
              label: 'To',
            },
            value: (
              <UserAccountCard
                address={transaction?.recipient?.address ?? ''}
                name={transaction?.recipient?.name}
              />
            ),
            mobileWidth: 'half',
          },
        ]
      : []),
    ...(transaction?.sender?.publicKey
      ? [
          {
            label: {
              label: 'Sender Public Key',
            },
            value: transaction?.sender?.publicKey,
          },
        ]
      : []),
    {
      label: {
        label: 'Block',
      },
      value: <Link href={`/blocks/${transaction?.block?.id}`}>{transaction?.block?.id}</Link>,
    },
    {
      label: {
        label: 'Block Height',
      },
      value: <Link href={`/blocks/${transaction?.block?.id}`}>{transaction?.block?.height}</Link>,
    },
    /*{
      label: {
        label: 'Blocks ago',
      },
      value: 21,
    },*/
    /*{
      label: {
        label: 'Token',
      },
      value: (
        <KeyValueComponent
          keyValue={
            <ImageContainer
              alt={'token logo'}
              component={DefaultImageComponent}
              src={'/'}
              variant={'chainLogo'}
            />
          }
          contentValue={<Typography variant={'paragraph-lg'}>{'KLY'}</Typography>}
        />
      ),
    },*/
    /*{
      label: {
        label: 'Chains',
      },
      value: (
        <ChainToChainComponent
          from={{ logo: '/', name: 'Klayr-mainchain' }}
          to={{ logo: '/', name: 'Tokenfactory' }}
          imageComponent={DefaultImageComponent}
        />
      ),
    },*/
    ...(transaction?.params?.data
      ? [
          {
            label: {
              label: 'Data',
            },
            value: transaction?.params?.data,
          },
        ]
      : []),
  ];

  const eventsRows = createEventsRows(events, loading);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection
          data={details}
          json={transaction as unknown as DataType}
          title={'Transaction Details'}
        />
      ),
    },
    {
      value: 2,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={events?.length}
            title={'Transaction events'}
            titleSizeNotLink={'h5'}
          />
          <TableContainer headCols={eventsTableHead} keyPrefix={'tx-events'} rows={eventsRows} />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <TransactionBanner
        amount={transaction?.params?.amount || '0'}
        blockHeight={transaction?.block.height || 0}
        blockId={transaction?.block.id || ''}
        executionStatus={transaction?.block.isFinal}
        id={transaction?.id || ''}
        image={BannerBG.src}
        moduleCommand={`${transaction?.module}:${transaction?.command}` || ''}
        receiverAddress={transaction?.params?.recipientAddress}
        receiverName={transaction?.meta?.recipient?.name}
        senderAddress={transaction?.sender?.address || ''}
        senderName={transaction?.sender?.name}
        symbol={'KLY'}
        timestamp={transaction?.block.timestamp || 0}
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

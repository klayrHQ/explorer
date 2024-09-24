'use client';
import React, { useEffect, useState } from 'react';
import { TransactionBanner } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import {
  Currency,
  DateComponent,
  FlexGrid,
  TabButtons,
  UserAccountCard,
  Typography,
  CopyIcon,
} from '@repo/ui/atoms';
import { DetailsSection, SectionHeader, TableContainer } from '@repo/ui/organisms';
import { eventsTableHead } from '../../utils/helpers/tableHeaders.tsx';
import Link from 'next/link';
import { createEventsRows } from '../../utils/helpers/helper.tsx';
import { DataType } from '@repo/ui/types';
import { EventsType, TransactionType } from '../../utils/types.ts';
import { callGetEvents, callGetTransactions } from '../../utils/api/apiCalls.tsx';

export const TransactionDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<TransactionType | undefined>(undefined);
  const [events, setEvents] = useState<EventsType[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  const details = [
    {
      label: {
        label: 'Transaction ID',
      },
      value: (
        <div className="flex flex-row gap-1.5 items-baseline ">
          <Typography variant={'paragraph-sm'}>{transaction?.id}</Typography>
          <CopyIcon content={transaction?.id || ''} size={'xxs'} />
        </div>
      ),
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
        <Link href={transaction?.sender?.name ? `/validators/${transaction?.sender?.address}` : ``}>
          <UserAccountCard
            address={transaction?.sender?.address ?? ''}
            name={transaction?.sender?.name}
          />
        </Link>
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
              <Link
                href={
                  transaction?.recipient?.name
                    ? `/validators/${transaction?.recipient?.address}`
                    : ``
                }
              >
                <UserAccountCard
                  address={transaction?.recipient?.address ?? ''}
                  name={transaction?.recipient?.name}
                />
              </Link>
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
      value: (
        <div className="flex flex-row gap-1.5 items-baseline ">
          <Link href={`/blocks/${transaction?.block?.id}`}>{transaction?.block?.height}</Link>
          <CopyIcon content={String(transaction?.block?.height) || ''} size={'xxs'} />
        </div>
      ),
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
        executionStatus={transaction?.executionStatus}
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

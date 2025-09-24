'use client';
import React, { useEffect, useState } from 'react';
import { TransactionBanner } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import { DateComponent, FlexGrid, TabButtons } from '@repo/ui/atoms';
import { DetailsSection, TableContainer } from '@repo/ui/organisms';
import { eventsTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { DataType } from '@repo/ui/types';
import { EventsType, TransactionType } from '../../utils/types.ts';
import { callGetEvents, callGetTransactions } from '../../utils/api/apiCalls.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { Currency } from '../currency.tsx';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { FormattedValue } from '../formattedValue.tsx';
import { shortString } from '@repo/ui/utils';
import { createEventsRows } from '../../utils/helpers/TableHelpers/eventTableHelper.tsx';

export const TransactionDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<TransactionType | undefined>(undefined);
  const [events, setEvents] = useState<EventsType[]>([]);
  const basePath = useBasePath();
  const currentChainToken = useChainNetworkStore((state) => state.currentChainToken);
  const symbol = currentChainToken?.symbol;

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
        <>
          <FormattedValue
            copy
            format={'string'}
            typographyProps={{ color: 'onBackgroundHigh', className: 'hidden desktop:inline-flex' }}
            value={transaction?.id}
          />
          <FormattedValue
            copy
            format={'string'}
            typographyProps={{ color: 'onBackgroundHigh', className: 'desktop:hidden' }}
            value={shortString(transaction?.id ?? ' ', 16, 'center')}
          />
        </>
      ),
    },
    {
      label: {
        label: 'Module',
        tooltip: 'The module that the transaction belongs to',
      },
      value: transaction?.moduleCommand.split(':')[0],
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Command',
        tooltip: 'The command that the transaction belongs to',
      },
      value: transaction?.moduleCommand.split(':')[1],
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
      value: <FormattedValue format={'account'} value={transaction?.sender} />,
      mobileWidth: 'half',
    },
    ...(transaction?.meta.recipient
      ? [
          {
            label: {
              label: 'To',
            },
            value: <FormattedValue format={'account'} value={transaction?.meta.recipient} />,
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
            value: (
              <>
                <FormattedValue
                  copy
                  format={'string'}
                  typographyProps={{
                    color: 'onBackgroundHigh',
                    className: 'hidden desktop:inline-flex',
                  }}
                  value={transaction?.sender.publicKey}
                />
                <FormattedValue
                  copy
                  format={'string'}
                  typographyProps={{ color: 'onBackgroundHigh', className: 'desktop:hidden' }}
                  value={shortString(transaction?.sender.publicKey ?? ' ', 16, 'center')}
                />
              </>
            ),
          },
        ]
      : []),
    {
      label: {
        label: 'Block',
      },
      value: (
        <>
          <FormattedValue
            copy
            format={'string'}
            link={`/blocks/${transaction?.block?.id}`}
            typographyProps={{ color: 'onBackgroundHigh', className: 'hidden desktop:inline-flex' }}
            value={transaction?.block?.id}
          />
          <FormattedValue
            copy
            format={'string'}
            link={`/blocks/${transaction?.block?.id}`}
            typographyProps={{ color: 'onBackgroundHigh', className: 'desktop:hidden' }}
            value={shortString(transaction?.block?.id ?? ' ', 16, 'center')}
          />
        </>
      ),
    },
    {
      label: {
        label: 'Block Height',
      },
      value: (
        <FormattedValue
          copy
          format={'number'}
          link={`/blocks/${transaction?.block?.id}`}
          typographyProps={{ color: 'onBackgroundHigh' }}
          value={transaction?.block?.height}
        />
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
      content: <DetailsSection data={details} json={transaction as unknown as DataType} />,
    },
    {
      value: 2,
      label: 'Events',
      icon: 'List',
      count: events?.length,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <TableContainer headCols={eventsTableHead} keyPrefix={'tx-events'} rows={eventsRows} />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <TransactionBanner
        amount={transaction?.params?.amount || '0'}
        basePath={basePath}
        blockHeight={transaction?.block.height || 0}
        blockId={transaction?.block.id || ''}
        executionStatus={transaction?.executionStatus}
        id={transaction?.id || ''}
        image={BannerBG.src}
        moduleCommand={`${transaction?.moduleCommand}` || ''}
        receiverAddress={transaction?.params?.recipientAddress}
        receiverName={transaction?.meta?.recipient?.name}
        senderAddress={transaction?.sender?.address || ''}
        senderName={transaction?.sender?.name}
        symbol={symbol}
        timestamp={transaction?.block.timestamp || 0}
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

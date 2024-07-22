'use client';
import React, { useEffect, useState } from 'react';
import { GatewayRes, TransactionType } from '../../utils/types';
import { TransactionBanner } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import gatewayClient from '../../network/gatewayClient';
import {
  ChainToChainComponent,
  Currency,
  DateComponent,
  FlexGrid,
  ImageContainer,
  KeyValueComponent,
  TabButtons, Typography,
  UserAccountCard
} from "@repo/ui/atoms";
import {DetailsSection} from "@repo/ui/organisms";
import {DefaultImageComponent} from "storybook/stories/utils/constants.tsx";

export const TransactionDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [transaction, setTransaction] = useState<TransactionType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<TransactionType[]>>('transactions', {
          params: {
            transactionID: id,
          },
        });

        if (data?.data) {
          setTransaction(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTransaction();
  }, [id]);

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
      value: (
        <DateComponent
          //confirmationTime={2}
          timestamp={(transaction?.block?.timestamp ?? 0) * 1000}
          variant={'full'}
        />
      ),
    },
    ... transaction?.params?.amount ? [{
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
    }] : [],
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
    ... transaction?.recipient ? [{
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
    }] : [],
    ... transaction?.sender?.publicKey ? [{
      label: {
        label: 'Sender Public Key',
      },
      value: transaction?.sender?.publicKey,
    }] : [],
    {
      label: {
        label: 'Block',
      },
      value: transaction?.block?.id,
    },
    {
      label: {
        label: 'Block Height',
      },
      value: transaction?.block?.height,
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
    ... transaction?.params?.data ? [{
      label: {
        label: 'Data',
      },
      value: transaction?.params?.data,
    }] : [],
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: <DetailsSection title={'Transaction Details'} data={details} />,
    },
    {
      value: 2,
      label: 'Events',
      icon: 'List',
      content: <div>Metadata</div>,
    },
  ]

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <TransactionBanner
        amount={transaction?.params?.amount || '0'}
        blockHeight={transaction?.block.height || 0}
        blockId={transaction?.block.id || ""}
        executionStatus={transaction?.block.isFinal}
        id={transaction?.id || ""}
        image={BannerBG.src}
        moduleCommand={`${transaction?.module}:${transaction?.command}` || ''}
        receiverAddress={transaction?.params?.recipientAddress}
        receiverName={transaction?.meta?.recipient?.name}
        senderAddress={transaction?.sender?.address || ''}
        senderName={transaction?.sender?.name}
        symbol={"KLY"}
        timestamp={transaction?.block.timestamp || 0}
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

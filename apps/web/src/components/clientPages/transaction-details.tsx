'use client';

import React, { useEffect, useState } from 'react';
import { GatewayRes, TransactionType } from '../../utils/types';
import { TransactionBanner } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import gatewayClient from '../../network/gatewayClient';

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

  return (
    <div>
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
    </div>
  );
};

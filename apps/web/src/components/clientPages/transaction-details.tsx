'use client'

import React, { useEffect, useState } from "react";
import { TransactionType } from "../../utils/types";
import { TransactionBanner } from "@repo/ui/molecules";

export const TransactionDetails = ({ params, }: { params: { id: string } }) => {
  const { id, } = params;
  const [transaction, setTransaction] = useState<TransactionType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/transaction/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTransaction(data.transaction);
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
        amount={transaction?.params?.amount || "0"}
        blockHeight={transaction?.block.height || 0}
        blockId={transaction?.block.id || ""}
        executionStatus={transaction?.executionStatus}
        id={transaction?.id || ""}
        image={transaction?.params?.tokenID || ""}
        moduleCommand={transaction?.moduleCommand || ""}
        receiverAddress={transaction?.params?.recipientAddress}
        receiverName={transaction?.meta?.recipient?.name}
        senderAddress={transaction?.sender?.address || ""}
        senderName={transaction?.sender?.name}
        symbol={transaction?.params?.tokenID || ""}
        timestamp={transaction?.block.timestamp || 0}
      />
    </div>
  );
};


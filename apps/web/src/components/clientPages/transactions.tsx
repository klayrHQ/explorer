"use client"
import { FlexGrid } from "@repo/ui/atoms";
import {SectionHeader, TableContainer} from "@repo/ui/organisms";
import {useEffect, useState} from "react";
import {TableCellType} from "@repo/ui/types";
import {TransactionType} from "../../utils/types.ts";
import {shortString} from "@repo/ui/utils";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[] | []>([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetch('/api/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response) {
          const data = await response.json();
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getTransactions();
  }, [])

  const tableHead: TableCellType[] = [
    {
      children: "Transaction ID",
    },
    {
      children: "Height",
    },
    {
      children: "Date",
    },
    {
      children: "Type",
    },
    {
      children: "From",
    },
    {
      children: "To",
    },
    {
      children: "Amount",
    },
    {
      children: "Fee",
    },
  ];

  const rows = transactions?.map((transaction) => {
    return {
      cells: [
        {
          children: shortString(transaction?.id, 12, "center"),
        },
        {
          children: transaction?.block?.height,
        },
        {
          children: new Date(transaction.block.timestamp).toDateString(),
        },
        {
          children: transaction?.moduleCommand,
        },
        {
          children: shortString(transaction?.sender?.address, 12, "center"),
        },
        {
          children: shortString(transaction?.meta?.recipient?.address, 12, "center"),
        },
        {
          children: transaction?.params?.amount,
        },
        {
          children: transaction?.fee,
        },
      ],
    };
  });

  return (
    <FlexGrid className="w-full max-w-app mx-auto" direction={"column"} gap={"5xl"}>
      <SectionHeader
        count={100}
        subTitle={"Overview of all transactions on the blockchain"}
        title={"Transactions"}
      />
      <TableContainer
        headCols={tableHead}
        keyPrefix={"transactions"}
        rows={rows}
      />
    </FlexGrid>
  );
}
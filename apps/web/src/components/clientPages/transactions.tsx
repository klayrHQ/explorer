"use client"
import {FlexGrid, Tooltip, Typography, UserAccountCard, Currency, Badge} from "@repo/ui/atoms";
import {SectionHeader, TableContainer} from "@repo/ui/organisms";
import {useEffect, useState} from "react";
import {TableCellType} from "@repo/ui/types";
import {TransactionType} from "../../utils/types.ts";
import {fromNowFormatter, replaceColonWithSpace, shortString} from "@repo/ui/utils";
import {decimals} from "../../utils/constants.tsx";
import Link from "next/link";

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
          children: (
            <Typography className={"hover:underline"} link>
              <Link href={"#"}>{shortString(transaction?.id, 12, "center")}</Link>
            </Typography>
          ),
        },
        {
          children: transaction?.block?.height,
        },
        {
          children: (
              <Tooltip placement={"top"} text={new Date(transaction.block.timestamp * 1000).toDateString()}>
                <Typography className={"whitespace-nowrap"} color={"onBackgroundLow"}>{fromNowFormatter(transaction.block.timestamp * 1000)}</Typography>
              </Tooltip>
          ),
        },
        {
          children: <Badge label={replaceColonWithSpace(transaction?.moduleCommand)} />,
        },
        {
          children: <UserAccountCard address={transaction?.sender?.address} name={transaction?.sender?.name} />,
        },
        {
          children: (
            transaction?.meta?.recipient ?
            (
              <UserAccountCard address={transaction?.meta?.recipient?.address} name={transaction?.meta?.recipient?.name} />
            ) : (
              "-"
            )
          ),
        },
        {
          children: (
            <Currency
              amount={transaction?.params?.amount}
              className={"align-middle"}
              color={"onBackgroundLow"}
              decimals={decimals}
              symbol={"KLY"}
              variant={"paragraph-sm"}
            />
          ),
        },
        {
          children: (
            <Currency
              amount={transaction?.fee}
              className={"align-middle"}
              color={"onBackgroundLow"}
              decimals={5}
              symbol={"KLY"}
              variant={"paragraph-sm"}
            />
          ),
        },
      ],
    };
  });

  return (
    <FlexGrid className="w-full mx-auto" direction={"column"} gap={"5xl"}>
      <SectionHeader
        count={transactions?.length}
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
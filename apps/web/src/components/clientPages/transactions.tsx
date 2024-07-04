"use client"
import {FlexGrid, Tooltip, Typography, UserAccountCard, Currency, Badge, Icon} from "@repo/ui/atoms";
import {TxDataPopover} from "@repo/ui/molecules";
import {SectionHeader, TableContainer} from "@repo/ui/organisms";
import {useEffect, useState} from "react";
import {TableCellType} from "@repo/ui/types";
import {TransactionType} from "../../utils/types.ts";
import {fromNowFormatter, replaceColonWithSpace, shortString} from "@repo/ui/utils";
import {commandColors, decimals} from "../../utils/constants.tsx";
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
    const command = transaction?.moduleCommand.split(":")[1];
    return {
      rowDetails: (
        <TxDataPopover
          txData={{
            status: transaction?.executionStatus || "pending",
            data: transaction?.params?.data,
            nonce: transaction?.nonce,
          }}
        />
      ),
      cells: [
        {
          children: (
            <Typography className={"hover:underline"} link>
              <Link href={"#"}>{shortString(transaction?.id, 12, "center")}</Link>
            </Typography>
          ),
        },
        {
          children: (
            <Typography className={"group whitespace-nowrap inline-flex gap-sm items-center"}>
              {transaction?.block?.height}
              <Tooltip placement={"bottom"} text={"Copy to clipboard"}>
                <Icon
                  className={"group-hover:inline hidden cursor-pointer"}
                  icon={"Copy"}
                  //onClick={() => navigator.clipboard.writeText(transaction?.block?.height.toString())}
                  size={"2xs"}
                />
              </Tooltip>
            </Typography>
          ),
          className: "min-w-[120px]",
        },
        {
          children: (
            <Tooltip placement={"top"} text={new Date(transaction.block.timestamp * 1000).toDateString()}>
              <Typography className={"whitespace-nowrap"} color={"onBackgroundLow"}>{fromNowFormatter(transaction.block.timestamp * 1000)}</Typography>
            </Tooltip>
          ),
        },
        {
          children: (
            <Badge 
              colorVariant={commandColors[command]}
              label={replaceColonWithSpace(transaction?.moduleCommand)}
            />
          ),
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
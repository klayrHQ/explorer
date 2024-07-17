"use client";
import {
  FlexGrid,
  Tooltip,
  Typography,
  UserAccountCard,
  Currency,
  Badge,
  Icon,
} from "@repo/ui/atoms";
import { TxDataPopover } from "@repo/ui/molecules";
import { SectionHeader, TableContainer } from "@repo/ui/organisms";
import { useEffect, useState } from "react";
import { TableCellType } from "@repo/ui/types";
import { TransactionType } from "../../utils/types.ts";
import {
  copyToClipboard,
  dayjs,
  fromNowFormatter,
  replaceColonWithSpace,
  shortString,
} from "@repo/ui/utils";
import {
  commandColors,
  decimals,
  getTableSkeletons,
} from "../../utils/constants.tsx";
import Link from "next/link";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[] | []>([]);
  const [copyTooltipText, setCopyTooltipText] =
    useState<string>("Copy to clipboard");
  const [loading, setLoading] = useState<boolean>(true);

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    setCopyTooltipText("Copied to clipboard!");
    setTimeout(() => {
      setCopyTooltipText("Copy to clipboard");
    }, 2000);
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response) {
          const data = await response.json();
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

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

  const rows = !loading
    ? transactions?.map((transaction) => {
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
                  <Link href={`/transactions/${transaction?.id}`}>
                    {shortString(transaction?.id, 12, "center")}
                  </Link>
                </Typography>
              ),
            },
            {
              children: (
                <Typography
                  className={
                    "whitespace-nowrap inline-flex gap-sm items-center"
                  }
                >
                  {transaction?.block?.height}
                  <Tooltip placement={"bottom"} text={copyTooltipText}>
                    <span
                      onClick={() =>
                        handleCopy(transaction?.block?.height.toString())}
                    >
                      <Icon
                        className={
                          "desktop:group-hover/child:inline desktop:hidden cursor-pointer"
                        }
                        icon={"Copy"}
                        size={"2xs"}
                      />
                    </span>
                  </Tooltip>
                </Typography>
              ),
              className: "group/child min-w-[120px]",
            },
            {
              children: (
                <Tooltip
                  placement={"top"}
                  text={dayjs(transaction.block.timestamp * 1000).format(
                    "DD MMM YYYY HH:mm",
                  )}
                >
                  <Typography
                    className={"whitespace-nowrap"}
                    color={"onBackgroundLow"}
                  >
                    {fromNowFormatter(
                      transaction.block.timestamp * 1000,
                      "DD MMM YYYY",
                    )}
                  </Typography>
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
              children: (
                <UserAccountCard
                  address={transaction?.sender?.address}
                  name={transaction?.sender?.name}
                />
              ),
            },
            {
              children: transaction?.meta?.recipient ? (
                <UserAccountCard
                  address={transaction?.meta?.recipient?.address}
                  name={transaction?.meta?.recipient?.name}
                />
              ) : (
                "-"
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
      })
    : getTableSkeletons(tableHead.length);

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
};

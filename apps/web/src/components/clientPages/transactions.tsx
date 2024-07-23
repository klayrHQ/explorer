'use client';
import {
  FlexGrid,
  Tooltip,
  Typography,
  UserAccountCard,
  Currency,
  Badge,
  Icon,
} from '@repo/ui/atoms';
import { TxDataPopover } from '@repo/ui/molecules';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useEffect, useState } from 'react';
import { TableCellType } from '@repo/ui/types';
import { GatewayRes, TransactionType } from '../../utils/types.ts';
import {
  copyToClipboard,
  dayjs,
  fromNowFormatter,
  replaceColonWithSpace,
  shortString,
} from '@repo/ui/utils';
import { commandColors, decimals, getTableSkeletons } from '../../utils/constants.tsx';
import Link from 'next/link';
import gatewayClient from '../../network/gatewayClient.ts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [totalTxs, setTotalTxs] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page')) || 1);
  const defaultLimit = '10';

  const handleSetPageNumber = async (number: number) => {
    setPageNumber(number);
    router.push(pathname + '?' + `page=${number}`);
  };

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    setCopyTooltipText('Copied');
    setTimeout(() => {
      setCopyTooltipText('Copy to clipboard');
    }, 2000);
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const limit = Number(searchParams.get('limit')) || defaultLimit;
        const page = Number(searchParams.get('page')) || 1;
        const offset = (page - 1) * Number(limit);

        const { data } = await gatewayClient.get<GatewayRes<TransactionType[]>>('transactions', {
          params: {
            limit: searchParams.get('limit') || defaultLimit,
            offset: offset,
          },
        });

        if (data) {
          const transactions: TransactionType[] = data.data;
          setTransactions(transactions);
          setTotalTxs(data.meta.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [searchParams]);

  const tableHead: TableCellType[] = [
    {
      children: 'Transaction ID',
    },
    {
      children: 'Height',
    },
    {
      children: 'Date',
    },
    {
      children: 'Type',
    },
    {
      children: 'From',
    },
    {
      children: 'To',
    },
    {
      children: 'Amount',
    },
    {
      children: 'Fee',
    },
  ];

  const rows = !loading
    ? transactions?.map((transaction) => {
        return {
          rowDetails: (
            <TxDataPopover
              txData={{
                status: transaction?.executionStatus || 'pending',
                data: transaction?.params?.data,
                nonce: transaction?.nonce,
              }}
            />
          ),
          cells: [
            {
              children: (
                <Typography className={'hover:underline'} link>
                  <Link href={`transactions/${transaction.id}`}>
                    {shortString(transaction?.id, 12, 'center')}
                  </Link>
                </Typography>
              ),
            },
            {
              children: (
                <Typography className={'whitespace-nowrap inline-flex gap-sm items-center'}>
                  {transaction?.block?.height}
                  <Tooltip placement={'bottom'} text={copyTooltipText}>
                    <span onClick={() => handleCopy(transaction?.block?.height.toString())}>
                      <Icon
                        className={'desktop:group-hover/child:inline desktop:hidden cursor-pointer'}
                        icon={'Copy'}
                        size={'2xs'}
                      />
                    </span>
                  </Tooltip>
                </Typography>
              ),
              className: 'group/child min-w-[120px]',
            },
            {
              children: (
                <Tooltip
                  placement={'top'}
                  text={dayjs(transaction.block.timestamp * 1000).format('DD MMM YYYY HH:mm')}
                >
                  <Typography className={'whitespace-nowrap'} color={'onBackgroundLow'}>
                    {fromNowFormatter(transaction.block.timestamp * 1000, 'DD MMM YYYY')}
                  </Typography>
                </Tooltip>
              ),
            },
            {
              children: (
                <Badge
                  colorVariant={commandColors[transaction.command]}
                  label={replaceColonWithSpace(`${transaction?.module}:${transaction?.command}`)}
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
              children: transaction?.recipient ? (
                <UserAccountCard
                  address={transaction?.recipient?.address}
                  name={transaction?.recipient?.name}
                />
              ) : (
                '-'
              ),
            },
            {
              children: (
                <Currency
                  amount={transaction?.params?.amount}
                  className={'align-middle'}
                  color={'onBackgroundLow'}
                  decimals={decimals}
                  symbol={'KLY'}
                  variant={'paragraph-sm'}
                />
              ),
            },
            {
              children: (
                <Currency
                  amount={transaction?.fee}
                  className={'align-middle'}
                  color={'onBackgroundLow'}
                  decimals={5}
                  symbol={'KLY'}
                  variant={'paragraph-sm'}
                />
              ),
            },
          ],
        };
      })
    : getTableSkeletons(tableHead.length);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader
        count={totalTxs}
        subTitle={'Overview of all transactions on the blockchain'}
        title={'Transactions'}
      />
      <TableContainer
        currentNumber={pageNumber}
        headCols={tableHead}
        keyPrefix={'transactions'}
        pagination
        rows={rows}
        setCurrentNumber={handleSetPageNumber}
        totalPages={totalTxs / Number(defaultLimit)}
      />
    </FlexGrid>
  );
};

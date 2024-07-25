'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useEffect, useState } from 'react';
import { GatewayRes, TransactionType } from '../../utils/types.ts';
import { transactionTableHead } from '../../utils/constants.tsx';
import gatewayClient from '../../network/gatewayClient.ts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createTransactionRows } from '../../utils/helper.tsx';

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

  const rows = createTransactionRows(transactions, loading, copyTooltipText, setCopyTooltipText);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader
        count={totalTxs}
        subTitle={'Overview of all transactions on the blockchain'}
        title={'Transactions'}
      />
      <TableContainer
        currentNumber={pageNumber}
        headCols={transactionTableHead}
        keyPrefix={'transactions'}
        pagination
        rows={rows}
        setCurrentNumber={handleSetPageNumber}
        totalPages={totalTxs / Number(defaultLimit)}
      />
    </FlexGrid>
  );
};

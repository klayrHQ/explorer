'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useEffect, useState } from 'react';
import { transactionTableHead } from '../../utils/constants.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createTransactionRows } from '../../utils/helper.tsx';
import { useTransactionStore } from '../../store/transactionStore.ts';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setTotalTxs = useTransactionStore((state) => state.setTotalTxs);
  const callGetTransactions = useTransactionStore((state) => state.callGetTransactions);
  const totalTxs = useTransactionStore((state) => state.totalTxs);

  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page')) || 1);
  const defaultLimit = '10';

  const handleSetPageNumber = async (number: number) => {
    setPageNumber(number);
    router.push(pathname + '?' + `page=${number}`);
  };

  useEffect(() => {
    setLoading(true);
    const limit = searchParams.get('limit') || defaultLimit;
    const page = Number(searchParams.get('page')) || 1;
    const offset = (page - 1) * Number(limit);
    callGetTransactions({
      limit,
      offset,
    })
      .then((data) => {
        setTotalTxs(data.meta.total);
        setTransactions(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const rows = createTransactionRows(transactions, loading, copyTooltipText, setCopyTooltipText);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
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

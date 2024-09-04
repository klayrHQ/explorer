'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useEffect, useState } from 'react';
import { transactionTableHead } from '../../utils/constants.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createTransactionRows } from '../../utils/helper.tsx';
import { callGetTransactions } from '../../utils/api/apiCalls.tsx';
import { TransactionType } from '../../utils/types.ts';
import { useGatewayClientStore } from '../../store/clientStore.ts';

export const Transactions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [totalTxs, setTotalTxs] = useState(0);
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page')) || 1);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [limit, setLimit] = useState<string>(searchParams.get('limit') || '10');
  const network = useGatewayClientStore((state) => state.network);

  const updateURL = (pageNumber: number, limit: string) => {
    router.push(pathname + '?' + `page=${pageNumber}` + `&limit=${limit}`);
  };

  const handleSetPageNumber = async (number: number) => {
    setPageNumber(number);
    updateURL(number, limit);
  };

  const handlePageLimit = (value: string) => {
    setLimit(value);
    updateURL(pageNumber, value);
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    setLoading(true);
    const page = Number(searchParams.get('page')) || 1;
    const offset = (page - 1) * Number(limit);
    const params: any = {
      limit,
      offset,
    };
    if (sortField && sortOrder) {
      params.sort = `${sortField}:${sortOrder}`;
    }
    callGetTransactions(params)
      .then((data) => {
        setTotalTxs(data.meta.total);
        setTransactions(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchParams, sortField, sortOrder, network, limit]);

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
        defaultValue={limit}
        headCols={transactionTableHead(handleSort, sortField, sortOrder)}
        keyPrefix={'transactions'}
        onPerPageChange={handlePageLimit}
        pagination
        rows={rows}
        setCurrentNumber={handleSetPageNumber}
        totalPages={Math.ceil(totalTxs / Number(limit))}
      />
    </FlexGrid>
  );
};

'use client';

import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useTransactionStore } from '../../store/transactionStore';
import { useEffect, useState } from 'react';
import { TransactionType } from '../../utils/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createStakesRows } from '../../utils/helper';
import { stakesTableHead } from '../../utils/constants';

export const Stakes = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const stakes = useTransactionStore((state) => state.transactions);
  const setStakes = useTransactionStore((state) => state.setTransactions);
  const setTotalStakes = useTransactionStore((state) => state.setTotalTxs);
  const callGetStakes = useTransactionStore((state) => state.callGetTransactions);
  const totalStakes = useTransactionStore((state) => state.totalTxs);

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
    callGetStakes({
      limit,
      offset,
      moduleCommand: 'pos:stake',
    })
      .then((data) => {
        setTotalStakes(data.meta.total);
        setStakes(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const rows = createStakesRows(stakes, loading);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader
        count={totalStakes}
        subTitle={'Overview of all stakes on the blockchain'}
        title={'Stakes'}
      />
      <TableContainer
        currentNumber={pageNumber}
        headCols={stakesTableHead}
        keyPrefix={'stakes'}
        pagination
        rows={rows}
        setCurrentNumber={handleSetPageNumber}
        totalPages={totalStakes / Number(defaultLimit)}
      />
    </FlexGrid>
  );
};

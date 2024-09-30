'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { callGetAccounts } from '../../utils/api/apiCalls.tsx';
import { accountsTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { createAccountsRows } from '../../utils/helpers/helper.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';

export const Accounts = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();

  const {
    data: accounts,
    totalItems: totalAccounts,
    loading,
    pageNumber,
    limit,
    sortField,
    sortOrder,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetAccounts,
    defaultLimit: searchParams.get('limit') || '100',
  });
  const rows = createAccountsRows(accounts, loading, basePath);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto mb-12" direction={'col'}>
      <SectionHeader count={100} title={'Top holders'} />
      <TableContainer
        headCols={accountsTableHead(handleSortChange, sortField, sortOrder)}
        keyPrefix={'transactions'}
        rows={rows}
      />
    </FlexGrid>
  );
};

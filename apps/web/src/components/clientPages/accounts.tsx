'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { callGetAccounts } from '../../utils/api/apiCalls.tsx';
import { accountsTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { createAccountsRows } from '../../utils/helpers/TableHelpers/accountTableHelper.tsx';
import { tokenSummaryStore } from '../../store/tokenSummaryStore.ts';

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

  const { tokenSummary, fetchTokenSummary } = tokenSummaryStore((state) => ({
    tokenSummary: state.tokenSummary,
    fetchTokenSummary: state.fetchTokenSummary,
  }));

  if (tokenSummary?.marketCap === undefined) {
    fetchTokenSummary();
  }

  console.log('marketCap ', tokenSummary?.marketCap);

  const rows = createAccountsRows(
    accounts,
    loading,
    basePath,
    tokenSummary?.marketCap?.toString() || '',
  );

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto mb-12" direction={'col'}>
      <SectionHeader title={'Top Accounts'} />
      <TableContainer
        headCols={accountsTableHead(handleSortChange, sortField, sortOrder)}
        keyPrefix={'transactions'}
        rows={rows}
      />
    </FlexGrid>
  );
};

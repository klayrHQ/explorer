'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { callGetTopAccounts } from '../../utils/api/apiCalls.tsx';
import { accountsTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { createAccountsRows } from '../../utils/helpers/TableHelpers/accountTableHelper.tsx';
import { tokenSummaryStore } from '../../store/tokenSummaryStore.ts';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { TopAccountsType } from '../../utils/types.ts';

export const Accounts = () => {
  const searchParams = useSearchParams();
  const basePath = useBasePath();
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);

  const fallbackTokenID = currentNetwork === 'mainnet' ? '0000000000000000' : '0100000000000000';
  const tokenID: string = currentChain?.tokens[0]?.tokenID ?? fallbackTokenID;

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
    fetchFunction: callGetTopAccounts,
    defaultLimit: searchParams.get('limit') || '100',
    searchParams: {
      tokenID,
    },
  });

  const typedAccounts = accounts as unknown as TopAccountsType;

  const { tokenSummary, fetchTokenSummary } = tokenSummaryStore((state) => ({
    tokenSummary: state.tokenSummary,
    fetchTokenSummary: state.fetchTokenSummary,
  }));

  if (tokenSummary?.marketCap === undefined) {
    fetchTokenSummary();
  }

  const rows = createAccountsRows(
    typedAccounts[tokenID],
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

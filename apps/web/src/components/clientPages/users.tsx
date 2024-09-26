'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { callGetUsers } from '../../utils/api/apiCalls.tsx';
import { usersTableHead } from '../../utils/helpers/tableHeaders';
import { createUsersRows } from '../../utils/helpers/helper.tsx';

export const Users = () => {
  const searchParams = useSearchParams();

  const {
    data: users,
    totalItems: totalUsers,
    loading,
    pageNumber,
    limit,
    sortField,
    sortOrder,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetUsers,
    defaultLimit: searchParams.get('limit') || '100',
  });
  const rows = createUsersRows(users, loading);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto mb-12" direction={'col'}>
      <SectionHeader count={100} title={'Top holders'} />
      <TableContainer
        headCols={usersTableHead(handleSortChange, sortField, sortOrder)}
        keyPrefix={'transactions'}
        rows={rows}
      />
    </FlexGrid>
  );
};

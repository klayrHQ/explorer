'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { callGetValidators } from '../../utils/api/apiCalls.tsx';
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
    //mock_data
    fetchFunction: callGetValidators,
    defaultLimit: searchParams.get('limit') || '10',
    changeURL: true,
  });
  const rows = createUsersRows(users, loading);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader count={totalUsers} title={'Users'} />
      <TableContainer
        currentNumber={pageNumber}
        defaultValue={limit}
        headCols={usersTableHead(handleSortChange, sortField, sortOrder)}
        keyPrefix={'transactions'}
        onPerPageChange={handleLimitChange}
        pagination
        rows={rows}
        setCurrentNumber={handlePageChange}
        totalPages={totalUsers / Number(limit)}
      />
    </FlexGrid>
  );
};
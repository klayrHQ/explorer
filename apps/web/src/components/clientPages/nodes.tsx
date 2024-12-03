'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { nodesTableHead } from '../../utils/helpers/tableHeaders';
import { callGetNodes } from '../../utils/api/apiCalls.tsx';
import { createNodesRows } from '../../utils/helpers/TableHelpers/nodeTableHelper.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useSearchParams } from 'next/navigation';

export const Nodes = () => {
  const searchParams = useSearchParams();
  const defaultLimit = '10';

  const {
    data: nodes,
    totalItems: totalApps,
    loading,
    pageNumber,
    limit,
    handlePageChange,
    handleLimitChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetNodes,
    defaultLimit: searchParams.get('limit') || defaultLimit,
    changeURL: true,
    useNewBlockEvent: false,
  });

  const rows = createNodesRows(nodes, loading);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto mb-12" direction={'col'}>
      <SectionHeader count={totalApps} title={'Nodes'} />
      <TableContainer
        headCols={nodesTableHead}
        keyPrefix={'transactions'}
        rows={rows}
        pagination
        defaultValue={defaultLimit}
        currentNumber={pageNumber}
        setCurrentNumber={handlePageChange}
        totalPages={Math.ceil(totalApps / Number(limit))}
        onPerPageChange={handleLimitChange}
      />
    </FlexGrid>
  );
};

'use client';
import React, { useState } from 'react';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useSearchParams } from 'next/navigation';
import { callGetBlocks } from '../../utils/api/apiCalls.tsx';
import { blockTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { createBlockRows } from '../../utils/helpers/helper.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting';

export const Blocks = () => {
  const defaultLimit = '10';
  const searchParams = useSearchParams();
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const {
    data: blocks,
    totalItems: totalBlocks,
    loading,
    pageNumber,
    limit,
    sortField,
    sortOrder,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetBlocks,
    defaultLimit: searchParams.get('limit') || '10',
    searchParams: {
      includeAssets: true,
    },
    changeURL: true,
  });

  const rowBlocks = createBlockRows(blocks, loading, copyTooltipText, setCopyTooltipText);
  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader
        count={totalBlocks}
        subTitle={'Overview of all blocks on the blockchain'}
        title={'Blocks'}
      />
      <TableContainer
        currentNumber={pageNumber}
        defaultValue={defaultLimit}
        headCols={blockTableHead(handleSortChange, sortField, sortOrder)}
        keyPrefix={'blocks'}
        onPerPageChange={handleLimitChange}
        pagination
        rows={rowBlocks}
        setCurrentNumber={handlePageChange}
        totalPages={Math.ceil(totalBlocks / Number(limit))}
      />
    </FlexGrid>
  );
};

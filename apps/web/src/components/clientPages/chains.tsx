'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { chainsTableHead } from '../../utils/helpers/tableHeaders';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { callGetApps } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useSearchParams } from 'next/navigation';
import { createChainRows } from '../../utils/helpers/TableHelpers/chainTableHelper.tsx';

export const Chains = () => {
  const chains = useChainNetworkStore((state) => state.chains);
  const defaultLimit = '10';
  const searchParams = useSearchParams();
  const basePath = useBasePath();

  const {
    data: apps,
    totalItems: totalApps,
    loading,
    pageNumber,
    limit,
    handlePageChange,
    handleLimitChange,
  } = usePaginationAndSorting({
    fetchFunction: callGetApps,
    defaultLimit: searchParams.get('limit') || defaultLimit,
    searchParams: {
      //status: 'registered,activated,terminated,unregistered',
    },
    changeURL: true,
    useNewBlockEvent: true,
  });

  const combinedApps = apps.map((app) => {
    const meta = chains.find((chain) => chain.chainID === app.chainID);
    const logo = chains.find((chain) => chain.chainID === app.chainID)?.logo;
    const displayName = chains.find((chain) => chain.chainID === app.chainID)?.displayName;
    const projectPage = chains.find((chain) => chain.chainID === app.chainID)?.projectPage;

    return {
      ...app,
      logo,
      displayName,
      projectPage,
      meta,
    };
  });

  const rows = createChainRows(combinedApps || [], loading, basePath);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader count={totalApps} title={'Chains'} />
      <TableContainer
        headCols={chainsTableHead}
        keyPrefix={'chains'}
        rows={rows}
        pagination
        onPerPageChange={handleLimitChange}
        totalPages={Math.ceil(totalApps / Number(limit))}
        setCurrentNumber={handlePageChange}
        currentNumber={pageNumber}
        defaultValue={defaultLimit}
      />
    </FlexGrid>
  );
};

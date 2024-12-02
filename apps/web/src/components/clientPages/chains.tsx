'use client';
import { FlexGrid, NotFound } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { chainsTableHead } from '../../utils/helpers/tableHeaders';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { callGetApps } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useSearchParams } from 'next/navigation';
import { createChainRows } from '../../utils/helpers/TableHelpers/chainTableHelper.tsx';
import { UniversalFilter } from '../filterComponents/UniversalFilter.tsx';
import { useFilterManagement } from '../../utils/helpers/filterHandlers.ts';
import { chainFilterConfig, constructSearchParams } from '../filterComponents/filtersConfig.tsx';
import { useState } from 'react';
import { FilterConfigType } from '../filterComponents/filterTypes.tsx';
import { getSearchKeys } from '../../utils/helpers/filterHandlers.ts';

export const Chains = () => {
  const chains = useChainNetworkStore((state) => state.chains);
  const defaultLimit = '10';
  const searchParams = useSearchParams();
  const basePath = useBasePath();

  // Filter configurations that are available for the chains table hardcoded
  const [commandObject, setCommandObject] = useState<{ [key: string]: string[] }>({
    status: ['registered', 'activated', 'terminated', 'unregistered'],
  });

  //This is for the filter
  const searchKeys = getSearchKeys(chainFilterConfig);

  const {
    inputValues,
    setInputValues,
    filterValues,
    checkedItems,
    handleClear,
    handleCheckboxChange,
    handleSelectAllChange,
    handleApply,
    handleCheckboxClose,
    clearAllFields,
  } = useFilterManagement(searchKeys);

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
    searchParams: constructSearchParams(filterValues, searchKeys),
    changeURL: true,
    useNewBlockEvent: true,
    additionalDependencies: [filterValues],
  });

  const mappedApps = apps
    .filter((app) => app.chainName !== 'klayr_mainchain')
    .map((app) => {
      const logo = chains.find((chain) => chain.chainID === app.chainID)?.logo;
      const displayName = chains.find((chain) => chain.chainID === app.chainID)?.displayName;
      const projectPage = chains.find((chain) => chain.chainID === app.chainID)?.projectPage;
      const meta = chains.find((chain) => chain.chainID === app.chainID);

      return {
        ...app,
        logo,
        displayName,
        projectPage,
        meta,
      };
    });

  const combinedApps = [...mappedApps].sort((a, b) => (b.projectPage ? 1 : -1));

  const rows = createChainRows(combinedApps || [], loading, basePath);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader count={totalApps} title={'Chains'} />
      {combinedApps.length > 0 ? (
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
          filtersComponent={
            <UniversalFilter
              inputValues={inputValues}
              setInputValues={setInputValues}
              handleClearField={(field: string | number) => handleClear(field)}
              filterConfigurations={chainFilterConfig}
              data={commandObject}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectAllChange={handleSelectAllChange}
              handleApply={handleApply}
              handleClear={clearAllFields}
              handleCheckboxClose={handleCheckboxClose}
              filterValues={filterValues}
            />
          }
        />
      ) : (
        <NotFound
          headerText={'No Chains Here'}
          subheaderText={'We could not find any chains on this network'}
        />
      )}
    </FlexGrid>
  );
};

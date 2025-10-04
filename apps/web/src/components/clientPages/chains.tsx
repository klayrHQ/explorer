'use client';
import { FlexGrid, NotFound, TabButtons } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { chainsTableHead } from '../../utils/helpers/tableHeaders';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { callGetApps, callGetChains } from '../../utils/api/apiCalls.tsx';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useSearchParams } from 'next/navigation';
import {
  createBlockchainAppRows,
  createAllChainRows,
} from '../../utils/helpers/TableHelpers/chainTableHelper.tsx';
import { UniversalFilter } from '../filterComponents/UniversalFilter.tsx';
import { useFilterManagement } from '../../utils/helpers/filterHandlers.ts';
import { chainFilterConfig, constructSearchParams } from '../filterComponents/filtersConfig.tsx';
import { useState } from 'react';
import { getSearchKeys } from '../../utils/helpers/filterHandlers.ts';
import { ChainsQueryParams } from '../../utils/api/types.ts';

const callUniqueGetChains = async (params: ChainsQueryParams) => {
  const chainsResponse = await callGetChains(params);
  return {
    data: Array.from(new Map(chainsResponse.data.map((item) => [item.chainID, item])).values()),
    meta: chainsResponse.meta,
  };
};

export const Chains = () => {
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);
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

  const blockchainAppsPagination = usePaginationAndSorting({
    fetchFunction: callUniqueGetChains,
    defaultLimit: searchParams.get('limit') || defaultLimit,
    searchParams: {
      includeBlockchainApp: true,
      excludeChainName: 'klayr_mainchain',
      network: currentNetwork,
      ...constructSearchParams(filterValues, searchKeys),
    },
    changeURL: true,
    useNewBlockEvent: false,
    additionalDependencies: [filterValues],
  });

  const allChainsPagination = usePaginationAndSorting({
    fetchFunction: callGetApps,
    defaultLimit: searchParams.get('limit') || defaultLimit,
    searchParams: {
      excludeChainName: 'klayr_mainchain',
      ...constructSearchParams(filterValues, searchKeys),
    },
    changeURL: true,
    useNewBlockEvent: false,
    additionalDependencies: [filterValues],
  });

  const blockchainAppsRows = createBlockchainAppRows(
    blockchainAppsPagination.data,
    blockchainAppsPagination.loading,
    basePath,
  );

  const allChainsRows = createAllChainRows(
    allChainsPagination.data,
    allChainsPagination.loading,
    basePath,
  );

  const isFiltering = filterValues && filterValues.status;

  const filterComponentClassName = 'flex items-center justify-end h-full min-w-[220px]';
  const filterComponentContent = (
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
  );
  const filterComponent = isFiltering ? (
    filterComponentContent
  ) : (
    <div className={filterComponentClassName}>{filterComponentContent}</div>
  );

  const tabs = [
    {
      value: 1,
      label: 'Blockchain Apps',
      tooltip:
        'Chains that host Blockchain Applications (bApps). Those apps have registered a chain metadata on Klayr App Registry',
      icon: 'Apps',
      count: blockchainAppsPagination.totalItems,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          {blockchainAppsRows?.length && blockchainAppsRows.length > 0 ? (
            <TableContainer
              headCols={chainsTableHead}
              keyPrefix={'chains'}
              rows={blockchainAppsRows}
              pagination
              onPerPageChange={blockchainAppsPagination.handleLimitChange}
              totalPages={Math.ceil(
                blockchainAppsPagination.totalItems / Number(blockchainAppsPagination.limit),
              )}
              setCurrentNumber={blockchainAppsPagination.handlePageChange}
              currentNumber={blockchainAppsPagination.pageNumber}
              defaultValue={defaultLimit}
              filtersComponent={isFiltering ? filterComponent : undefined}
            />
          ) : (
            <NotFound
              className="mt-16"
              headerText={'No blocks found'}
              subheaderText={'We cannot find any blocks'}
            />
          )}
        </FlexGrid>
      ),
    },
    {
      value: 2,
      label: 'All Chains',
      tooltip:
        'All on-chain registered chains, including technical entries. Some entries may lack chain metadata on Klayr App Registry',
      icon: 'Chain',
      count: allChainsPagination.totalItems,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          {allChainsRows?.length && allChainsRows.length > 0 ? (
            <TableContainer
              headCols={chainsTableHead}
              keyPrefix={'chains'}
              rows={allChainsRows}
              pagination
              onPerPageChange={allChainsPagination.handleLimitChange}
              totalPages={Math.ceil(
                allChainsPagination.totalItems / Number(allChainsPagination.limit),
              )}
              setCurrentNumber={allChainsPagination.handlePageChange}
              currentNumber={allChainsPagination.pageNumber}
              defaultValue={defaultLimit}
              filtersComponent={isFiltering ? filterComponent : undefined}
            />
          ) : (
            <NotFound
              className="mt-16"
              headerText={'No blocks found'}
              subheaderText={'We cannot find any blocks'}
            />
          )}
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader
        title={'Chains'}
        subTitle={'Overview of all Chains and Klayr bApps (Blockchain Apps)'}
      />

      {/* Mobile: filter below tabs as before */}
      <div className="desktop:hidden w-full">
        <TabButtons
          padding="6"
          showLabel={false}
          tabs={tabs}
          width="full"
          trailingComponent={isFiltering ? undefined : filterComponent}
        />
      </div>

      {/* Desktop: filter at right end of tab bar using trailingComponent */}
      <div className="hidden desktop:block w-full">
        <TabButtons
          tabs={tabs}
          width="full"
          trailingComponent={isFiltering ? undefined : filterComponent}
        />
      </div>
    </FlexGrid>
  );
};

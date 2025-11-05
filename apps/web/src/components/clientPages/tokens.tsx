'use client';

import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { tokensTableHead } from '../../utils/helpers/tableHeaders';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { createTokensRows } from '../../utils/helpers/TableHelpers/tokenTableHelper.tsx';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { usePaginationAndSorting } from '../../utils/hooks/usePaginationAndSorting.ts';
import { useSearchParams } from 'next/navigation';

const emptyLogo = { png: '', svg: '' };

export const Tokens = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const basePath = useBasePath();

  const tokens = useChainNetworkStore((state) => state.tokens);
  const chains = useChainNetworkStore((state) => state.chains);

  const tokensWithChainLogo = useMemo(
    () =>
      tokens.map((token) => {
        const chainLogo =
          chains.find((chain) => chain.chainID === token.chainID)?.logo ?? emptyLogo;
        const displayName = chains.find((chain) => chain.chainID === token.chainID)?.displayName;
        return { ...token, chainLogo, displayName };
      }),
    [chains, tokens],
  );

  const fetchTokensData = useCallback(
    async ({ limit, offset, sort }: { limit: string; offset: string; sort: string }) => {
      return {
        data: tokensWithChainLogo
          .sort((a, b) => {
            if (!sort) return 0;
            const sortParams = sort.split(':');
            const sortKey = sortParams[0] as 'tokenName' | 'chainName';
            if (sortParams[1] === 'asc') return a[sortKey].localeCompare(b[sortKey]);
            else return b[sortKey].localeCompare(a[sortKey]);
          })
          .slice(Number(offset), Number(limit) + Number(offset)),
        meta: {
          total: tokensWithChainLogo.length,
        },
      };
    },
    [tokensWithChainLogo],
  );

  const tokensPagination = usePaginationAndSorting({
    fetchFunction: fetchTokensData,
    defaultLimit: searchParams.get('limit') || '10',
    additionalDependencies: [tokensWithChainLogo],
  });

  useEffect(() => {
    setLoading(true);
    if (chains.length > 0 && tokens.length > 0) setLoading(false);
  }, [chains, tokens]);

  const rows = createTokensRows(tokensPagination.data, loading, basePath);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader
        count={tokensPagination.totalItems}
        subTitle={'Overview of all tokens'}
        title={'Tokens'}
      />
      <TableContainer
        currentNumber={tokensPagination.pageNumber}
        defaultValue={'10'}
        headCols={tokensTableHead(
          tokensPagination.handleSortChange,
          tokensPagination.sortField,
          tokensPagination.sortOrder,
        )}
        keyPrefix={'tokens'}
        onPerPageChange={tokensPagination.handleLimitChange}
        pagination
        rows={rows}
        setCurrentNumber={tokensPagination.handlePageChange}
        totalPages={Math.ceil(tokensPagination.totalItems / Number(tokensPagination.limit))}
      />
    </FlexGrid>
  );
};

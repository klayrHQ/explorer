'use client';

import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { tokensTableHead } from '../../utils/helpers/tableHeaders';
import { useEffect, useState } from 'react';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { createTokensRows } from '../../utils/helpers/TableHelpers/tokenTableHelper.tsx';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';

const emptyLogo = { png: '', svg: '' };

export const Tokens = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const basePath = useBasePath();

  const tokens = useChainNetworkStore((state) => state.tokens);
  const chains = useChainNetworkStore((state) => state.chains);

  const tokensWithChainLogo = tokens.map((token) => {
    const chainLogo = chains.find((chain) => chain.chainID === token.chainID)?.logo ?? emptyLogo;
    const displayName = chains.find((chain) => chain.chainID === token.chainID)?.displayName;
    return { ...token, chainLogo, displayName };
  });

  useEffect(() => {
    setLoading(true);
    if (chains.length > 0 && tokens.length > 0) setLoading(false);
  }, [chains, tokens]);

  const rows = createTokensRows(tokensWithChainLogo, loading, basePath);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader count={10} subTitle={'Overview of all tokens'} title={'Tokens'} />
      <TableContainer headCols={tokensTableHead} keyPrefix={'tokens'} rows={rows} />
    </FlexGrid>
  );
};

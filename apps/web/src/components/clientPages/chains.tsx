'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { chainsTableHead } from '../../utils/helpers/tableHeaders';
import { createChainRows } from '../../utils/helpers/helper';
import { useState } from 'react';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';

export const Chains = () => {
  const chains = useChainNetworkStore((state) => state.chains);
  const [loading, setLoading] = useState(false);
  const totalChains = chains?.length || 0;
  const rows = createChainRows(chains || [], loading);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader count={totalChains} title={'Chains'} />
      <TableContainer headCols={chainsTableHead} keyPrefix={'blocks'} rows={rows} />
    </FlexGrid>
  );
};

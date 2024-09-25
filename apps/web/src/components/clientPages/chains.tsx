'use client';

import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { useChainNetwork } from '../../providers/chainNetworkProvider';
import { chainsTableHead } from '../../utils/helpers/tableHeaders';
import { createChainRows } from '../../utils/helpers/helper';
import { useState } from 'react';

export const Chains = () => {
  const { chains, nodeInfo } = useChainNetwork();
  const [loading, setLoading] = useState(false);
  const totalChains = chains?.length || 0;
  const rows = createChainRows(chains || [], loading);
  console.log(nodeInfo);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader count={totalChains} title={'Chains'} />
      <TableContainer headCols={chainsTableHead} keyPrefix={'blocks'} rows={rows} />
    </FlexGrid>
  );
};

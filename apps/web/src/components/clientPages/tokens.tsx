'use client';

import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { tokensTableHead } from '../../utils/helpers/tableHeaders';
import { createTokensRows } from '../../utils/helpers/helper';
import { useState } from 'react';
import { TokenType } from '../../utils/types';

export const Tokens = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const tokens: TokenType[] = [
    {
      tokenId: 'Token 1',
      availableBalance: '1000000000000000000',
      lockedBalances: [
        {
          amount: '1000000000000000000',
          module: 'Module 1',
        },
      ],
    },
    {
      tokenId: 'Token 2',
      availableBalance: '2000000000000000000',
      lockedBalances: [
        {
          amount: '2000000000000000000',
          module: 'Module 2',
        },
      ],
    },
    {
      tokenId: 'Token 3',
      availableBalance: '3000000000000000000',
      lockedBalances: [
        {
          amount: '3000000000000000000',
          module: 'Module 3',
        },
      ],
    },
  ];

  const rows = createTokensRows(tokens, loading);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <SectionHeader count={10} subTitle={'Overview of all tokens'} title={'Stakes'} />
      <TableContainer headCols={tokensTableHead} keyPrefix={'transactions'} rows={rows} />
    </FlexGrid>
  );
};

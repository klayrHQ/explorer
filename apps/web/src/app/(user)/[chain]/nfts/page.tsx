'use client';

import { Suspense } from 'react';
import NFTs from '../../../../components/clientPages/nfts';

export default function Page() {
  return (
    <Suspense>
      <NFTs />
    </Suspense>
  );
}

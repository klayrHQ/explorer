'use client';

import { Suspense } from 'react';
import { Chains } from '../../../../components/clientPages/chains';
export default function Page() {
  return (
    <Suspense>
      <Chains />
    </Suspense>
  );
}

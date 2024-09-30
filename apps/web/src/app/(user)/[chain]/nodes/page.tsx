'use client';

import { Suspense } from 'react';
import { Nodes } from '../../../../components/clientPages/nodes';

export default function Page() {
  return (
    <Suspense>
      <Nodes />
    </Suspense>
  );
}

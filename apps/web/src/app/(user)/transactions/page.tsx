import { Suspense } from 'react';
import { Transactions } from '../../../components/clientPages/transactions.tsx';

export default function Page() {
  return (
    <Suspense>
      <Transactions />
    </Suspense>
  );
}

import { Suspense } from 'react';
import { Accounts } from '../../../../components/clientPages/accounts';

export default function Page() {
  return (
    <Suspense>
      <Accounts />
    </Suspense>
  );
}

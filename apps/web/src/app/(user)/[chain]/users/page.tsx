import { Suspense } from 'react';
import { Users } from '../../../../components/clientPages/users';

export default function Page() {
  return (
    <Suspense>
      <Users />
    </Suspense>
  );
}

import { Suspense } from 'react';
import { Stakes } from '../../../../components/clientPages/stakes.tsx';

export default function Page() {
  return (
    <Suspense>
      <Stakes />
    </Suspense>
  );
}

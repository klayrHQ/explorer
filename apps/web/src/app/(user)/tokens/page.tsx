import { Suspense } from 'react';
import { Tokens } from '../../../components/clientPages/tokens';

export default function Page() {
  return (
    <Suspense>
      <Tokens />
    </Suspense>
  );
}

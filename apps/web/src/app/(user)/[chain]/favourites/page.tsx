import { Favourites } from '../../../../components/clientPages/favourites.tsx';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Favourites />
    </Suspense>
  );
}

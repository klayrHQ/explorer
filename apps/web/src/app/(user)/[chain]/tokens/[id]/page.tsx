import { TokenDetails } from '../../../../../components/clientPages/tokenDetails';
import { Suspense } from 'react';
export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <TokenDetails params={{ id: params.id }} />
    </Suspense>
  );
}

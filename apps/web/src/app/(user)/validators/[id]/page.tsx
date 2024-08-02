import { Suspense } from 'react';
import { ValidatorDetails } from '../../../../components/clientPages/validatorDetails';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <ValidatorDetails params={{ id: params.id }} />
    </Suspense>
  );
}

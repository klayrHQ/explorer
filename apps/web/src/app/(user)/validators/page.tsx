import { Suspense } from 'react';
import {Validators} from "../../../components/clientPages/validators.tsx";

export default function Page() {
  return (
    <Suspense>
      <Validators />
    </Suspense>
  );
}
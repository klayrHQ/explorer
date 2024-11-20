import { useSearchParams } from 'next/navigation';

export const useBasePath = () => {
  const searchParams = useSearchParams();
  return searchParams.get('app') ? `/${searchParams.get('app')}` : '/klayr_mainchain';
};

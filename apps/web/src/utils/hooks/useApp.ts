import { useSearchParams } from 'next/navigation';

export const useApp = () => {
  const searchParams = useSearchParams();
  if (searchParams.get('app')) return searchParams.get('app');

  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments[0]) return pathSegments[0];
  }

  return 'klayr_mainchain';
};

import { usePathname, useSearchParams } from 'next/navigation';
import { defaultApp } from '../constants';

export const useApp = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (searchParams.get('app')) return searchParams.get('app');

  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments[0]) return pathSegments[0];

  return defaultApp;
};

import { useSearchParams } from 'next/navigation';
import { useHostname } from './useHostname';

const DEFAULT_NETWORK = 'mainnet';

export const useNetwork = () => {
  const searchParams = useSearchParams();
  const hostname = useHostname();

  if (searchParams.get('network')) return searchParams.get('network');

  const subdomain = hostname.split('.')[0];
  if (subdomain && subdomain.endsWith('-explorer')) {
    return subdomain.split('-explorer')[0];
  }

  return DEFAULT_NETWORK;
};

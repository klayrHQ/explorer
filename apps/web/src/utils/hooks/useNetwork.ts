import { useSearchParams } from 'next/navigation';

const DEFAULT_NETWORK = 'mainnet';

export const useNetwork = () => {
  const searchParams = useSearchParams();
  if (searchParams.get('network')) return searchParams.get('network');

  if (typeof window !== 'undefined') {
    const subdomain = window.location.hostname.split('.')[0];

    if (subdomain && subdomain.endsWith('-explorer')) {
      return subdomain.split('-explorer')[0];
    }
  }

  return DEFAULT_NETWORK;
};

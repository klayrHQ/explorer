import { usePathname } from 'next/navigation';
import { useChainNetwork } from '../../providers/chainNetworkProvider.tsx';

export const getBasePath = () => {
  const { chains } = useChainNetwork();
  const pathName = usePathname();
  const firstSubDir = pathName.split('/')[1];
  const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
  return !chainMatch || firstSubDir === 'klayr-main' ? '' : `/${firstSubDir}`;
};

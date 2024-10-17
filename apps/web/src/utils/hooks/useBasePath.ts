import { usePathname } from 'next/navigation';
import {useChainNetworkStore} from "../../store/chainNetworkStore.ts";

export const useBasePath = () => {
  const chains = useChainNetworkStore((state) => state.chains);
  const pathName = usePathname();
  const firstSubDir = pathName.split('/')[1];
  const chainMatch = chains?.find((chain) => chain.chainName === firstSubDir);
  return !chainMatch || firstSubDir === 'klayr_mainchain' ? '' : `/${firstSubDir}`;
};

import { create } from 'zustand';
import { NetworkStatus } from '../utils/types.ts';
import { callGetNetworkStatus } from '../utils/api/apiCalls.tsx';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NodeStoreProps {
  nodeInfo?: NetworkStatus;
  setNodeInfo: (nodeInfo: NetworkStatus) => void;
}

export const useNodeStore = create<NodeStoreProps>((set) => {
  return {
    nodeInfo: undefined,
    setNodeInfo: (nodeInfo: NetworkStatus) => set({ nodeInfo }),
  };
});

export const useUpdateNodeInfo = () => {
  const setNodeInfo = useNodeStore((state) => state.setNodeInfo);
  const pathName = usePathname();

  useEffect(() => {
    const fetchNodeInfo = async () => {
      callGetNetworkStatus()
        .then((data) => setNodeInfo(data.data))
        .catch(() => setNodeInfo({} as NetworkStatus));
    };

    fetchNodeInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);
};

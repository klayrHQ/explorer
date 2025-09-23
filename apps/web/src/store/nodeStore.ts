import { create } from 'zustand';
import { NetworkStatus, NodeInfoType } from '../utils/types.ts';
import { callGetNetworkStatus } from '../utils/api/apiCalls.tsx';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NodeStoreProps {
  nodeInfo?: NodeInfoType;
  setNodeInfo: (nodeInfo: NodeInfoType) => void;
}

export const useNodeStore = create<NodeStoreProps>((set) => {
  return {
    nodeInfo: {} as NodeInfoType,
    setNodeInfo: (nodeInfo: NodeInfoType) => set({ nodeInfo }),
  };
});

export const useUpdateNodeInfo = () => {
  const setNodeInfo = useNodeStore((state) => state.setNodeInfo);
  const pathName = usePathname();

  useEffect(() => {
    const fetchNodeInfo = async () => {
      const data = await callGetNetworkStatus();
      setNodeInfo(data as unknown as NetworkStatus);
    };

    fetchNodeInfo();
  }, [pathName]);
};

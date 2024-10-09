import { create } from 'zustand';
import { NodeInfoType } from '../utils/types.ts';
import { callGetNodeInfo } from '../utils/api/apiCalls.tsx';

interface NodeStoreProps {
  nodeInfo?: NodeInfoType;
}

export const useNodeStore = create<NodeStoreProps>((set) => {
  const fetchNodeInfo = async () => {
    const data = await callGetNodeInfo();
    set({ nodeInfo: data as unknown as NodeInfoType });
  }

  fetchNodeInfo();

  return {
    nodeInfo: {} as NodeInfoType,
  }
});
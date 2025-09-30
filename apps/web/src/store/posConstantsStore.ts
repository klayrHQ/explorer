import { create } from 'zustand';
import { PosConstantsType } from '../utils/types.ts';
import { callGetPosConstants } from '../utils/api/apiCalls.tsx';
import { useEffect } from 'react';

interface PosConstantsStoreProps {
  posConstants?: PosConstantsType;
  setPosConstants: (posConstants: PosConstantsType) => void;
}

export const usePosConstantsStore = create<PosConstantsStoreProps>((set) => {
  return {
    posConstants: {} as PosConstantsType,
    setPosConstants: (posConstants: PosConstantsType) => set({ posConstants }),
  };
});

export const useUpdatePosConstants = () => {
  const setPosConstants = usePosConstantsStore((state) => state.setPosConstants);

  useEffect(() => {
    const fetchPosConstants = async () => {
      const data = await callGetPosConstants();
      setPosConstants(data.data);
    };

    fetchPosConstants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

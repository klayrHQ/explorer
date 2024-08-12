import { create } from 'zustand';

interface HeightStore {
  height: number;
  setHeight: (height: number) => void;
}

export const useSocketStore = create<HeightStore>((set) => {
  const setHeight = (height: number) => set(() => ({ height }));

  // TODO: implement actual websocket connection or something will see
  setInterval(() => {
    const newHeight = Math.floor(Math.random() * 1_000_000);
    setHeight(newHeight);
  }, 7000);

  return {
    height: 0,
    setHeight,
  };
});

import { create } from 'zustand';

interface AppErrorStore {
  error?: Error;
  showError: (error: Error) => void;
  clearError: () => void;
}

export const useAppErrorStore = create<AppErrorStore>((set) => ({
  error: undefined,

  showError: (error: Error) => {
    console.error(error);
    set({ error });
  },

  clearError: () => set({ error: undefined }),
}));

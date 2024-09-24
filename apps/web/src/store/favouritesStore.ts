import { FavouriteType } from '../utils/types.ts';
import { create } from 'zustand';
import { useEffect } from 'react';

interface FavouritesStore {
  favourites: FavouriteType[];
  addFavourite: (favourite: FavouriteType) => void;
  removeFavourite: (favourite: FavouriteType) => void;
  newFavourite: boolean;
  setNewFavourite: (value: boolean) => void;
  isFavourite: (favourite: FavouriteType) => boolean;
  setFavourites: (favourites: FavouriteType[]) => void; // Add setFavourites to the interface
}

// Utility function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  },
};

// Zustand store
export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
  favourites: [],
  setFavourites: (favourites) => set({ favourites }), // Implement setFavourites
  addFavourite: (favourite) =>
    set((state) => {
      const updatedFavourites = [...state.favourites, favourite];
      safeLocalStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      set({ newFavourite: true });
      return { favourites: updatedFavourites };
    }),
  removeFavourite: (favourite) =>
    set((state) => {
      const updatedFavourites = state.favourites.filter((f) => f.address !== favourite.address);
      safeLocalStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return { favourites: updatedFavourites };
    }),
  newFavourite: false,
  setNewFavourite: (value) => set({ newFavourite: value }),
  isFavourite: (favourite) => {
    const state = get();
    return state.favourites.some((f) => f.address === favourite.address);
  },
}));

// Hook to initialize favourites on the client side
export const useInitializeFavourites = () => {
  const setFavourites = useFavouritesStore((state) => state.setFavourites);

  useEffect(() => {
    const initialFavourites = getInitialFavourites();
    setFavourites(initialFavourites);
  }, [setFavourites]);
};

// Function to get initial favourites from localStorage
const getInitialFavourites = (): FavouriteType[] => {
  const storedFavourites = safeLocalStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};
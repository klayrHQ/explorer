import { FavouriteType } from '../utils/types.ts';
import { create } from 'zustand';

interface FavouritesStore {
  favourites: FavouriteType[];
  addFavourite: (favourite: FavouriteType) => void;
  removeFavourite: (favourite: FavouriteType) => void;
  newFavourite: boolean;
  setNewFavourite: (value: boolean) => void;
  isFavourite: (favourite: FavouriteType) => boolean;
}

// Utility function to safely access localStorage
/*const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
    }
  },
};*/

// Function to get initial favourites from localStorage
const getInitialFavourites = (): FavouriteType[] => {
  const storedFavourites = window.localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
  favourites: getInitialFavourites(),
  addFavourite: (favourite) =>
    set((state) => {
      const updatedFavourites = [...state.favourites, favourite];
      window.localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      set({ newFavourite: true });
      return { favourites: updatedFavourites };
    }),
  removeFavourite: (favourite) =>
    set((state) => {
      const updatedFavourites = state.favourites.filter((f) => f.address !== favourite.address);
      window.localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return { favourites: updatedFavourites };
    }),
  newFavourite: false,
  setNewFavourite: (value) => set({ newFavourite: value }),
  isFavourite: (favourite) => {
    const state = get();
    return state.favourites.some((f) => f.address === favourite.address);
  },
}));

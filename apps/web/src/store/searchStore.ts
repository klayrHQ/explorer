import { create } from 'zustand';
import { SearchResultsType } from '../utils/types';
import { useGatewayClientStore } from './clientStore';

export interface SearchQueryParams {
  search: string;
}

interface SearchStore {
  searchResults: SearchResultsType;
  setSearchResults: (results: SearchResultsType) => void;
  callSearch: (params: SearchQueryParams) => Promise<SearchResultsType>;
}

export const useSearchStore = create<SearchStore>()((set, get) => ({
  searchResults: {} as SearchResultsType,
  setSearchResults: (results: SearchResultsType) => set(() => ({ searchResults: results })),

  callSearch: async (params: SearchQueryParams): Promise<SearchResultsType> => {
    const { client } = useGatewayClientStore.getState();
    const { search } = params;
    const { setSearchResults } = get();

    try {
      const { data } = await client.get<SearchResultsType>('search', {
        params: {
          search,
        },
      });

      if (data) {
        setSearchResults(data);
        return data;
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

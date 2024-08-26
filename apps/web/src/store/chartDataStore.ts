import { create } from 'zustand';

interface ChartDataStore {
  callGetChartData: () => Promise<void>;
  chartData: { id: number; label: string; value: number }[];
  setChartData: (chartData: { id: number; label: string; value: number }[]) => void;
}

export const useChartDataStore = create<ChartDataStore>((set, get) => ({
  chartData: [],
  setChartData: (chartData) => set(() => ({ chartData })),

  callGetChartData: async () => {
    const { setChartData } = get();

    try {
      const response = await fetch('https://gateway.klayr.dev/api/v1/pos/validators/status-count');
      const data = await response.json();
      if (data) {
        const transformedData = Object.entries(data.data).map(([key, value], index) => ({
          id: index + 1,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value: value as number,
        }));
        setChartData(transformedData);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
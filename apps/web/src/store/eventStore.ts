import { create } from 'zustand';
import { EventsType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

export interface EventsQueryParams {
  height?: string;
  transactionID?: string;
}

interface EventsStore {
  events: EventsType[];
  setEvents: (events: EventsType[]) => void;
  callGetEvents: (params: EventsQueryParams) => Promise<GatewayRes<EventsType[]>>;
}

export const useEventsStore = create<EventsStore>((set, get) => ({
  events: [],
  setEvents: (events: EventsType[]) => set(() => ({ events })),

  callGetEvents: async (params: EventsQueryParams): Promise<GatewayRes<EventsType[]>> => {
    const { height, transactionID } = params;

    try {
      const { data } = await gatewayClient.get<GatewayRes<EventsType[]>>('events', {
        params: {
          height,
          transactionID,
        },
      });

      if (data) {
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

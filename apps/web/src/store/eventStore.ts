import { create } from 'zustand';
import { EventsType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

export interface EventsQueryParams {
  height?: string;
  transactionID?: string;
  senderAddress?: string;
}

interface EventsStore {
  events: EventsType[];
  setEvents: (events: EventsType[]) => void;
  callGetEvents: (params: EventsQueryParams) => Promise<void>;
}

export const useEventsStore = create<EventsStore>((set, get) => ({
  events: [],
  setEvents: (events: EventsType[]) => set(() => ({ events })),

  callGetEvents: async (params: EventsQueryParams) => {
    const { setEvents } = get();
    const { height, transactionID, senderAddress } = params;

    gatewayClient
      .get<GatewayRes<EventsType[]>>('events', {
        params: {
          height,
          transactionID,
          senderAddress,
        },
      })
      .then(({ data }) => {
        if (data?.data) {
          setEvents(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
}));

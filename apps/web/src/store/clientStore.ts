import { create } from 'zustand';
import axios, { AxiosInstance } from 'axios';

enum Networks {
  MAINNET = '00000000',
  TESTNET = '01000000',
  PEPE_WORLD = '01371337',
  SWAPTOSHI = '01555555',
}

interface GatewayClientStore {
  client: AxiosInstance;
  setBaseURL: (networkID: string) => void;
}

export const useGatewayClientStore = create<GatewayClientStore>((set) => ({
  client: axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
    timeout: 13000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  setBaseURL: (gatewayUrl: string) =>
    set((state) => {
      state.client.defaults.baseURL = gatewayUrl;
      return { client: state.client };
    }),
}));

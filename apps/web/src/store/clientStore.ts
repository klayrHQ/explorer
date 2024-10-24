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
    baseURL: 'https://gateway-mainnet.klayr.dev/api/v1/',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Methods': 'POST,GET',
    },
  }),
  setBaseURL: (gatewayUrl: string) =>
    set((state) => {
      state.client.defaults.baseURL = gatewayUrl;
      return { client: state.client };
    }),
}));

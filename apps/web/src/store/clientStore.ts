import { create } from 'zustand';
import axios, { AxiosInstance } from 'axios';

enum Networks {
  MAINNET = '00000000',
  TESTNET = '01000000',
}

// TODO: set urls when getting chains and networks
const networkUrls: { [key in Networks]: string } = {
  [Networks.MAINNET]: 'https://gateway-mainnet.klayr.dev/api/v1/',
  [Networks.TESTNET]: 'https://gateway-testnet.klayr.dev/api/v1/',
};

interface GatewayClientStore {
  network: Networks;
  client: AxiosInstance;
  setBaseURL: (networkID: string) => void;
}

export const useGatewayClientStore = create<GatewayClientStore>((set) => ({
  network: Networks.TESTNET,

  client: axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Methods': 'POST,GET',
    },
  }),
  setBaseURL: (networkID: string) =>
    set((state) => {
      const url = networkUrls[networkID as Networks];
      state.client.defaults.baseURL = url;
      state.network = networkID as Networks;
      return { client: state.client };
    }),
}));

import { create } from 'zustand';
import axios, { AxiosInstance } from 'axios';
import { serviceAPIVersion } from '../utils/constants';

interface GatewayClientStore {
  client: AxiosInstance;
  baseURL?: string;
  hostname?: string;
  setBaseURL: (gatewayUrl: string) => void;
  waitBaseURL: () => Promise<string>;
}

export const useGatewayClientStore = create<GatewayClientStore>((set, get) => {
  let resolvers: ((url: string) => void)[] = [];

  const client = axios.create({
    baseURL: undefined,
    timeout: 13000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return {
    client,
    baseURL: undefined,
    hostname: undefined,
    setBaseURL: (gatewayUrl: string) => {
      const { client } = get();
      const baseURL = `${gatewayUrl}/api/${serviceAPIVersion}/`;
      const hostname = new URL(gatewayUrl).hostname;
      client.defaults.baseURL = baseURL;
      resolvers.forEach((r) => r(baseURL));
      resolvers = [];
      set({ client, baseURL, hostname });
    },
    waitBaseURL: () => {
      const { baseURL } = get();
      if (baseURL) return Promise.resolve(baseURL);
      return new Promise<string>((resolve) => {
        resolvers.push(resolve);
      });
    },
  };
});

import { Socket } from 'socket.io-client';
import { create } from 'zustand';

interface GatewaySocketStore {
  blockchainSocket?: Socket;
  setBlockchainSocket: (socket?: Socket) => void;
  blockchainBaseURL?: string;
  rpcSocket?: Socket;
  setRpcSocket: (socket?: Socket) => void;
  rpcBaseURL?: string;
  baseWSURL?: string;
  setBaseWSURL: (wsUrl: string) => void;
  waitBaseWSURL: () => Promise<string>;
  disconnectRpcSocket: () => void;
}

export const useGatewaySocketStore = create<GatewaySocketStore>((set, get) => {
  let resolvers: ((url: string) => void)[] = [];

  return {
    blockchainBaseURL: undefined,
    setBlockchainSocket: (socket?: Socket) => {
      set({ blockchainSocket: socket });
    },
    rpcBaseURL: undefined,
    setRpcSocket: (socket?: Socket) => {
      set({ rpcSocket: socket });
    },
    baseWSURL: undefined,
    setBaseWSURL: (baseWSURL: string) => {
      const blockchainBaseURL = `${baseWSURL}/blockchain`;
      const rpcBaseURL = `${baseWSURL}/rpc-v3`;
      resolvers.forEach((r) => r(baseWSURL));
      resolvers = [];
      set({ baseWSURL, blockchainBaseURL, rpcBaseURL });
    },
    waitBaseWSURL: () => {
      const { baseWSURL } = get();
      if (baseWSURL) return Promise.resolve(baseWSURL);
      return new Promise<string>((resolve) => {
        resolvers.push(resolve);
      });
    },
    disconnectRpcSocket: () => {
      const { rpcSocket } = get();
      if (rpcSocket) {
        if (rpcSocket.connected) rpcSocket.disconnect();
        set({ rpcSocket: undefined });
      }
    },
  };
});

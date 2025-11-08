import { io, Socket } from 'socket.io-client';
import { useGatewaySocketStore } from '../../store/socketStore';
import { GatewayRes, MetaTransaction, NetworkStatus, NetworkStatusMeta } from '../types';
import { Coalescer } from './coalescer';

async function wsEmitClient<T, K extends MetaTransaction = MetaTransaction>(
  method: string,
  params: Record<string, any> = {},
): Promise<GatewayRes<T, K>> {
  const socket = await getRpcSocketClient();
  return new Promise((resolve, reject) => {
    try {
      socket.emit('request', { method, params }, (answer: { result: GatewayRes<T, K> }) => {
        resolve(answer.result);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function wsEmit<T, K extends MetaTransaction = MetaTransaction>(
  method: string,
  params: Record<string, any> = {},
): Promise<GatewayRes<T, K>> {
  return Coalescer.getInstance().coalesce<Promise<GatewayRes<T, K>>, any[]>(
    wsEmitClient,
    method,
    params,
  );
}

export async function initBlockchainSocketClient(): Promise<Socket> {
  const { waitBaseWSURL } = useGatewaySocketStore.getState();
  await waitBaseWSURL();

  const { blockchainSocket, setBlockchainSocket, blockchainBaseURL } =
    useGatewaySocketStore.getState();
  if (blockchainSocket) {
    if (!blockchainSocket.connected) blockchainSocket.connect();
    return blockchainSocket;
  }

  const newSocket = io(blockchainBaseURL, { forceNew: true, transports: ['websocket'] });
  setBlockchainSocket(newSocket);
  return newSocket;
}

export async function getRpcSocketClient(): Promise<Socket> {
  const { waitBaseWSURL } = useGatewaySocketStore.getState();
  await waitBaseWSURL();

  const { rpcSocket, setRpcSocket, rpcBaseURL } = useGatewaySocketStore.getState();
  if (rpcSocket) {
    if (!rpcSocket.connected) rpcSocket.connect();
    return rpcSocket;
  }

  const newSocket = io(rpcBaseURL, { forceNew: true, transports: ['websocket'] });
  setRpcSocket(newSocket);
  return newSocket;
}

export async function emitGetNetworkStatus(): Promise<
  GatewayRes<NetworkStatus, NetworkStatusMeta>
> {
  return wsEmit<NetworkStatus, NetworkStatusMeta>('get.network.status');
}

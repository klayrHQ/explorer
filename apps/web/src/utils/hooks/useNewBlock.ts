import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { BlockDetailsType } from '../types';
import { useGatewayClientStore } from '../../store/clientStore';

export const useNewBlock = () => {
  const [block, setBlock] = useState<BlockDetailsType>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const hostname = useGatewayClientStore((state) => state.hostname);

  useEffect(() => {
    if (!hostname) return;

    const newSocket = io(`wss://${hostname}/blockchain`, {
      transports: ['websocket'],
    });

    newSocket.on('new.block', (block: { data: [BlockDetailsType] }) => {
      setBlock(block.data[0]);
    });

    setSocket(newSocket);

    // Cleanup when component unmounts or hostname changes
    return () => {
      newSocket.disconnect();
    };
  }, [hostname]);

  return { block, setBlock, socket };
};

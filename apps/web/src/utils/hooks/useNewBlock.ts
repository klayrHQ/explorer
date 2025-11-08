import { useEffect, useState } from 'react';
import { BlockDetailsType } from '../types';
import { useBlockchainSocket } from './useBlockchainSocket';

export const useNewBlock = () => {
  const [block, setBlock] = useState<BlockDetailsType>();
  const { blockchainSocket } = useBlockchainSocket();

  useEffect(() => {
    if (!blockchainSocket) return;
    blockchainSocket.on('new.block', (block: { data: [BlockDetailsType] }) => {
      setBlock(block.data[0]);
    });
  }, [blockchainSocket]);

  return { block, setBlock };
};

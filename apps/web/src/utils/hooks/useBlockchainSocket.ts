import { useEffect } from 'react';
import { useGatewaySocketStore } from '../../store/socketStore';
import { initBlockchainSocketClient } from '../api/ws';

export const useBlockchainSocket = () => {
  const blockchainSocket = useGatewaySocketStore((state) => state.blockchainSocket);

  useEffect(() => {
    if (!blockchainSocket) {
      initBlockchainSocketClient();
      return;
    }

    // Cleanup when component unmounts or hostname changes
    return () => {
      if (blockchainSocket) {
        blockchainSocket.connected && blockchainSocket.disconnect();
        blockchainSocket.removeAllListeners();
        useGatewaySocketStore.setState({ blockchainSocket: undefined });
      }
    };
  }, [blockchainSocket]);

  return { blockchainSocket };
};

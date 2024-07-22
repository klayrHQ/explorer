'use client';
import gatewayClient from '../../network/gatewayClient';
import React, { useEffect, useState } from 'react';
import { GatewayRes, BlockDetailsType } from '../../utils/types';

export const BlockDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [block, setBlock] = useState<BlockDetailsType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlock = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<BlockDetailsType[]>>('blocks', {
          params: {
            blockID: id,
          },
        });
        console.log('data', data);
        if (data?.data) {
          setBlock(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getBlock();
  }, [id]);

  return <div></div>;
};

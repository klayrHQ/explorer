'use client';
import gatewayClient from '../../network/gatewayClient';
import React, { useEffect, useState } from 'react';
import { GatewayRes, BlockDetailsType } from '../../utils/types';
import { BlockDetailsBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';

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

  return (
    <BlockDetailsBanner
      reward={block?.reward || '0'}
      symbol="KLY"
      generatorAddress={block?.generator.address || ''}
      isFinal={block?.isFinal || false}
      numberOfTransactions={block?.numberOfTransactions || 0}
      image={BannerBG.src}
      height={block?.height || 0}
      generatorName={block?.generator.name || ''}
    />
  );
};

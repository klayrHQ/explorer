'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import { useEffect, useState } from 'react';
import { EventsType, GatewayRes, ValidatorType } from '../../utils/types';
import gatewayClient from '../../network/gatewayClient';

export const ValidatorDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [validator, setValidator] = useState<ValidatorType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getValidators = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<ValidatorType[]>>('pos/validators', {
          params: {
            address: id,
          },
        });

        if (data?.data) {
          setValidator(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getValidators();
  }, [id]);
  return (
    <div>
      <ValidatorBanner
        senderAddress={validator?.account.address || ''}
        notificationValue={validator?.rank || 0}
        image={BannerBG.src}
        senderName={validator?.account.name || ''}
        stakes={1} // TODO: Implement
        value={validator?.totalStake}
        valueSymbol="KLY"
        selfStake={validator?.selfStake || 0}
        selfStakeSymbol="KLY"
        capacity={233} // TODO: Implement
        status={validator?.status || ''}
        blockTime={2} // TODO: Implement
      />
    </div>
  );
};

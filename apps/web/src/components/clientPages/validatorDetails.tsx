'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import { useEffect, useState } from 'react';
import { useValidatorStore } from '../../store/validatorStore';
import { TabButtons, FlexGrid } from '@repo/ui/atoms';

export const ValidatorDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const validator = useValidatorStore((state) => state.validator);
  const callGetValidators = useValidatorStore((state) => state.callGetValidators);

  // TODO: loading not used?
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    callGetValidators({ address: id }).finally(() => setLoading(false));
  }, [id]);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: <div></div>,
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: <div></div>,
    },
    {
      value: 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: <div></div>,
    },
    {
      value: 4,
      label: 'Blocks',
      icon: 'Cube',
      content: <div>Blocks</div>,
    },
    {
      value: 5,
      label: 'Events',
      icon: 'List',
      content: <div></div>,
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
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
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

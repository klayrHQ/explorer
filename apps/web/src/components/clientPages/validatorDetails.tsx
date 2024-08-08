'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import { useEffect, useState } from 'react';
import { useValidatorStore } from '../../store/validatorStore';
import { TabButtons, FlexGrid, Currency, Typography } from '@repo/ui/atoms';
import { SectionHeader, TableContainer, DetailsSection } from '@repo/ui/organisms';
import { DataType } from '@repo/ui/types';

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

  const details = [
    {
      label: {
        label: 'Validator ID',
      },
      value: validator?.account.address,
    },
    {
      label: {
        label: 'Public Key',
      },
      value: validator?.account.publicKey,
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Nonce',
      },
      value: ' - ',
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Token',
      },
      value: 'KLY',
    },
    /*{
      label: {
        label: 'Active Chain',
      },
      value: (
        <ChainToChainComponent
          from={{ logo: '/', name: 'Klayr-mainchain' }}
          to={{ logo: '/', name: 'Tokenfactory' }}
          imageComponent={DefaultImageComponent}
        />
      ),
    },*/
    {
      label: {
        label: 'Available tokens',
      },
      value: (
        <Currency
          amount={validator?.totalStake || 0}
          className={'truncate max-w-full'}
          decimals={2}
          symbol={'KLY'}
        />
      ),
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Locked tokens',
      },
      value: <Currency amount={''} className={'truncate max-w-full'} decimals={2} symbol={'KLY'} />,
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Claimable rewards',
      },
      value: ' - ',
    },
    {
      label: {
        label: 'Validator weight',
      },
      value: (
        <Currency
          amount={validator?.validatorWeight || 0}
          className={'truncate max-w-full'}
          symbol={'KLY'}
        />
      ),
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Stake capacity',
      },
      value: <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />,
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Total received stake',
      },
      value: <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />,
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Self stake',
      },
      value: (
        <Currency
          amount={validator?.selfStake || 0}
          className={'truncate max-w-full'}
          symbol={'KLY'}
        />
      ),
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Commission',
      },
      value: (
        <div className="flex items-center gap-1">
          <Currency
            amount={validator?.commission || 0}
            className={'truncate max-w-full'}
            symbol={'KLY'}
            decimals={5}
          />
          {'|'}
          <Typography variant={'paragraph-sm'}>{'- %'}</Typography>
        </div>
      ),
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Last commission increase',
      },
      value: validator?.lastCommissionIncreaseHeight,
    },
    {
      label: {
        label: 'Total rewards',
      },
      value: (
        <div className="flex items-center gap-1">
          <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />
          {'|'}
          <Typography variant={'paragraph-sm'}>{'- %'}</Typography>
        </div>
      ),
      mobileWidth: 'half',
    },
    {
      label: {
        label: ' Total self stake rewards',
      },
      value: (
        <div className="flex items-center gap-1">
          <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />
          {'|'}
          <Typography variant={'paragraph-sm'}>{'- %'}</Typography>
        </div>
      ),
      mobileWidth: 'half',
    },
    {
      label: {
        label: 'Dynamic block rewards',
      },
      value: ' - ',
    },
    {
      label: {
        label: 'Last generated heights',
      },
      value: validator?.lastGeneratedHeight,
    },
    {
      label: {
        label: 'Max height generated',
      },
      value: ' - ',
    },
    {
      label: {
        label: 'Max height prevoted',
      },
      value: ' - ',
    },
    {
      label: {
        label: 'Generated blocks',
      },
      value: validator?.generatedBlocks,
    },
    {
      label: {
        label: 'Missed blocks',
      },
      value: ' - ',
    },
    {
      label: {
        label: 'Consecutive missed blocks',
      },
      value: validator?.consecutiveMissedBlocks,
    },
    {
      label: {
        label: 'Ratio blocks forged/missed',
      },
      value: ' -  / - ',
    },
    {
      label: {
        label: 'Punishments',
      },
      value: ' - ',
    },
    {
      label: {
        label: 'Blockchain version',
      },
      value: ' - ',
    },
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection
          data={details}
          json={validator as unknown as DataType}
          title={'Transaction Details'}
        />
      ),
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={''}
            title={`${validator?.account.name} transactions`}
            titleSizeNotLink={'h5'}
          />
        </FlexGrid>
      ),
    },
    {
      value: 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={''}
            title={`${validator?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
        </FlexGrid>
      ),
    },
    {
      value: 4,
      label: 'Blocks',
      icon: 'Cube',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={''}
            title={`${validator?.account.name}'s blocks`}
            titleSizeNotLink={'h5'}
          />
        </FlexGrid>
      ),
    },
    {
      value: 5,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={''}
            title={`${validator?.account.name}'s events`}
            titleSizeNotLink={'h5'}
          />
        </FlexGrid>
      ),
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
      <div className="desktop:hidden">
        <TabButtons tabs={tabs} width="full" padding="6" showLabel={false} />
      </div>
      <div className="hidden desktop:flex">
        <TabButtons tabs={tabs} />
      </div>
    </FlexGrid>
  );
};

'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { DetailsSection } from '@repo/ui/organisms';
import { createDetails } from '../../utils/helpers/dataHelpers';
import BannerBG from '../../assets/images/bannerBG.png';
import { Typography } from '@repo/ui/atoms';
import { ChainDetailsBanner } from '@repo/ui/organisms';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { FormattedValue } from '../formattedValue.tsx';

export const ChainDetails = ({ params }: { params: { id: string } }) => {
  const chains = useChainNetworkStore((state) => state.chains);
  const mockChainData = chains?.[0];

  const details = [
    createDetails(
      'Description',
      <Typography variant={'paragraph-sm'}>{'Here is the description of the chain'}</Typography>,
    ),
    createDetails(
      'Block time',
      <Typography variant={'paragraph-sm'}>{'block time'}</Typography>,
      'half',
    ),
    createDetails(
      'Height',
      <FormattedValue
        value={213423345}
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
      />,
    ),
    createDetails(
      'Finalized height',
      <FormattedValue
        value={256234123}
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
      />,
    ),
    createDetails(
      'Blocks until finalized',
      <FormattedValue
        value={2453}
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
      />,
    ),
    createDetails('Network version', <Typography variant={'paragraph-sm'}>{'3.0'}</Typography>),
    createDetails('Network identifier', <Typography variant={'paragraph-sm'}>{'KLY'}</Typography>),
    createDetails('Max payload length', <Typography variant={'paragraph-sm'}>{'7'}</Typography>),
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <ChainDetailsBanner
        chain={mockChainData}
        image={BannerBG.src}
        locked={0}
        logo={mockChainData?.logo ?? ''}
        status={'Active'}
      />
      <DetailsSection data={details} title="Chain details" />
    </FlexGrid>
  );
};

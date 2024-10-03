'use client';

import { FlexGrid } from '@repo/ui/atoms';
import { DetailsSection } from '@repo/ui/organisms';
import { useChainNetwork } from '../../providers/chainNetworkProvider';
import { createDetails } from '../../utils/helpers/dataHelpers';
import BannerBG from '../../assets/images/bannerBG.png';
import { Typography } from '@repo/ui/atoms';
import { ChainDetailsBanner } from '@repo/ui/organisms';
export const ChainDetails = ({ params }: { params: { id: string } }) => {
  const { chains, nodeInfo } = useChainNetwork();
  const mockChainData = chains?.[0];

  const details = [
    createDetails(
      'Description',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{'Here is the description of the chain'}</Typography>
      </div>,
    ),
    createDetails(
      'Block time',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{'block time'}</Typography>
      </div>,
      'half',
    ),
    createDetails(
      'Height',
      <div>
        <Typography variant={'paragraph-sm'}>{'213.423.345'}</Typography>
      </div>,
    ),
    createDetails(
      'Finalized height',
      <div>
        <Typography variant={'paragraph-sm'}>{'256.234.123'}</Typography>
      </div>,
    ),
    createDetails(
      'Blocks until finalized',
      <div>
        <Typography variant={'paragraph-sm'}>{'2453.454'}</Typography>
      </div>,
    ),
    createDetails(
      'Network version',
      <div>
        <Typography variant={'paragraph-sm'}>{'3.0'}</Typography>
      </div>,
    ),
    createDetails(
      'Network identifier',
      <div>
        <Typography variant={'paragraph-sm'}>{'KLY'}</Typography>
      </div>,
    ),
    createDetails(
      'Max payload length',
      <div>
        <Typography variant={'paragraph-sm'}>{'7'}</Typography>
      </div>,
    ),
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

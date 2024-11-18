'use client';
import { FlexGrid, ImageContainer, Link, StatusBadge } from '@repo/ui/atoms';
import { DetailsSection } from '@repo/ui/organisms';
import { createDetails } from '../../utils/helpers/dataHelpers';
import BannerBG from '../../assets/images/bannerBG.png';
import { Typography } from '@repo/ui/atoms';
import { ChainDetailsBanner } from '@repo/ui/organisms';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { FormattedValue } from '../formattedValue.tsx';
import Placeholder from '../../assets/images/placeholder.png';

export const ChainDetails = ({ params }: { params: { id: string } }) => {
  const chains = useChainNetworkStore((state) => state.chains);
  const chain = chains?.find((chain) => chain.chainID === params.id);

  const serviceURLDetails = chain?.serviceURLs
    ? chain?.serviceURLs?.map((serviceURL) => {
        return (
          createDetails(
            'http',
            <FormattedValue
              value={serviceURL.http}
              format={'string'}
              copy
              typographyProps={{ color: 'onBackgroundHigh' }}
            />,
          ),
          createDetails(
            'ws',
            <FormattedValue
              value={serviceURL.ws}
              format={'string'}
              copy
              typographyProps={{ color: 'onBackgroundHigh' }}
            />,
          )
        );
      })
    : [];

  const details = [
    createDetails(
      'Chain ID',
      <FormattedValue
        format={'string'}
        value={chain?.chainID ?? ''}
        copy
        typographyProps={{ color: 'onBackgroundHigh' }}
      />,
    ),
    createDetails(
      'Chain Name',
      <Typography variant={'paragraph-sm'}>{chain?.chainName}</Typography>,
    ),
    createDetails(
      'Display Name',
      <Typography variant={'paragraph-sm'}>{chain?.displayName}</Typography>,
    ),
    createDetails(
      'Description',
      <Typography variant={'paragraph-sm'}>{chain?.description ?? '-'}</Typography>,
    ),
    createDetails(
      'Chain Icon',
      <ImageContainer
        alt={chain?.displayName ?? chain?.chainName ?? ''}
        src={chain?.logo.png ?? chain?.logo.svg ?? Placeholder.src}
        variant={'avatar'}
      />,
    ),
    createDetails('Status', <StatusBadge status={chain?.status ?? 'inactive'} />),
    createDetails(
      'Network Type',
      <Typography variant={'paragraph-sm'}>{chain?.networkType}</Typography>,
    ),
    createDetails(
      'Project Page',
      chain?.projectPage ? (
        <Link href={chain?.projectPage} outgoing>
          <Typography className={'underline'} variant={'paragraph-sm'} link>
            {chain?.projectPage}
          </Typography>
        </Link>
      ) : (
        <Typography variant={'paragraph-sm'}>{'-'}</Typography>
      ),
    ),
    createDetails(
      'Genesis URL',
      chain?.genesisURL ? (
        <Link href={chain?.genesisURL} outgoing>
          <Typography className={'underline'} variant={'paragraph-sm'} link>
            {chain?.genesisURL}
          </Typography>
        </Link>
      ) : (
        <Typography variant={'paragraph-sm'}>{'-'}</Typography>
      ),
    ),
    createDetails(
      'Service URLs',
      <FlexGrid direction={'col'} gap={'md'}>
        <FormattedValue
          value={chain?.serviceURLs[0]?.http}
          format={'string'}
          copy
          typographyProps={{ color: 'onBackgroundHigh' }}
        />
        <FormattedValue
          value={chain?.serviceURLs[0]?.ws}
          format={'string'}
          copy
          typographyProps={{ color: 'onBackgroundHigh' }}
        />
      </FlexGrid>,
    ),
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <ChainDetailsBanner
        chain={chain}
        image={BannerBG.src}
        locked={0}
        logo={chain?.logo.png ?? chain?.logo.svg ?? Placeholder.src}
        status={'Active'}
      />
      <DetailsSection data={details} title="Chain details" />
    </FlexGrid>
  );
};

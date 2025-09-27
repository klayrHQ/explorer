'use client';

import { useRouter } from 'next/navigation';
import { Currency, FlexGrid, ImageContainer, Link, StatusBadge } from '@repo/ui/atoms';
import { DetailsSection } from '@repo/ui/organisms';
import { createDetails } from '../../utils/helpers/dataHelpers';
import BannerBG from '../../assets/images/bannerBG.png';
import { Typography } from '@repo/ui/atoms';
import { ChainDetailsBanner } from '@repo/ui/organisms';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { FormattedValue } from '../formattedValue.tsx';
import Placeholder from '../../assets/images/placeholder.png';
import { useCallback, useEffect, useState } from 'react';
import { AppsType } from '../../utils/types.ts';
import { debounce } from 'lodash';
import { callGetApps } from '../../utils/api/apiCalls.tsx';

export const ChainDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const chains = useChainNetworkStore((state) => state.chains);
  const chainMeta = chains?.find((chain) => chain.chainID === params.id);
  const [chainApp, setChainApp] = useState<AppsType>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async () => {
      try {
        const response = await callGetApps({ chainID: params.id });
        setChainApp(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainMeta]);

  const serviceURLDetails = chainMeta?.serviceURLs
    ? chainMeta?.serviceURLs?.map((serviceURL) => {
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
        value={chainMeta?.chainID ?? '-'}
        copy
        typographyProps={{ color: 'onBackgroundHigh' }}
      />,
    ),
    createDetails(
      'Chain Name',
      <Typography variant={'paragraph-sm'}>{chainMeta?.chainName ?? '-'}</Typography>,
    ),
    createDetails(
      'Display Name',
      <Typography variant={'paragraph-sm'}>{chainMeta?.displayName ?? '-'}</Typography>,
    ),
    createDetails(
      'Description',
      <Typography variant={'paragraph-sm'}>{chainMeta?.description ?? '-'}</Typography>,
      undefined,
      true,
    ),
    createDetails(
      'Chain Icon',
      <ImageContainer
        alt={chainMeta?.displayName ?? chainMeta?.chainName ?? ''}
        src={chainMeta?.logo.png ?? chainMeta?.logo.svg ?? Placeholder.src}
        variant={'avatar'}
      />,
    ),
    createDetails(
      'Total Locked',
      <Currency amount={Number(chainApp?.escrowedKLY)} symbol={'KLY'} />,
    ),
    createDetails('Status', <StatusBadge status={chainMeta?.status ?? 'inactive'} />),
    createDetails(
      'Network',
      <Typography variant={'paragraph-sm'}>{chainMeta?.networkType ?? '-'}</Typography>,
    ),
    createDetails(
      'Project Page',
      chainMeta?.projectPage ? (
        <Link href={chainMeta?.projectPage} outgoing>
          <Typography className={'underline'} variant={'paragraph-sm'} link>
            {chainMeta?.projectPage}
          </Typography>
        </Link>
      ) : (
        <Typography variant={'paragraph-sm'}>{'-'}</Typography>
      ),
    ),
    createDetails(
      'Genesis URL',
      chainMeta?.genesisURL ? (
        <Link href={chainMeta?.genesisURL} outgoing>
          <Typography className={'underline'} variant={'paragraph-sm'} link>
            {chainMeta?.genesisURL}
          </Typography>
        </Link>
      ) : (
        <Typography variant={'paragraph-sm'}>{'-'}</Typography>
      ),
    ),
    createDetails(
      'Service URLs',
      chainMeta?.serviceURLs && chainMeta?.serviceURLs.length > 0 ? (
        <FlexGrid direction={'col'} gap={'md'}>
          <FormattedValue
            value={chainMeta?.serviceURLs[0]?.http}
            format={'string'}
            copy
            typographyProps={{ color: 'onBackgroundHigh' }}
          />
          <FormattedValue
            value={chainMeta?.serviceURLs[0]?.ws}
            format={'string'}
            copy
            typographyProps={{ color: 'onBackgroundHigh' }}
          />
        </FlexGrid>
      ) : (
        <Typography variant={'paragraph-sm'}>{'-'}</Typography>
      ),
    ),
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <ChainDetailsBanner
        onBack={() => router.back()}
        chain={chainMeta}
        image={BannerBG.src}
        locked={Number(chainApp?.escrowedKLY)}
        logo={chainMeta?.logo.png ?? chainMeta?.logo.svg ?? Placeholder.src}
        status={'Active'}
      />
      <DetailsSection data={details} title="Chain details" />
    </FlexGrid>
  );
};

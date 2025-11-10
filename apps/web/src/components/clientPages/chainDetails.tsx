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
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { ChainType } from '@repo/ui/types';

export const ChainDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const chains = useChainNetworkStore((state) => state.chains);
  const [loading, setLoading] = useState<boolean>(true);
  const [chainApp, setChainApp] = useState<AppsType>();
  const [chainMeta, setChainMeta] = useState<ChainType>();
  const basePath = useBasePath();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(basePath + '/chains');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async () => {
      try {
        const response = await callGetApps({ chainID: params.id });
        const chainMetaData = chains?.find((chain) => chain.chainID === params.id);
        setChainApp(response.data[0]);
        setChainMeta(chainMetaData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }, 300),
    [chains],
  );

  useEffect(() => {
    if (chains && chains.length) {
      fetchData();
    }
  }, [fetchData, chains]);

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
          {chainMeta.serviceURLs.map((serviceUrl) => (
            <>
              <FormattedValue
                key={`service-url-${serviceUrl.http}`}
                value={serviceUrl.http}
                format={'string'}
                copy
                typographyProps={{ color: 'onBackgroundHigh' }}
              />
              <FormattedValue
                value={serviceUrl.ws}
                format={'string'}
                copy
                typographyProps={{ color: 'onBackgroundHigh' }}
              />
            </>
          ))}
        </FlexGrid>
      ) : (
        <Typography variant={'paragraph-sm'}>{'-'}</Typography>
      ),
    ),
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <ChainDetailsBanner
        onBack={handleBack}
        chain={chainMeta}
        image={BannerBG.src}
        locked={Number(chainApp?.escrowedKLY)}
        logo={chainMeta?.logo.png ?? chainMeta?.logo.svg ?? Placeholder.src}
        status={'Active'}
        loading={loading}
      />
      <DetailsSection loading={loading} data={details} title="Chain details" />
    </FlexGrid>
  );
};

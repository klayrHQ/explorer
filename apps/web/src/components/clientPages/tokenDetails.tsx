'use client';

import { useRouter } from 'next/navigation';
import { useChainNetworkStore } from '../../store/chainNetworkStore';
import {
  FlexGrid,
  TabButtons,
  BannerFrame,
  Typography,
  Icon,
  ImageContainer,
  SkeletonComponent,
} from '@repo/ui/atoms';
import { ImageName } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import { DetailsSection } from '@repo/ui/organisms';
import { useBasePath } from '../../utils/hooks/useBasePath';
import { useEffect, useMemo, useState } from 'react';
import Blank from '../../assets/images/blank.png';

export const TokenDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const token = useChainNetworkStore((state) => state.tokens).find(
    (token) => token.tokenID === params.id,
  );
  const chains = useChainNetworkStore((state) => state.chains);
  const chainLogo = useMemo(
    () => chains?.find((chain) => chain.chainID === token?.chainID)?.logo,
    [chains, token],
  );
  const displayName = useMemo(
    () => chains?.find((chain) => chain.chainID === token?.chainID)?.displayName,
    [chains, token],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const basePath = useBasePath();

  useEffect(() => {
    if (token && chains && chainLogo && displayName) {
      setLoading(false);
    }
  }, [chainLogo, chains, displayName, token]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(basePath + '/tokens');
    }
  };

  const tokenWithChainData = { ...token, chainLogo, displayName };

  const details = [
    {
      label: { label: 'Name' },
      value: tokenWithChainData?.tokenName,
    },
    {
      label: { label: 'Symbol' },
      value: tokenWithChainData?.symbol,
    },
    {
      label: { label: 'Chain Name' },
      value: tokenWithChainData?.chainLogo?.png ? (
        <ImageName
          name={tokenWithChainData.displayName ?? tokenWithChainData.chainName ?? ''}
          imageUrl={tokenWithChainData.chainLogo.png}
        />
      ) : (
        '-'
      ),
    },
    {
      label: { label: 'Chain ID' },
      value: tokenWithChainData?.chainID,
    },
    {
      label: { label: 'Token ID' },
      value: tokenWithChainData?.tokenID,
    },
    {
      label: { label: 'Description' },
      value: tokenWithChainData?.description,
    },
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: <DetailsSection loading={loading} data={details} />,
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <BannerFrame image={BannerBG}>
        <div className="flex items-center gap-2 ">
          <Icon
            onClick={handleBack}
            className="hover:-translate-x-0.5 cursor-pointer transition-transform"
            color="white"
            icon="ArrowLeft"
          />
          <div className="w-10 h-10 aspect-square rounded-full">
            <ImageContainer
              src={tokenWithChainData?.logo?.png ?? Blank.src}
              alt={tokenWithChainData?.tokenName ?? 'Token logo'}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            {loading ? (
              <SkeletonComponent width={'32'} height={'6'} className={'my-1'} />
            ) : (
              <Typography fontWeight="bold" variant={'h3'}>
                {tokenWithChainData?.tokenName}
              </Typography>
            )}
            {loading ? (
              <SkeletonComponent width={'24'} height={'4'} className={'my-1'} />
            ) : (
              <Typography color="onBackgroundMedium" variant={'caption'}>
                {tokenWithChainData?.symbol}
              </Typography>
            )}
          </div>
        </div>
      </BannerFrame>
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

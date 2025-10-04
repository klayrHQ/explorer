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
} from '@repo/ui/atoms';
import { ImageName } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';
import { DetailsSection } from '@repo/ui/organisms';
import { useBasePath } from '../../utils/hooks/useBasePath';

export const TokenDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const token = useChainNetworkStore((state) => state.tokens).find(
    (token) => token.tokenID === params.id,
  );
  const chains = useChainNetworkStore((state) => state.chains);
  const chainLogo = chains?.find((chain) => chain.chainID === token?.chainID)?.logo;
  const displayName = chains?.find((chain) => chain.chainID === token?.chainID)?.displayName;
  const basePath = useBasePath();

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
      content: <DetailsSection data={details} />,
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
            {tokenWithChainData?.logo?.png && (
              <ImageContainer
                src={tokenWithChainData.logo.png}
                alt={tokenWithChainData.tokenName ?? 'Token logo'}
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col">
            <Typography fontWeight="bold" variant={'h3'}>
              {tokenWithChainData?.tokenName}
            </Typography>
            <Typography color="onBackgroundMedium" variant={'caption'}>
              {tokenWithChainData?.symbol}
            </Typography>
          </div>
        </div>
      </BannerFrame>
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

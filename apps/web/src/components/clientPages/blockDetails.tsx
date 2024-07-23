'use client';
import gatewayClient from '../../network/gatewayClient';
import React, { useEffect, useState } from 'react';
import { GatewayRes, BlockDetailsType } from '../../utils/types';
import {BlockDetailsBanner, DetailsSection, SectionHeader, TableContainer} from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import {Currency, DateComponent, FlexGrid, TabButtons, Typography, UserAccountCard} from "@repo/ui/atoms";

export const BlockDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [block, setBlock] = useState<BlockDetailsType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlock = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<BlockDetailsType[]>>('blocks', {
          params: {
            blockID: id,
          },
        });
        console.log('data', data);
        if (data?.data) {
          setBlock(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getBlock();
  }, [id]);

  const details = [
    {
      label: {
        label: 'Block ID',
      },
      value: block?.id,
    },
    {
      label: {
        label: 'Block Height',
      },
      value: block?.height,
    },
    {
      label: {
        label: 'Date',
      },
      value: block?.timestamp ? (
        <DateComponent timestamp={block?.timestamp * 1000} variant={'full'} />
      ) : (
        ''
      ),
    },
    {
      label: {
        label: 'Generator',
      },
      value: (
        <UserAccountCard
          address={block?.generator?.address ?? ''}
          name={block?.generator?.name}
        />
      ),
    },
    {
      label: {
        label: 'Seed reveal',
      },
      //todo get seed reveal from data when available
      value: block?.validatorsHash,
    },
    {
      label: {
        label: 'Transactions',
      },
      value: block?.numberOfTransactions,
    },
    {
      label: {
        label: 'Events',
      },
      //todo get events from data when available
      value: 0,
    },
    {
      label: {
        label: 'Assets',
      },
      value: block?.numberOfAssets,
    },
    {
      label: {
        label: 'Reward',
      },
      value: block?.reward ? (
        <Currency
          amount={block.reward}
          className={'truncate max-w-full'}
          decimals={4}
          marketValue={undefined}
          symbol={'KLY'}
        />
      ) : '-',
    },
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: <DetailsSection data={details} title={'Block Details'} />,
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'List',
      content: 'Transactions',
    },
    {
      value: 3,
      label: 'Events',
      icon: 'List',
      content: 'Events',
    },
  ];

  return (
    <FlexGrid direction={"col"} gap={'5xl'} >
      <BlockDetailsBanner
        reward={block?.reward || '0'}
        symbol="KLY"
        generatorAddress={block?.generator.address || ''}
        isFinal={block?.isFinal || false}
        numberOfTransactions={block?.numberOfTransactions || 0}
        image={BannerBG.src}
        height={block?.height || 0}
        generatorName={block?.generator.name || ''}
      />
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

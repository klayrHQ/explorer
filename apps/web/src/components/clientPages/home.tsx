'use client';
import { NewsCardGrid, PerformanceSection } from '@repo/ui/organisms';
import {
  performanceStatsSelectOptions,
  newsTagColors,
  currencies,
} from '../../utils/constants.tsx';
import { FlexGrid, SkeletonComponent } from '@repo/ui/atoms';
import { use, useEffect, useState } from 'react';
import { formatDate, cleanText } from '../../utils/helpers/dataHelpers.tsx';
import { NewsCardPropsArray, NewsCardProps } from '@repo/ui/types';
import { Currency } from '../currency.tsx';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { tokenSummaryStore } from '../../store/tokenSummaryStore.ts';

export const Home = () => {
  const [news, setNews] = useState<NewsCardPropsArray>([]);
  const [statsVS, setStatsVS] = useState<string>('lastMonth');
  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const currentNetwork = useChainNetworkStore((state) => state.currentNetwork);
  const currentChain = useChainNetworkStore((state) => state.currentChain);

  const { tokenSummary, fetchTokenSummary } = tokenSummaryStore((state) => ({
    tokenSummary: state.tokenSummary,
    fetchTokenSummary: state.fetchTokenSummary,
  }));

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch('https://klayr.xyz/wp-json/wp/v2/posts?per_page=3', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        const transformedData = await Promise.all(
          data.map(async (item: any) => {
            const badges = item.class_list
              .filter((tagPrefix: string) => tagPrefix.startsWith('tag-'))
              .map((tag: string) => tag.replace('tag-', ''))
              .map((tag: string) => ({
                colorVariant: newsTagColors[tag] || 'lobster',
                label: tag,
              }));

            return {
              badges,
              author: item.yoast_head_json.author,
              date: formatDate(item.date),
              title: cleanText(item.title.rendered),
              description: cleanText(item.excerpt.rendered).substring(0, 200),
              src: item.yoast_head_json.og_image[0].url,
              alt: cleanText(item.title.rendered),
              link: item.link,
            } as NewsCardProps;
          }),
        );

        setNews(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    setLoadingStats(true);
    fetchTokenSummary().finally(() => setLoadingStats(false));
  }, [currentChain, currentNetwork, fetchTokenSummary]);

  let statsVSString;

  switch (statsVS) {
    case 'oneHourAgo':
      statsVSString = 'vs one hour ago';
      break;
    case 'yesterday':
      statsVSString = 'vs yesterday';
      break;
    case 'lastMonth':
      statsVSString = 'vs last month';
      break;
    case 'lastWeek':
      statsVSString = 'vs last week';
      break;
    case 'lastYear':
      statsVSString = 'vs last year';
      break;
    default:
      statsVSString = 'vs last month';
      break;
  }

  const performanceStatsArray = [
    {
      title: 'Market Cap',
      value: loadingStats ? (
        <SkeletonComponent style={{ height: '28px' }} />
      ) : (
        <Currency amount={tokenSummary?.marketCap ?? 0} />
      ),
      percentage: '20%',
      statsVS: statsVSString,
      trend: true,
    },
    {
      title: 'Total Accounts',
      value: loadingStats ? (
        <SkeletonComponent style={{ height: '28px' }} />
      ) : (
        (tokenSummary?.totalAccounts ?? 0).toLocaleString()
      ),
      percentage: '9.3%',
      statsVS: statsVSString,
      trend: false,
    },
    {
      title: 'Total Transactions',
      value: loadingStats ? (
        <SkeletonComponent style={{ height: '28px' }} />
      ) : (
        (tokenSummary?.totalTransactions ?? 0).toLocaleString()
      ),
      percentage: '20%',
      statsVS: statsVSString,
      trend: true,
    },
    {
      title: 'Total Value Locked',
      value: loadingStats ? (
        <SkeletonComponent style={{ height: '28px' }} />
      ) : (
        <Currency amount={tokenSummary?.totalValueLocked ?? 0} />
      ),
      percentage: '9.3%',
      statsVS: statsVSString,
      trend: false,
    },
  ];

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'4xl'}>
      <PerformanceSection
        href={'#'}
        options={performanceStatsSelectOptions}
        setStatsVS={setStatsVS}
        stats={performanceStatsArray}
      />
      <NewsCardGrid href={'https://klayr.xyz/blog'} newsCards={news} />
    </FlexGrid>
  );
};

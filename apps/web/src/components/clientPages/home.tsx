'use client';
import { NewsCardGrid, PerformanceSection } from '@repo/ui/organisms';
import {
  performanceStatsSelectOptions,
  newsTagColors,
  currencies,
} from '../../utils/constants.tsx';
import { Currency, FlexGrid, SkeletonComponent } from '@repo/ui/atoms';
import { useEffect, useState } from 'react';
import { formatDate, cleanText } from '../../utils/helpers/dataHelpers.tsx';
import { NewsCardPropsArray, NewsCardProps } from '@repo/ui/types';
import { callGetTokenSummary } from '../../utils/api/apiCalls.tsx';
import { PerfomanceStatsType } from '../../utils/types.ts';
import { useChainNetwork } from '../../providers/chainNetworkProvider.tsx';

export const Home = () => {
  const [news, setNews] = useState<NewsCardPropsArray>([]);
  const [performanceStats, setPerformanceStats] = useState<PerfomanceStatsType>();
  const [statsVS, setStatsVS] = useState<string>('lastMonth');
  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const { currentNetwork, currentChain } = useChainNetwork();

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
    callGetTokenSummary()
      .then((data) => {
        const tokenSummary = data.data;
        const marketCap = tokenSummary.totalSupply.reduce(
          (acc, token) => acc + parseInt(token.totalSupply),
          0,
        );
        const totalValueLocked = tokenSummary.escrowedAmounts.reduce(
          (acc, token) => acc + parseInt(token.amount),
          0,
        );

        setPerformanceStats({
          marketCap: marketCap,
          totalAccounts: tokenSummary.totalAccounts,
          totalTransactions: tokenSummary.totalTransactions,
          totalValueLocked: totalValueLocked,
        });
        console.log(data.data);
      })
      .finally(() => setLoadingStats(false));
  }, [currentChain, currentNetwork]);

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
        <Currency amount={performanceStats?.marketCap ?? 0} symbol={currencies[0].symbol} />
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
        (performanceStats?.totalAccounts ?? 0)
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
        (performanceStats?.totalTransactions ?? 0)
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
        <Currency amount={performanceStats?.totalValueLocked ?? 0} symbol={currencies[0].symbol} />
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

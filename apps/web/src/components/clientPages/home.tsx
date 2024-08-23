'use client';
import { NewsCardGrid, PerformanceSection } from '@repo/ui/organisms';
import {
  newsItems,
  performanceStats,
  performanceStatsSelectOptions,
} from '../../utils/constants.tsx';
import { FlexGrid } from '@repo/ui/atoms';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dataHelpers.tsx';

export const Home = () => {
  const [news, setNews] = useState([]);

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
        const transformedData = data.map((item: any) => ({
          badges: [
            { colorVariant: 'voltDark', label: 'Development' },
            { colorVariant: 'azuleDark', label: 'Marketing' },
            { colorVariant: 'tulipDark', label: 'Blockchain' },
          ],
          author: item.yoast_head_json.author,
          date: formatDate(item.date),
          title: item.title.rendered,
          description: item.excerpt.rendered,
          src: item.yoast_head_json.og_image[0].url,
          alt: item.title.rendered,
          link: item.link,
        }));
        setNews(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    getNews();
  }, []);

  console.log('News:', news);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'4xl'}>
      <PerformanceSection
        href={'#'}
        options={performanceStatsSelectOptions}
        stats={performanceStats}
      />
      <NewsCardGrid href={'https://klayr.xyz/blog'} newsCards={news} />
    </FlexGrid>
  );
};

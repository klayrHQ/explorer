'use client';
import { NewsCardGrid, PerformanceSection } from '@repo/ui/organisms';
import {
  performanceStats,
  performanceStatsSelectOptions,
  newsTagColors,
} from '../../utils/constants.tsx';
import { FlexGrid } from '@repo/ui/atoms';
import { useEffect, useState } from 'react';
import { formatDate, cleanText } from '../../utils/helpers/dataHelpers.tsx';
import { NewsCardPropsArray, NewsCardProps } from '@repo/ui/types';

export const Home = () => {
  const [news, setNews] = useState<NewsCardPropsArray>([]);

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

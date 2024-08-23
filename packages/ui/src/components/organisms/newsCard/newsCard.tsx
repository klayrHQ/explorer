import { NewsCardImage, BadgeGroup } from '../../atoms';
import { NewsTextContent } from '../../molecules';
import { ColorType } from '../../../types/types';
import Link from 'next/link';

export interface NewsCardProps {
  badges: { colorVariant?: ColorType; label: string }[];
  author: string;
  date: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  link: string;
}

export const NewsCard = ({
  badges,
  author,
  date,
  title,
  description,
  src,
  alt,
  link,
}: NewsCardProps) => {
  return (
    <Link href={link}>
      <div className="flex flex-col w-full min-h-newsCardContainerMobileHeight desktop:min-h-newsCardContainerHeight group hover:cursor-pointer">
        <NewsCardImage alt={alt} src={src} />
        <NewsTextContent author={author} date={date} description={description} title={title} />
        <BadgeGroup badges={badges} />
      </div>
    </Link>
  );
};

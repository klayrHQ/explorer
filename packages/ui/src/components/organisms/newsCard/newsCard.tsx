import { NewsCardImage, BadgeGroup, Link } from '../../atoms';
import { NewsTextContent } from '../../molecules';

import { NewsCardProps } from '../../../types/types';

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
    <Link href={link} outgoing>
      <div className="flex flex-col w-full min-h-newsCardContainerMobileHeight desktop:min-h-newsCardContainerHeight group hover:cursor-pointer">
        <NewsCardImage alt={alt} src={src} />
        <NewsTextContent author={author} date={date} description={description} title={title} />
        <BadgeGroup badges={badges} />
      </div>
    </Link>
  );
};

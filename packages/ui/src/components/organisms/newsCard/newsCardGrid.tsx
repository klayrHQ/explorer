import { NewsCard } from './newsCard';
import { IconComponent, LinkComponent } from '../../../types/types';
import { FlexGrid } from '../../atoms';
import { SectionHeader } from '../layout/sectionHeader.tsx';
import { NewsCardProps } from '../../../types/types';

interface NewsCardGridProps {
  newsCards: NewsCardProps[];
  icon?: IconComponent;
  href?: string;
}

export const NewsCardGrid = ({ newsCards, href }: NewsCardGridProps) => {
  return (
    <FlexGrid className="w-full" direction={'col'} gap={'6'}>
      <SectionHeader href={href} title={'Klayr Announcements'} titleSize={'sm'} />
      <div className="w-full flex flex-col desktop:flex-row gap-6 justify-between">
        {newsCards.map((newsCard, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NewsCard key={index} {...newsCard} />
        ))}
      </div>
    </FlexGrid>
  );
};

import { NewsCard, NewsCardProps } from "./newsCard";
import { Typography } from "../../atoms/base/typography";
import { Icon } from "../../atoms/images/icon";
import { IconComponent } from "../../../types/types";

interface NewsCardGridProps {
  newsCards: NewsCardProps[];
  icon?: IconComponent;
}

export const NewsCardGrid = ({ newsCards, }: NewsCardGridProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Typography
          color="gray-1"
          component="h6"
          fontWeight="bold"
          variant="h6"
        >
          <a className="hover:underline" href="/news">
            Klayr announcements
          </a>
        </Typography>
        <Icon icon="ArrowUpRight" />
      </div>
      <div className="flex flex-col desktop:flex-row gap-6">
        {newsCards.map((newsCard, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NewsCard key={index} {...newsCard} />
        ))}
      </div>
    </div>
  );
};

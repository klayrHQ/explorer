import { NewsCard, NewsCardProps } from "./newsCard";
import { Typography } from "../../atoms/base/typography";
import { Icon } from "../../atoms/images/icon";
import { IconComponent } from "../../../types/types";
import {FlexGrid} from "../../atoms";

interface NewsCardGridProps {
  newsCards: NewsCardProps[];
  icon?: IconComponent;
}

export const NewsCardGrid = ({ newsCards, }: NewsCardGridProps) => {
  return (
    <FlexGrid className="w-full" direction={"column"} gap={"6"}>
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
      <div className="w-full flex flex-col desktop:flex-row gap-6 justify-between">
        {newsCards.map((newsCard, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NewsCard key={index} {...newsCard} />
        ))}
      </div>
    </FlexGrid>
  );
};

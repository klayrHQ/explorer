import { NewsCard, NewsCardProps } from "./newsCard";
import {IconComponent, LinkComponent} from "../../../types/types";
import {FlexGrid} from "../../atoms";
import {SectionHeader} from "../layout/sectionHeader.tsx";

interface NewsCardGridProps {
  newsCards: NewsCardProps[];
  icon?: IconComponent;
  href?: string;
  linkComponent?: LinkComponent;
}

export const NewsCardGrid = ({ newsCards, href, linkComponent, }: NewsCardGridProps) => {
  return (
    <FlexGrid className="w-full" direction={"column"} gap={"6"}>
      <SectionHeader href={href} linkComponent={linkComponent} title={"Klayr Announcements"} titleSize={"sm"} />
      <div className="w-full flex flex-col desktop:flex-row gap-6 justify-between group">
        {newsCards.map((newsCard, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NewsCard key={index} {...newsCard} />
        ))}
      </div>
    </FlexGrid>
  );
};

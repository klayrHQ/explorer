import { NewsCardImage, BadgeGroup } from "../../atoms";
import { NewsTextContent } from "../../molecules";
import { ColorType } from "../../../types/types";

export interface NewsCardProps {
  badges: { colorVariant?: ColorType; label: string }[];
  author: string;
  date: string;
  title: string;
  description: string;
  src: string;
  alt: string;
}

export const NewsCard = ({
  badges,
  author,
  date,
  title,
  description,
  src,
  alt,
}: NewsCardProps) => {
  return (
    <div className="flex flex-col w-newsCardMobileWidth desktop:w-newsCardWidth min-h-newsCardContainerMobileHeight desktop:min-h-newsCardContainerHeight max-w-full">
      <NewsCardImage alt={alt} src={src} />
      <NewsTextContent
        author={author}
        date={date}
        description={description}
        title={title}
      />
      <BadgeGroup badges={badges} />
    </div>
  );
};

/* eslint-disable react/jsx-no-literals */
import { Typography } from "../../atoms/base/typography";

interface NewsTextContentProps {
  author: string;
  date: string;
  component?: string;
  title: string;
  description: string;
}

export const NewsTextContent = ({
  author,
  date,
  component,
  title,
  description,
}: NewsTextContentProps) => {
  return (
    <div className="flex flex-col mb-3 desktop:mb-5 mt-5 w-newsCardMobileWidth desktop:w-newsCardWidth">
      <Typography
        className="mb-1"
        color="gray-5"
        component="p"
        fontWeight="semibold"
        variant="paragraph-sm"
      >
        {author} • {date}
      </Typography>
      <Typography
        className="mb-2 desktop:mb-4"
        color="volt"
        component="h3"
        fontWeight="bold"
        variant="h6"
      >
        {title}
      </Typography>
      <Typography
        className=" line-clamp-3"
        color="gray-5 "
        component="p"
        fontWeight="normal"
        variant="paragraph-md"
      >
        {description}
      </Typography>
    </div>
  );
};

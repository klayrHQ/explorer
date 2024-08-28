/* eslint-disable react/jsx-no-literals */
import { Typography } from '../../atoms';

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
    <div className="flex flex-col mb-3 desktop:mb-5 mt-5 w-full">
      <Typography
        className="mb-1 group-hover:text-gray-1 transition ease-in-out  duration-200 "
        color="gray-5"
        component="p"
        fontWeight="semibold"
        variant="paragraph-sm"
      >
        {author} • {date}
      </Typography>
      <Typography
        className="mb-2 min-h-12 desktop:mb-4 group-hover:text-voltDark transition ease-in-out  duration-200"
        color="volt"
        component="h6"
        fontWeight="bold"
        variant="h6"
      >
        {title}
      </Typography>
      <Typography
        className=" line-clamp-3 group-hover:text-gray-4 transition ease-in-out  duration-200"
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

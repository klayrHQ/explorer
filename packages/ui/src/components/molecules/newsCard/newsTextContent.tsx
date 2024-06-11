import { cva } from 'class-variance-authority';
import { Typography } from '../../atoms/base/typography';

interface NewsTextContentProps {
  author: string;
  date: string;
  title: string;
  description: string;
  size?: 'desktop' | 'mobile';
  className?: string;
}

const containerStyles = cva(
  'flex flex-col py-6',
  {
    variants: {
      size: {
        desktop: 'w-newsCard',
        mobile: 'w-newsCardMobile',
      },
    },
    defaultVariants: {
      size: 'desktop',
    },
  },
);

export const NewsTextContent = ({ author, date, title, description, size = 'desktop', className, }: NewsTextContentProps) => {
  return (
    <div className={containerStyles({ size, className: className,})}>
      <Typography color="gray-5 mb-2" fontWeight="semibold" variant="paragraph-sm">{author} • {date}</Typography>
      <Typography color="volt mb-4" fontWeight="bold" variant="h6">{title}</Typography>
      <Typography color="gray-5 mb-4 line-clamp-3" fontWeight="normal" variant="paragraph-md">{description}</Typography>
    </div>
  );
};

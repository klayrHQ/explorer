/* eslint-disable react/jsx-no-literals */
import { cva } from 'class-variance-authority';
import { Typography } from '../../atoms/base/typography';

interface NewsTextContentProps {
  author: string;
  date: string;
  component?: string;
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
        desktop: 'w-newsCardWidth',
        mobile: 'w-newsCardMobileWidth',
      },
    },
    defaultVariants: {
      size: 'desktop',
    },
  },
);

export const NewsTextContent = ({ author, date, component,  title, description, size = 'desktop', className, }: NewsTextContentProps) => {
  return (
    <div className={containerStyles({ size, className: className,})}>
      <Typography className='mb-2' color="gray-5" component='p' fontWeight="semibold" variant="paragraph-sm">{author} • {date}</Typography>
      <Typography className='mb-4' color="volt" component='h3' fontWeight="bold" variant="h6">{title}</Typography>
      <Typography className='mb-4 line-clamp-3' color="gray-5 " component='p' fontWeight="normal" variant="paragraph-md">{description}</Typography>
    </div>
  );
};

import { Typography } from '../../base/typography';
import { NotFoundImage } from './notFoundImage';

interface NotFoundProps {
  headerText: string;
  subheaderText: string;
  className?: string;
}

export const NotFound = ({ headerText, subheaderText, className }: NotFoundProps) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className} mt-16}`}>
      <NotFoundImage />
      <Typography className="mt-6 mb-3" component="h4" fontWeight="bold" variant="h4">
        {headerText}
      </Typography>
      <Typography variant="paragraph-sm">{subheaderText}</Typography>
    </div>
  );
};

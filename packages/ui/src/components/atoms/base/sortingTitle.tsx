import { Typography } from './typography';
import { Icon } from '../images/icon';

interface SortingTitleProps {
  onSortChange: (column: string) => void;
  sortField: string;
  sortOrder: string;
  sortValue: any;
  title: string;
}

export const SortingTitle = ({
  sortField,
  sortValue,
  sortOrder,
  onSortChange,
  title,
}: SortingTitleProps) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <Typography variant={'paragraph-sm'}>{title}</Typography>
      <div onClick={() => onSortChange('height')}>
        <Icon
          className={'ml-1'}
          color="onBackgroundLow"
          icon={
            sortField === sortValue ? (sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown') : 'ArrowDown'
          }
          size={'xs'}
        />
      </div>
    </div>
  );
};

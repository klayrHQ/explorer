import { SelectUp } from '../../input/selectUp';
import { Typography } from '../../base/typography';

interface PageLimitProps {
  defaultValue: string;
  onPerPageChange: (value: string) => void;
}

const itemsOptions = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

export const PageLimit = ({ defaultValue, onPerPageChange }: PageLimitProps) => {
  return (
    <div className={'flex items-center gap-2'}>
      <Typography color="onBackgroundLow" fontWeight="semibold" variant="paragraph-sm">
        {'Show'}
      </Typography>
      <SelectUp defaultValue={defaultValue} onChange={onPerPageChange} options={itemsOptions} />
      <Typography color="onBackgroundLow" fontWeight="semibold" variant="paragraph-sm">
        {'Records'}
      </Typography>
    </div>
  );
};

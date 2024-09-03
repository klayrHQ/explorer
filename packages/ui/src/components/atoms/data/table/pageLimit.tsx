import { SelectUp } from '../../input/selectUp';
import { Calculator } from '../../../molecules';
import { Typography } from '../../base/typography';

export const PageLimit = ({}) => {
  const calculatorOptions = [
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '30', label: '30' },
  ];

  return (
    <div className={'flex items-center gap-2'}>
      <Typography color="onBackgroundLow" fontWeight="semibold" variant="paragraph-sm">
        {'Show'}
      </Typography>
      <SelectUp defaultValue={'10'} options={calculatorOptions} />
      <Typography color="onBackgroundLow" fontWeight="semibold" variant="paragraph-sm">
        {'Records'}
      </Typography>
    </div>
  );
};

import { FlexGrid } from '../base/flexGrid.tsx';
import { Typography } from '../base/typography.tsx';
import { cls } from '../../../utils/functions.ts';

interface CurrencySettingProps {
  sign: string;
  symbol: string;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

export const CurrencySetting = ({
  sign,
  symbol,
  label,
  selected,
  onSelect,
  disabled,
}: CurrencySettingProps) => {
  return (
    <FlexGrid
      alignItems={'center'}
      className={cls([
        'rounded-sm py-1.5xl px-lg w-full',
        selected ? 'bg-backgroundTertiary' : '',
        disabled
          ? 'cursor-not-allowed grayscale-50p opacity-50p'
          : 'cursor-pointer hover:bg-backgroundTertiary',
      ])}
      mobileDirection={'row'}
      gap={'md'}
    >
      <div
        className={cls([
          'w-iconButtonWidth aspect-square flex rounded-sm',
          'items-center justify-center',
          selected ? 'bg-primary' : 'bg-backgroundPrimary',
        ])}
        onClick={onSelect}
      >
        <Typography
          variant={'paragraph-md'}
          color={selected ? 'backgroundPrimary' : 'onBackgroundHigh'}
        >
          {sign}
        </Typography>
      </div>
      <FlexGrid direction={'col'} gap={'0'}>
        <Typography fontWeight={'semibold'} color={'onBackgroundHigh'}>
          {label}
        </Typography>
        <Typography variant={'paragraph-sm'} color={'onBackgroundLow'}>
          {symbol}
        </Typography>
      </FlexGrid>
    </FlexGrid>
  );
};

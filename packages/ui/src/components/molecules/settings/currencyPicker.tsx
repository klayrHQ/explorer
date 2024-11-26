import { CurrencySetting, Grid } from '../../atoms';

interface CurrencyPickerProps {
  currencies: {
    sign: string;
    symbol: string;
    label: string;
    disabled?: boolean;
  }[];
  selectedCurrency?: string;
  onSelectCurrency?: (currency: string) => void;
  disabled?: boolean;
}

export const CurrencyPicker = ({
  currencies,
  selectedCurrency,
  onSelectCurrency,
  disabled,
}: CurrencyPickerProps) => {
  return (
    <Grid columns={'1'} tabletCols={'2'} className={'w-full'} gap={'lg'}>
      {currencies.map((currency) => (
        <CurrencySetting
          key={`currency-${currency.label}`}
          {...currency}
          selected={currency.label === selectedCurrency}
          onSelect={() => onSelectCurrency && onSelectCurrency(currency.label)}
          disabled={disabled || currency.disabled}
        />
      ))}
    </Grid>
  );
};

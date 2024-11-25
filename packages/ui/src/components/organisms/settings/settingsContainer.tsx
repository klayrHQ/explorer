import { Button, FlexGrid, Grid, Typography } from '../../atoms';
import { Currency } from 'web/src/components/currency.tsx';
import { Setting } from '../../atoms';

interface SettingsContainerProps {
  onClose: () => void;
  onSave: () => void;
  mantissaSize: number | string;
  setMantissaSize: (value: number | string) => void;
  decimalSeparator: string;
  setDecimalSeparator: (value: string) => void;
  formatting: string[];
  setFormatting: (value: string[]) => void;
  trailingZeroes: boolean;
  setTrailingZeroes: (value: boolean) => void;
}

export const SettingsContainer = ({
  onClose,
  onSave,
  mantissaSize,
  setMantissaSize,
  trailingZeroes,
  setTrailingZeroes,
  formatting,
  setFormatting,
  setDecimalSeparator,
  decimalSeparator,
}: SettingsContainerProps) => {
  const decimalSeparatorOptions = ['Comma', 'Period'];
  const formattingOptions = ['Symbol', 'Sign'];
  const saveDisabled = !mantissaSize && !trailingZeroes && !formatting && !decimalSeparator;

  return (
    <FlexGrid direction={'col'} gap={'3xl'}>
      <Typography variant={'paragraph-md'}>
        Example: <Currency amount={123412345678} color={'volt'} />
      </Typography>
      <Grid
        className={'w-full desktop:flex desktop:justify-between desktop:gap-xl'}
        columns={'1'}
        tabletCols={'2'}
        gap={'2xl'}
      >
        <Setting
          label={'Mantissa size'}
          setting={'number'}
          value={mantissaSize}
          setValue={setMantissaSize}
        />
        <Setting
          label={'Formatting'}
          setting={'checkboxGroup'}
          value={formatting}
          setValue={setFormatting}
          options={formattingOptions}
        />
        <Setting
          label={'Decimal Separator'}
          setting={'radio'}
          value={decimalSeparator}
          setValue={setDecimalSeparator}
          options={decimalSeparatorOptions}
        />
        <Setting
          label={'Trailing Zeroes'}
          setting={'checkbox'}
          value={trailingZeroes}
          setValue={setTrailingZeroes}
        />
      </Grid>
      <FlexGrid alignItems="center" className="w-full mt-2xl" gap="1" justify="end">
        <Button
          align="none"
          className="hidden desktop:flex text-gray-5 hover:text-gray-1"
          label="Cancel"
          onClick={onClose}
          variant="transparent"
        />
        <Button
          align="none"
          className="w-full desktop:w-auto"
          disabled={saveDisabled}
          label="Save"
          onClick={onSave}
        />
      </FlexGrid>
    </FlexGrid>
  );
};

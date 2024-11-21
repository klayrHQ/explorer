'use client';
import { FlexGrid, Grid, Typography } from '@repo/ui/atoms';
import { Currency } from './currency.tsx';
import { Setting } from './setting.tsx';
import { useState } from 'react';

export const Settings = () => {
  const [mantissaSize, setMantissaSize] = useState<number | string>(2);

  const [decimalSeparator, setDecimalSeparator] = useState<string>('Comma');
  const decimalSeparatorOptions = ['Comma', 'Period'];

  const [formatting, setFormatting] = useState<string[]>(['Symbol']);
  const formattingOptions = ['Symbol', 'Sign'];

  const [trailingZeroes, setTrailingZeroes] = useState<boolean>(false);

  return (
    <FlexGrid direction={'col'} gap={'xl'}>
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
    </FlexGrid>
  );
};

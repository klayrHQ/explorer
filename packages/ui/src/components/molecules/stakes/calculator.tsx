import { Typography } from '../../atoms';
import { CustomSelect, CustomSelectProps } from '../../atoms';
import { ChangeEvent } from 'react';

export interface CalculatorProps {
  amount: number;
  setAmount: (amount: number) => void;
  options: CustomSelectProps['options'];
  setPeriod: (period: string) => void;
}

export const Calculator = ({ amount, setAmount, options, setPeriod }: CalculatorProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    if (isNaN(parseInt(e.target.value))) return;
    setAmount(parseInt(e.target.value));
  };

  return (
    <div className="max-w-calculatorWidth w-full flex items-center justify-between border-1 border-background rounded-md bg-backgroundSecondary max-w-calculatorWidth divide-x-2 divide-background">
      <div className="">
        <Typography className="px-3 py-4" fontWeight="semibold" variant="paragraph-md">
          KLY
        </Typography>
      </div>
      <div className="flex w-full h-full flex-1">
        <input
          className="bg-backgroundSecondary w-full h-full px-3 py-4 focus:outline-none placeholder:onBackgroundLow "
          placeholder="1000"
          type="text"
          inputMode={'numeric'}
          value={amount}
          pattern="[0-9]*"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="">
        <CustomSelect
          classNameButton="h-14 border-none "
          classNameList="border-darkBlue border-b-0 border-l-0 border-r-0"
          defaultValue="month"
          fontSize="md"
          options={options}
          width="xs"
          onChange={setPeriod}
        />
      </div>
    </div>
  );
};

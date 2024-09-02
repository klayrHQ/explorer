import { FlexGrid, Typography } from '../../atoms';
import { CustomSelect, CustomSelectProps } from '../../atoms';

interface CalculatorProps {
  options: CustomSelectProps['options'];
}

export const Calculator = ({ options }: CalculatorProps) => {
  return (
    <div className="w-full h-full  mx-auto flex items-center justify-between border-1 border-background rounded-md bg-backgroundSecondary max-w-calculatorWidth divide-x-2 divide-background">
      <div className="">
        <Typography className="px-3 py-4" fontWeight="semibold" variant="paragraph-md">
          KLY
        </Typography>
      </div>
      <div className="flex w-full h-full flex-1">
        <input
          className="bg-backgroundSecondary w-full h-full px-3 py-4 focus:outline-none "
          placeholder="1000"
          type="text"
        />
      </div>
      <div className="h-full">
        <CustomSelect
          classNameButton="border-none h-full"
          defaultValue="lastMonth"
          options={options}
          width="sm"
        />
      </div>
    </div>
  );
};

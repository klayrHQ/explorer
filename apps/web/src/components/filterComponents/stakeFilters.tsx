import {Calculator, CalculatorProps} from '@repo/ui/molecules';
import { calculatorOptions } from '../../utils/constants';
import {FlexGrid} from "@repo/ui/atoms";

interface StakeFiltersProps {
  calculatorProps: Omit<CalculatorProps, 'options'>;
}

export const StakeFilters = ({ calculatorProps }: StakeFiltersProps) => {
  return (
    <FlexGrid justify={'between'}>
      <Calculator {...calculatorProps} options={calculatorOptions} />
    </FlexGrid>
  );
};

import { Typography } from '../index.ts';
import { cls } from '../../../utils/functions.ts';

interface CheckboxSettingProps {
  value: string[];
  setValue: (value: string[]) => void;
  options: string[];
}

export const CheckboxGroupSetting = ({ value, setValue, options }: CheckboxSettingProps) => {
  return (
    <div className={'flex gap-md items-center'}>
      {options.map((option) => (
        <label key={option} className={'flex gap-xs items-center cursor-pointer'}>
          <input
            className={cls([
              'relative appearance-none w-4 h-4 border-1 border-solid border-borderHigh rounded-2xs cursor-pointer bg-transparent',
              'checked:before:w-2 checked:before:h-2 checked:before:bg-primary checked:before:inset-0',
              'hover:before:w-2 hover:before:h-2 hover:before:bg-primary hover:before:inset-0',
              'before:block before:rounded-2xs before:m-auto before:absolute',
            ])}
            type="checkbox"
            value={option}
            checked={value.includes(option)}
            onChange={() => {
              if (value.includes(option)) {
                setValue(value.filter((val) => val !== option));
              } else {
                setValue([...value, option]);
              }
            }}
          />
          <Typography variant={'caption'}>{option}</Typography>
        </label>
      ))}
    </div>
  );
};

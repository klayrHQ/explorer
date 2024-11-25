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
              'relative appearance-none w-4 h-4 border-1 border-solid border-borderHigh rounded-2xs cursor-pointer bg-backgroundSecondary',
              'checked:bg-volt checked:border-volt',
              'checked:before:w-2 checked:before:h-2 before:bg-backgroundSecondary before:rounded-2xs',
              'before:block before:inset-0 before:m-auto before:absolute',
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

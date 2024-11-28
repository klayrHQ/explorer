import { Typography } from '../index.ts';
import { cls } from '../../../utils/functions.ts';

interface RadioSettingProps {
  value: string;
  setValue: (value: string) => void;
  options: string[];
}

export const RadioSetting = ({ value, setValue, options }: RadioSettingProps) => {
  return (
    <div className={'flex gap-md items-center'}>
      {options.map((option) => (
        <label key={option} className={'flex gap-xs items-center cursor-pointer'}>
          <input
            className={cls([
              'relative appearance-none w-4 h-4 border-1 border-solid border-borderHigh rounded-full cursor-pointer bg-transparent',
              'checked:before:w-2 checked:before:h-2 checked:before:bg-primary checked:before:inset-0',
              'hover:before:w-2 hover:before:h-2 hover:before:bg-primary hover:before:inset-0',
              'before:block before:rounded-full before:m-auto before:absolute',
            ])}
            type="radio"
            value={option}
            checked={value === option}
            onChange={() => setValue(option)}
          />
          <Typography variant={'caption'}>{option}</Typography>
        </label>
      ))}
    </div>
  );
};

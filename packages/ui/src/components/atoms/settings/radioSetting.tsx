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
        <label key={option} className={'flex gap-xs items-center'}>
          <input
            className={cls([
              'relative appearance-none w-4 h-4 border-1 border-solid border-borderHigh rounded-full cursor-pointer bg-backgroundSecondary',
              'checked:bg-volt checked:border-volt',
              'checked:before:w-50p checked:before:h-50p before:bg-backgroundSecondary before:rounded-full',
              'before:block before:inset-0 before:m-auto before:absolute',
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

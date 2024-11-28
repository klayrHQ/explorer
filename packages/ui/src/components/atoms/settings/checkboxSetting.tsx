import { cls } from '../../../utils/functions.ts';

interface CheckboxSettingProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const CheckboxSetting = ({ value, setValue }: CheckboxSettingProps) => {
  return (
    <label className={'flex gap-xs items-center'}>
      <input
        className={cls([
          'relative appearance-none w-4 h-4 border-1 border-solid border-borderHigh rounded-2xs cursor-pointer bg-transparent',
          'checked:before:w-2 checked:before:h-2 checked:before:bg-primary checked:before:inset-0',
          'hover:before:w-2 hover:before:h-2 hover:before:bg-primary hover:before:inset-0',
          'before:block before:rounded-2xs before:m-auto before:absolute',
        ])}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
    </label>
  );
};

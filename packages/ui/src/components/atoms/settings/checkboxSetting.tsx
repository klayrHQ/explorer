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
          'relative appearance-none w-4 h-4 border-1 border-solid border-borderHigh rounded-2xs cursor-pointer bg-backgroundSecondary',
          'checked:bg-volt checked:border-volt',
          'checked:before:w-2 checked:before:h-2 before:bg-backgroundSecondary before:rounded-2xs',
          'before:block before:inset-0 before:m-auto before:absolute',
        ])}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
    </label>
  );
};

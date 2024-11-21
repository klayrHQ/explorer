import { ReactNode } from 'react';
import { FlexGrid, Typography } from '@repo/ui/atoms';
import { NumberSetting } from './numberSetting.tsx';
import { RadioSetting } from './radioSetting.tsx';
import { CheckboxGroupSetting } from './checkboxGroupSetting.tsx';
import { CheckboxSetting } from './checkboxSetting.tsx';

interface SettingProps {
  label: string | ReactNode;
  setting: 'number' | 'radio' | 'checkbox' | 'checkboxGroup';
  value: number | string | string[] | boolean;
  setValue: (value: any) => void;
  className?: string;
  options?: string[];
}

export const Setting = ({ label, setting, className, value, setValue, options }: SettingProps) => {
  let settingComponent;

  switch (setting) {
    case 'number':
      settingComponent = (
        <NumberSetting
          value={Number(value)}
          onIncrease={() => setValue(Number(value) + 1)}
          onDecrease={() => setValue(Number(value) - 1)}
        />
      );
      break;
    case 'radio':
      settingComponent = (
        <RadioSetting value={String(value)} setValue={setValue} options={options ?? []} />
      );
      break;
    case 'checkbox':
      settingComponent = (
        <CheckboxSetting value={typeof value === 'boolean' ? value : false} setValue={setValue} />
      );
      break;
    case 'checkboxGroup':
      settingComponent = (
        <CheckboxGroupSetting
          value={typeof value === 'object' ? value : []}
          setValue={setValue}
          options={options ?? []}
        />
      );
      break;
    default:
      settingComponent = null;
  }

  return (
    <FlexGrid direction={'col'} gap={'1'} className={className}>
      <Typography variant={'caption'} color={'onBackgroundLow'}>
        {label}
      </Typography>
      {settingComponent}
    </FlexGrid>
  );
};

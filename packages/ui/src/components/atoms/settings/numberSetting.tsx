import { Icon, Typography } from '../index.ts';

interface NumberSettingProps {
  value: number;
  onIncrease: (value: number) => void;
  onDecrease: (value: number) => void;
}

export const NumberSetting = ({ value, onIncrease, onDecrease }: NumberSettingProps) => {
  const buttonStyles =
    'rounded-full flex justify-center items-center w-4 h-4 border-1 border-solid border-volt color-volt';

  return (
    <div className={'inline-flex gap-md items-center'}>
      <button className={buttonStyles} onClick={() => onDecrease(value)}>
        <Icon icon={'Minus'} size={'3xs'} color={'volt'} />
      </button>
      <Typography variant={'caption'}>{value}</Typography>
      <button className={buttonStyles} onClick={() => onIncrease(value)}>
        <Icon icon={'Plus'} size={'3xs'} color={'volt'} />
      </button>
    </div>
  );
};

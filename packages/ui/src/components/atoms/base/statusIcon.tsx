import { cls } from '../../../utils/functions.ts';

interface StatusIconProps {
  className?: string;
  connected?: boolean;
}

export const StatusIcon = ({ connected, className }: StatusIconProps) => {
  return (
    <div
      className={cls(['rounded-full w-2 h-2', connected ? 'bg-green' : 'bg-warning', className])}
    />
  );
};

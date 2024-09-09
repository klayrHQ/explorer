import { cls } from '../../../utils/functions.ts';

interface StatusIconProps {
  className?: string;
  connected?: boolean;
  status?: string;
}

export const StatusIcon = ({ connected, status, className }: StatusIconProps) => {
  let statusClass;

  switch (status) {
    case 'pending':
      statusClass = 'bg-warning';
      break;
    case 'successful':
      statusClass = 'bg-success';
      break;
    case 'failed':
      statusClass = 'bg-error';
      break;
    default:
      statusClass = connected ? 'bg-success' : 'bg-warning';
  }

  return <div className={cls(['rounded-full w-2 h-2', statusClass, className])} />;
};

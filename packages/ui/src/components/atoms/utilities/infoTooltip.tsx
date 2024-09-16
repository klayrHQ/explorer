import { Tooltip } from './tooltip';
import { Icon } from '../images/icon';

interface InfoTooltipProps {
  text: string;
  size?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const InfoTooltip = ({ text, size = '16px', placement = 'top' }: InfoTooltipProps) => {
  return (
    <Tooltip placement={placement} text={text}>
      <Icon color={'onBackgroundLow'} icon={'Info'} size={'small'} style={{ fontSize: size }} />
    </Tooltip>
  );
};

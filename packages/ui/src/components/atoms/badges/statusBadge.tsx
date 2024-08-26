import { Badge } from './badge';

type StatusColorProps = {
  borderColor: string;
  colorVariant: string;
  backgroundColor: string;
};

const statusColors: { [key: string]: StatusColorProps } = {
  active: {
    borderColor: 'success',
    colorVariant: 'success',
    backgroundColor: 'greenOpacity',
  },
  inactive: {
    borderColor: 'error',
    colorVariant: 'error',
    backgroundColor: 'redOpacity',
  },
  standby: {
    borderColor: 'azule',
    colorVariant: 'azule',
    backgroundColor: 'blueOpacity',
  },
  inelegible: {
    borderColor: 'gray-4',
    colorVariant: 'gray-4',
    backgroundColor: 'grayOpacity',
  },
  punished: {
    borderColor: 'volt',
    colorVariant: 'volt',
    backgroundColor: 'yellowOpacity',
  },
  banned: {
    borderColor: 'tulip',
    colorVariant: 'tulip',
    backgroundColor: 'pinkOpacity',
  },
  successful: {
    borderColor: 'success',
    colorVariant: 'success',
    backgroundColor: 'greenOpacity',
  },
  pending: {
    borderColor: 'warning',
    colorVariant: 'warning',
    backgroundColor: 'warningOpacity',
  },
  unsuccessful: {
    borderColor: 'error',
    colorVariant: 'error',
    backgroundColor: 'redOpacity',
  },
};

type ValidatorStatusBadgeProps = {
  status: string;
  nextAllocatedTime?: string;
};

export const StatusBadge = ({ status, nextAllocatedTime }: ValidatorStatusBadgeProps) => {
  const { borderColor, colorVariant, backgroundColor } = statusColors[status] || {};

  return (
    <Badge
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      colorVariant={colorVariant}
      label={nextAllocatedTime ?? status}
    />
  );
};

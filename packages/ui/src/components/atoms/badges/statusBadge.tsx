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
  activeValidator: {
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
    borderColor: 'azuleDark',
    colorVariant: 'azuleDark',
    backgroundColor: 'blueOpacity',
  },
  ineligible: {
    borderColor: 'sandDark',
    colorVariant: 'sandDark',
    backgroundColor: 'sandDarkOpacity',
  },
  punished: {
    borderColor: 'volt',
    colorVariant: 'volt',
    backgroundColor: 'yellowOpacity',
  },
  punishedValidator: {
    borderColor: 'volt',
    colorVariant: 'volt',
    backgroundColor: 'yellowOpacity',
  },
  banned: {
    borderColor: 'tulip',
    colorVariant: 'tulip',
    backgroundColor: 'pinkOpacity',
  },
  bannedValidator: {
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
  online: {
    borderColor: 'success',
    colorVariant: 'success',
    backgroundColor: 'greenOpacity',
  },
  offline: {
    borderColor: 'error',
    colorVariant: 'error',
    backgroundColor: 'redOpacity',
  },
};

type ValidatorStatusBadgeProps = {
  status: string;
  nextAllocatedTime?: string;
};

const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase(),
    )
    .replace(/\s+/g, '');
};

export const StatusBadge = ({ status, nextAllocatedTime }: ValidatorStatusBadgeProps) => {
  const camelCaseStatus = toCamelCase(status);
  const { borderColor, colorVariant, backgroundColor } = statusColors[camelCaseStatus] || {};

  return (
    <Badge
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      colorVariant={colorVariant}
      label={nextAllocatedTime ?? status}
    />
  );
};

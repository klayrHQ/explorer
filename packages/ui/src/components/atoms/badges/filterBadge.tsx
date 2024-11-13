import { Typography } from '../base/typography';
import { Icon } from '../images/icon';

interface FilterBadgeProps {
  label: string;
  value: string;
  onClose: () => void;
}

export const FilterBadge = ({ label, value, onClose }: FilterBadgeProps) => {
  return (
    <div className="border-1 border-borderMedium rounded-sm shadow-sm px-2 py-0.5 flex gap-1.5 items-center relative">
      <Typography variant="caption" color="onBackground">
        {label}
      </Typography>
      <Typography variant="caption" color="onBackgroundLow">
        {value}
      </Typography>
      <div
        className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-tulipDark rounded-full transition-all absolute -right-2 -top-2 hover:bg-tulip`}
        onClick={onClose}
      >
        <Icon color="backgroundDark" icon="CrossClose" size="xxs" />
      </div>
    </div>
  );
};

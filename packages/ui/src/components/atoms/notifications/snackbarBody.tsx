import { IconButton } from '../input/iconButton';
import { Typography } from '../base/typography';
import { Icon } from '../images/icon';

type SnackbarVariantType = 'success' | 'error' | 'alert' | 'info';

type SnackbarVariantStyles = {
  style: string;
  icon: string;
};
const SnackbarVariant: Record<SnackbarVariantType, SnackbarVariantStyles> = {
  success: {
    style: 'bg-successOpacity border-success',
    icon: 'SuccessIcon',
  },
  error: {
    style: 'bg-errorOpacity border-error',
    icon: 'ErrorIcon',
  },
  alert: {
    style: 'bg-warningOpacity border-warning',
    icon: 'WarningIcon',
  },
  info: {
    style: ' bg-blueOpacity border-azule',
    icon: 'InfoIcon',
  },
};

type SnackbarProps = {
  title: string;
  text: string;
  variant: SnackbarVariantType;
  handleClose?: () => void;
};

export const SnackbarBody = ({ title, text, handleClose, variant }: SnackbarProps) => {
  const { style, icon } = SnackbarVariant[variant];
  return (
    <>
      <div className={`w-96 ${style} rounded-lg border-1 relative`}>
        <div className="absolute top-2 right-2">
          <IconButton
            className="w-3 h-3 text-onBackground"
            icon="CrossClose"
            onClick={handleClose}
            variant="transparent"
          />
        </div>
        <div className="flex gap-1.5 ">
          <div className="mt-4 ml-1.5">
            <Icon icon={icon} />
          </div>
          <div className="flex flex-col my-6 gap-2 max-w-72">
            <Typography color="text-onBackground" fontWeight="bold" variant="paragraph-md">
              {title}
            </Typography>
            <Typography
              className="text-onBackground"
              color="onBackgroundMedium"
              variant="paragraph-sm"
            >
              {text}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

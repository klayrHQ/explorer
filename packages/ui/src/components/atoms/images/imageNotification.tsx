import { ImageContainer } from './imageContainer';
import { NotificationIcon } from '../notifications/notificationIcon';

export interface ImageNotificationProps {
  notificationValue: number | string;
  className?: string;
}

export const ImageNotification = ({ notificationValue, className }: ImageNotificationProps) => {
  return (
    <div className={` relative inline-flex items-center gap-1 ${className}`}>
      <NotificationIcon
        className="absolute -translate-x-1 -translate-y-4"
        notificationValue={notificationValue}
        size="lg"
      />
    </div>
  );
};

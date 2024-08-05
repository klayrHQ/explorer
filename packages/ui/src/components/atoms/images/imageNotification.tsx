import { ImageContainer } from './imageContainer';
import { NotificationIcon } from '../notifications/notificationIcon';

export interface ImageNotificationProps {
  imageUrl: string;
  name: string;
  notificationValue: number | string;
  className?: string;
}

export const ImageNotification = ({
  imageUrl,
  name,
  notificationValue,
  className,
}: ImageNotificationProps) => {
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

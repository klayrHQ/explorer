import { ImageContainer } from './imageContainer';
import { NotificationIcon } from '../notifications/notificationIcon';
import { CSSProperties } from 'react';

export interface ImageNotificationProps {
  notificationValue: number | string;
  className?: string;
  style?: CSSProperties;
}

export const ImageNotification = ({
  notificationValue,
  className,
  style,
}: ImageNotificationProps) => {
  return (
    <div className={` relative inline-flex items-center gap-1 ${className}`}>
      <NotificationIcon
        className="absolute -translate-x-1 -translate-y-4"
        notificationValue={notificationValue}
        style={style}
        size="lg"
      />
    </div>
  );
};

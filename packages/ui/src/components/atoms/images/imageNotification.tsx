import { ImageContainer } from "./imageContainer";
import { NotificationIcon } from "../notifications/notificationIcon";

export interface ImageNotificationProps {
  imageUrl: string;
  name: string;
  notificationValue: number | string;
  className?: string;
}

export const ImageNotification = ({ imageUrl, name, notificationValue, className }: ImageNotificationProps) => {
  return (
    <div className={` relative inline-flex items-center gap-1 ${className}`}>
      <ImageContainer alt={name} src={imageUrl} variant="avatarLg"/>
      <NotificationIcon notificationValue={notificationValue} size="lg" className="absolute -translate-x-3 -translate-y-4" />
    </div>
  );
};
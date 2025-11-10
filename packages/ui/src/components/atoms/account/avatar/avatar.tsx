import { KlayrAvatar } from './klayrAvatar';
import { ImageContainer } from '../../images/imageContainer';
import Blank from '../../../../assets/images/blank.png';

interface AvatarProps {
  address: string;
  className?: string;
  size?: number;
  collectible?: boolean;
  circle?: boolean;
}

export const Avatar = ({ address, className, size, collectible, circle }: AvatarProps) => {
  return address ? (
    <KlayrAvatar
      address={address}
      circle={circle}
      className={className}
      collectible={collectible}
      size={size || 32}
    />
  ) : (
    <ImageContainer
      src={Blank.src}
      alt={'Klayr Avatar'}
      className="object-cover rounded-full"
      style={{ width: size || 32, height: size || 32 }}
    />
  );
};

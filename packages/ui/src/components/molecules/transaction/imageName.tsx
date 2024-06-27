import { ImageContainer } from "../../atoms";
import { Typography } from "../../atoms";

export interface ImageNameProps {
  imageUrl: string;
  name: string;
  className?: string;
}

export const ImageName = ({ imageUrl, name, className, }: ImageNameProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ImageContainer
        alt={name}
        src={imageUrl}
        variant="avatar"
      />
      <Typography className="pt-1.5" fontWeight="semibold" variant="paragraph-md">{name}</Typography>
    </div>
  );
};
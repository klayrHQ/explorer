import { ImageContainer } from "../../atoms";
import { Typography } from "../../atoms";

export interface ImageNameProps {
  imageUrl: string;
  name: string;
  className?: string;
}

export const ImageName = ({ imageUrl, name, className, }: ImageNameProps) => {
  return (
    <div className={`inline-flex items-center  gap-1 ${className}`}>
      <ImageContainer
        alt={name}
        src={imageUrl}
        variant="avatar"
      />
      <Typography fontWeight="semibold" variant="paragraph-md">{name}</Typography>
    </div>
  );
};
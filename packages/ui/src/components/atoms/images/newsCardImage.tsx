import { cva } from "class-variance-authority";

const imageStyles = cva("rounded-2xl object-cover", {
  variants: {
    size: {
      desktop: "w-newsCardWidth h-newsCardHeight",
      mobile: "w-newsCardMobileWidth h-newsCardMobileHeight",
    },
  },
});

interface ResponsiveImageProps {
  src: string;
  alt: string;
  size: "desktop" | "mobile";
  className?: string;
}

export const NewsCardImage = ({
  src,
  alt,
  size,
  className,
}: ResponsiveImageProps) => {
  return (
    <div>
      <img alt={alt} className={imageStyles({ size, className, })} src={src} />
    </div>
  );
};

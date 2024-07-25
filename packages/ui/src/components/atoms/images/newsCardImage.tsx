interface NewsImageProps {
  src: string;
  alt: string;
}

export const NewsCardImage = ({ src, alt, }: NewsImageProps) => {
  return (
    <div>
      <img
        alt={alt}
        className="rounded-2xl object-cover w-full h-newsCardMobileHeight desktop:h-newsCardHeight"
        src={src}
      />
    </div>
  );
};

interface NewsImageProps {
  src: string;
  alt: string;
}

export const NewsCardImage = ({ src, alt, }: NewsImageProps) => {
  return (
    <div>
      <img
        alt={alt}
        className="rounded-2xl object-cover w-newsCardMobileWidth h-newsCardMobileHeight desktop:w-newsCardWidth desktop:h-newsCardHeight"
        src={src}
      />
    </div>
  );
};

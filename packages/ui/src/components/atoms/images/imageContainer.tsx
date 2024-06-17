import {cva} from "class-variance-authority";
import {cloneElement, ReactElement,} from "react";

interface ImageContainerProps {
  src: string
  alt: string
  size?: "avatar" | "avatarLg" | "chainLogo"
  className?: string
  imgClassName?: string
  component?: ReactElement
}

const imageContainerStyles = cva(
[],
{
  variants: {
    size: {
      avatar: "w-8 h-8 rounded-full",
      avatarLg: "w-12 h-12 rounded-full",
      chainLogo: "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "avatar",
  },
  },
)
export const ImageContainer = ({ size, src, alt, className, imgClassName, component, }: ImageContainerProps) => {
  return (
    <div
      className={imageContainerStyles({
        size,
        className,
      })}
    >
      {
        component ? cloneElement(component,
          {
            src,
            alt,
            className: imgClassName
          }) : (
          <img src={src} alt={alt}/>
        )
      }
    </div>
  )
}
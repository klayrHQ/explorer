import {cva} from "class-variance-authority";
import {cloneElement, ReactElement} from "react";
import {cls} from "../../../utils/functions.ts";

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
      avatar: "w-avatarWidth h-avatarHeight rounded-full",
      avatarLg: "w-avatarLgWidth h-avatarLgHeight rounded-full",
      chainLogo: "w-chainLogoWidth h-chainLogoHeight",
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
            className: cls([
              "w-full h-full",
              imgClassName,
            ]),
          }) : (
          <img alt={alt} src={src}/>
        )
      }
    </div>
  )
}
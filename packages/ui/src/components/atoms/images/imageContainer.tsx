import {cva} from "class-variance-authority";
import {cloneElement, ReactElement} from "react";
import {cls} from "../../../utils/functions.ts";

interface ImageContainerProps {
  src: string
  alt: string
  variant?: "avatar" | "avatarLg" | "chainLogo"
  className?: string
  imgClassName?: string
  component?: ReactElement
}

const imageContainerStyles = cva(
["overflow-hidden"],
{
  variants: {
    variant: {
      avatar: "w-avatarWidth h-avatarHeight rounded-full",
      avatarLg: "w-avatarLgWidth h-avatarLgHeight rounded-full",
      chainLogo: "w-chainLogoWidth h-chainLogoHeight",
    },
  },
  defaultVariants: {
    variant: "avatar",
  },
  },
)
export const ImageContainer = ({ variant, src, alt, className, imgClassName, component, }: ImageContainerProps) => {
  return (
    <div
      className={imageContainerStyles({
        variant,
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
import {FlexGrid} from "../base/flexGrid.tsx";
import {Typography} from "../base/typography.tsx";

export interface LogoProps {
  logoSrc: string
  logoFullSrc?: string
  altText: string
  logoText?: string
  minimized?: boolean
  className?: string
}

export const Logo = ({
  logoSrc = "",
  logoFullSrc,
  altText = "logo",
  logoText,
  minimized,
  className,
}: LogoProps) => {
  return (
    <FlexGrid className={className}>
      <img alt={altText} className={"h-logoImgHeight w-logoImgWidth mt-md mb-lxl"} src={!minimized && logoFullSrc ? logoFullSrc : logoSrc }/>
      {
        logoText && !minimized &&
        <Typography
          color={"onBackgroundDark"}
          component={"span"}
          fontWeight={"semibold"}
          variant={"logo"}
        >
          {logoText}
        </Typography>
      }
       {/* {
        logoText && !minimized &&
        <Typography
          color={"onBackgroundDark"}
          component={"span"}
          fontWeight={"semibold"}
          variant={"logo"}
        >
          {logoText}
        </Typography>
      } */}
    </FlexGrid>

  )
}

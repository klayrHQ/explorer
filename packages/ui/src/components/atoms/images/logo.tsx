import {FlexGrid} from "../base/flexGrid.tsx";
import {Typography} from "../base/typography.tsx";

export interface LogoProps {
  logoSrc: string
  altText: string
  logoText?: string
  minimized?: boolean
  className?: string
}

export const Logo = ({
  logoSrc = "",
  altText = "logo",
  logoText,
  minimized,
  className,
}: LogoProps) => {
  return (
    <FlexGrid className={className}>
      <img alt={altText} className={"h-logoImgHeight w-logoImgWidth mt-sm mb-lxl"} src={logoSrc}/>
      {
        logoText && !minimized &&
        <Typography
          component={"span"}
          fontWeight={"semibold"}
          variant={"logo"}
        >
          {logoText}
        </Typography>
      }
    </FlexGrid>

  )
}

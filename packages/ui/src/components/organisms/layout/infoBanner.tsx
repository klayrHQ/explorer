
import {ReactNode} from "react";
import {FlexGrid} from "../../atoms";

interface InfoBannerProps {
  children: ReactNode
}

export const InfoBanner = ({ children, }: InfoBannerProps) => {
  return (
    <FlexGrid alignItems={'center'} className={"bg-secondary text-onSecondary p-4"} justify={'center'}>
      {children}
    </FlexGrid>
  )
}
import {FlexGrid, MenuItemProps} from "../atoms";
import {Sidebar, Topbar} from "../organisms";
import {ReactNode} from "react";
import {ChainNetworkPickerProps} from "../molecules";
import {cls} from "../../utils/functions.ts";

interface LayoutProps {
  children: ReactNode
  logo: {
    logoSrc: string
    altText: string
    logoText: string
  }
  kpis: {
    keyValue: string | ReactNode
    contentValue: string | ReactNode
  }[]
  chainNetworkData: ChainNetworkPickerProps
  menuItems: MenuItemProps[]
  mobileMenuItems: Omit<MenuItemProps, "subMenu">[]
}

export const Layout = ({ children, logo, kpis, chainNetworkData, menuItems, mobileMenuItems, }: LayoutProps) => {
  return (
    <FlexGrid className={"bg-backgroundDark"} direction={"row"} gap={"0"}>
      <Sidebar logo={logo} menuItems={menuItems} />
      <FlexGrid className={"w-full"} direction={"col"} gap={"0"}>
        <Topbar chainNetworkData={chainNetworkData} kpis={kpis} logo={logo} mobileMenuItems={mobileMenuItems}/>
        <main
          className={cls([
            "w-full h-screenUnderTopbarMobile desktop:h-screenUnderTopbar bg-background p-3xl",
            "overflow-y-auto overflow-x-hidden",
            "border-t-backgroundSecondary border-t-1 border-solid",
            "desktop:border-l-backgroundSecondary desktop:border-l-1",
            "desktop:rounded-tl-3xl",
          ])}
        >
          {children}
        </main>
      </FlexGrid>
    </FlexGrid>
  )
};
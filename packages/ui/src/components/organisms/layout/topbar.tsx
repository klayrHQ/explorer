"use client"
import {
  FlexGrid,
  // Icon,
  IconButton,
  KeyValueComponent,
  Logo, MenuItemProps,
  // MenuItemProps,
  // NotificationIcon,
} from "../../atoms";
import {Search} from "../search/search.tsx";
import React, {
  ReactNode,
  useState,
} from "react";
import {
  ChainNetworkPicker,
  ChainNetworkPickerProps, MobileMenu,
  // OptionsMenu,
} from "../../molecules";
import {cls} from "../../../utils/functions.ts";
import {Popper} from "@mui/base";
//import {ClickAwayListener} from "@mui/base";

interface TopbarProps {
  logo: {
    logoSrc: string
    altText: string
  }
  kpis: {
    keyValue: string | ReactNode
    contentValue: string | ReactNode
  }[]
  chainNetworkData: ChainNetworkPickerProps
  mobileMenuItems: Omit<MenuItemProps, "subMenu">[]
  // newFavourite?: boolean
  // optionsMenuItems: MenuItemProps[]
}
export const Topbar = ({
  kpis,
  chainNetworkData,
  mobileMenuItems,
  // newFavourite,
  // optionsMenuItems,
  logo,
}: TopbarProps) => {
  // const [openOptionsMenu, setOpenOptionsMenu] = useState(false)
  // const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  
  return (
    <FlexGrid
      alignItems={"center"}
      className={cls([
        "w-full h-topbarMobileHeight desktop:h-topbarHeight bg-gray-8 p-3xl desktop:pl-0 dekstop:py-0 pr-3xl",
        "gap-4 desktop:gap-8",
      ])}
      component={"header"}
      justify={"between"}
    >
      <FlexGrid className={"desktop:hidden"} gap={"3xl"}>
        <Logo altText={logo.altText} className={"shrink-0"} logoSrc={logo.logoSrc} />
        {/*<IconButton align={"none"} className={"shrink-0"} icon={"SearchLg"} variant={"bordered"} />*/}
      </FlexGrid>
      <FlexGrid className={"desktop:hidden whitespace-nowrap"} gap={"md"}>
        {
          kpis.map((item, index) => (
            <KeyValueComponent key={`key-value-${index + 1}`} {...item} />
          ))
        }
        <div className={"relative"}>
          <IconButton
            active={openMobileMenu}
            align={"none"}
            icon={"Menu"}
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            variant={"bordered"}
          />
          <Popper open={openMobileMenu}>
            <MobileMenu
              chainNetworkData={chainNetworkData}
              className={"absolute top-topbarMobileHeight left-0"}
              menuItems={mobileMenuItems}
            />
          </Popper>
        </div>
      </FlexGrid>
      <Search className={"hidden desktop:hidden"} />
      <FlexGrid className={"w-full hidden desktop:flex whitespace-nowrap"} gap={"1.5xl"} justify={"end"}>
        {
          kpis.map((item, index) => (
            <KeyValueComponent key={`key-value-${index + 1}`} {...item} />
          ))
        }
        <ChainNetworkPicker {...chainNetworkData} />
        {/*<FlexGrid gap={"md"}>*/}
          {/* todo uncomment when adding favourites */}
          {/*<div className={"relative"}>
            <IconButton
              align={"none"}
              icon={"Heart"}
              title={"favourites"}
              variant={"iconOnly"}
            />
            {newFavourite && <NotificationIcon className={"absolute top-0 right-0 pointer-events-none"} />}
          </div>*/}
          {/* todo uncomment when adding lightmode or currency settings */}
          {/*<ClickAwayListener onClickAway={() => setOpenOptionsMenu(false)}>
            <div ref={setAnchorElement}>
              <IconButton
                align={"none"}
                icon={"Settings"}
                onClick={() => setOpenOptionsMenu(!openOptionsMenu)}
                variant={"iconOnly"}
              />
              <OptionsMenu
                anchorElement={anchorElement}
                menuItems={optionsMenuItems}
                open={openOptionsMenu}
              />
            </div>
          </ClickAwayListener>*/}
        {/*</FlexGrid>*/}
      </FlexGrid>
    </FlexGrid>
  )
}
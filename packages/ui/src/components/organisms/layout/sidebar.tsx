"use client"
import {MainMenu} from "../../molecules";
import {
  /*Button,
  Icon,*/
  IconButton,
  FlexGrid,
  Logo,
  LogoProps,
  MenuItemProps,
} from "../../atoms";
import {useState} from "react";
import {cls} from "../../../utils/functions.ts";

interface SidebarProps {
  menuItems: MenuItemProps[]
  logo: LogoProps
}

export const Sidebar = ({ menuItems, logo, }: SidebarProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleMinimized = () => setIsMinimized(!isMinimized);

  return (
    <FlexGrid
      className={cls([
        "h-screen bg-gray-8 gap-8 relative hidden desktop:flex",
        "transition-all duration-200 ease-in-out",
        isMinimized ? "w-sidebarMinWidth px-sidebarMinSpacing py-6" : "w-sidebarWidth p-6",
      ])}
      direction={"column"}
    >
      <Logo {...logo} className={isMinimized ? "mx-auto" : ""} minimized={isMinimized} />
      <MainMenu menuItems={menuItems} minimized={isMinimized} />
      <IconButton
        className={"absolute top-0 bottom-0 sidebarBp:top-auto sidebarBp:bottom-3xl right-0 my-auto h-max"}
        icon={isMinimized ? "ChevronRightDouble" : "ChevronLeftDouble"}
        onClick={toggleMinimized}
        variant={"iconOnlyAlt"}
      />
      {/* Uncomment when implementing login functionality */}
      {/*<Button
        align={"left"}
        className={"mt-auto"}
        fullWidth
        iconOnly={isMinimized}
        label={isMinimized ? <Icon color={"onPrimary"} icon={"LogIn"} /> : "Login"}
      />*/}
    </FlexGrid>
  )
}
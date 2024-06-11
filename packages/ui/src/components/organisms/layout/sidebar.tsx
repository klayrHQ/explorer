import {MainMenu} from "../../molecules";
import {Button, MenuItemProps} from "../../atoms";
import {FlexGrid} from "../../atoms/base/FlexGrid.tsx";
import {Logo} from "../../atoms/images/logo.tsx";

interface SidebarProps {
  menuItems: MenuItemProps[]
}

export const Sidebar = ({ menuItems, }: SidebarProps) => {


  return (
    <FlexGrid className={"w-sidebarWidth h-screen bg-gray-8 p-6 gap-8"} direction={"column"}>
      <Logo />
      <MainMenu menuItems={menuItems} minimized={false} />
      <Button className={"mt-auto"} fullWidth label={"Login"} />
    </FlexGrid>
  )
}
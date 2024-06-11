import {MenuItem, MenuItemProps} from "../../atoms";

interface MainMenuProps {
  menuItems: MenuItemProps[]
  minimized?: boolean
}

export const MainMenu = ({
  menuItems,
  minimized,
}: MainMenuProps) => {

  return (
    <ul className={"p-xl bg-gray-8"}>
      {menuItems.map((item, index) => (
        <MenuItem key={`menu-item-${index + 1}`} minimized={minimized} {...item} />
      ))}
    </ul>
  )
}
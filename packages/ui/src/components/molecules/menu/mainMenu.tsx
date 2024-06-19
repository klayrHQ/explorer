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
    <nav>
      <ul className={"bg-gray-8 w-full"}>
        {menuItems.map((item, index) => (
          <MenuItem key={`menu-item-${index + 1}`} minimized={minimized} {...item} />
        ))}
      </ul>
    </nav>
  )
}
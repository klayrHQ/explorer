import {MenuItem, MenuItemProps} from "../../atoms";
import {Popper} from "@mui/base";

interface SubMenuProps {
  menuItems: MenuItemProps[]
  open: boolean
  anchorElement: HTMLElement | null
}

export const SubMenu = ({
  menuItems,
  open,
  anchorElement,
}: SubMenuProps) => {

  return (
    <Popper
      anchorEl={anchorElement}
      className={"pl-md"}
      open={open}
      placement={"right-start"}
    >
      <ul className={"bg-gray-8 border-solid border-gray-7 border rounded-md min-w-48 shadow-md shadow-shadow-gray-6"}>
        {menuItems.map((item, index) => (
          <MenuItem key={`menu-item-${index + 1}`} {...item} />
        ))}
      </ul>
    </Popper>
  )
}
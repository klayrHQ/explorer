import {Popper} from "@mui/base";
import {FlexGrid, MenuItem, MenuItemProps} from "../../atoms";

interface OptionsMenuProps {
  menuItems: MenuItemProps[]
  open: boolean
  anchorElement: HTMLElement | null
}

export const OptionsMenu = ({ menuItems, open, anchorElement, }: OptionsMenuProps) => {
  return (
    <Popper
      anchorEl={anchorElement}
      open={open}
      placement={"bottom-end"}
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 14],
            },
          },
        ],
      }}
    >
      <FlexGrid
        className={"bg-gray-8 border-solid border-gray-7 border rounded-md min-w-48 shadow-md shadow-shadow-gray-6"}
        direction={"col"}
        gap={"1"}
      >
        {
          menuItems.map(({label, icon,}, index) => (
            <MenuItem icon={icon} key={`option-${index + 1}`} label={label} variant={"small"} />
          ))
        }
      </FlexGrid>
    </Popper>
  )
}
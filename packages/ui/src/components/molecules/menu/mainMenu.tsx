import {MenuItem, MenuItemProps} from "../../atoms";

interface MainMenuProps {
    menuItems: MenuItemProps[]
}

export const MainMenu = ({
    menuItems,
}: MainMenuProps) => {

    return (
        <ul>
            {menuItems.map((item, index) => (
                <MenuItem icon={item.icon} key={`menu-item-${index + 1}`} label={item.label} />
            ))}
        </ul>
    )
}
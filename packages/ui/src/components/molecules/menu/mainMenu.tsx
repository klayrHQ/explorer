import {FlexGrid, MenuItem, MenuItemProps} from '../../atoms';

interface MainMenuProps {
  menuItems: MenuItemProps[];
  minimized?: boolean;
  basePath: string;
}

export const MainMenu = ({ menuItems, minimized, basePath }: MainMenuProps) => {
  return (
    <nav className={'w-full'}>
      <FlexGrid className={'bg-gray-8 w-full'} component={'ul'} direction={'col'} gap={'md'}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={`menu-item-${index + 1}`}
            minimized={minimized}
            basePath={basePath}
            {...item}
          />
        ))}
      </FlexGrid>
    </nav>
  );
};

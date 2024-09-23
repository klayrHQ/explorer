import { MenuItem, MenuItemProps, FlexGrid } from '../../atoms';
import { Popper } from '@mui/base';

interface SubMenuProps {
  menuItems: MenuItemProps[];
  open: boolean;
  anchorElement: HTMLElement | null;
  basePath?: string;
}

export const SubMenu = ({ menuItems, open, anchorElement, basePath }: SubMenuProps) => {
  return (
    <Popper anchorEl={anchorElement} className={'pl-md'} open={open} placement={'right-start'}>
      <FlexGrid
        className={
          'bg-gray-8 border-solid border-gray-7 border rounded-md min-w-48 shadow-md shadow-shadow-gray-6 overflow-hidden'
        }
        component={'ul'}
        direction={'col'}
        gap="md"
      >
        {menuItems.map((item, index) => (
          <MenuItem basePath={basePath} key={`menu-item-${index + 1}`} square {...item} />
        ))}
      </FlexGrid>
    </Popper>
  );
};

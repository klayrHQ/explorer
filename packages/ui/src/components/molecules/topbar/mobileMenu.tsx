import { FlexGrid, MenuItem, MenuItemProps } from '../../atoms';
import { ChainNetworkPicker, ChainNetworkPickerProps } from './chainNetworkPicker.tsx';
import { cls } from '../../../utils/functions.ts';

interface MobileMenuProps {
  className?: string;
  menuItems: Omit<MenuItemProps, 'subMenu'>[];
  chainNetworkData: ChainNetworkPickerProps;
  onClose?: () => void;
  basePath?: string;
}

export const MobileMenu = ({
  className,
  menuItems,
  chainNetworkData,
  onClose,
  basePath,
}: MobileMenuProps) => {
  return (
    <FlexGrid
      className={cls(['bg-backgroundDark p-3xl w-screen h-screenUnderTopbarMobile', className])}
      direction={'col'}
    >
      <nav className={'w-full'}>
        <FlexGrid component={'ul'} direction={'col'} gap={'md'}>
          {menuItems.map((item, index) => (
            <MenuItem basePath={basePath} key={`mobile-menu-item-${index + 1}`} onClick={onClose} {...item} />
          ))}
        </FlexGrid>
      </nav>
      <FlexGrid
        className={
          'w-full mt-auto border-t-solid border-t-1 border-t-backgroundSecondary pt-3xl px-md'
        }
        justify={'center'}
        mobileDirection={'row'}
      >
        <ChainNetworkPicker {...chainNetworkData} />
      </FlexGrid>
    </FlexGrid>
  );
};

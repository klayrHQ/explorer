import { FlexGrid, Link, MenuItem, MenuItemProps, NotificationIcon, IconButton } from '../../atoms';
import { ChainNetworkPicker, ChainNetworkPickerProps } from './chainNetworkPicker.tsx';
import { cls } from '../../../utils/functions.ts';
import React from 'react';

interface MobileMenuProps {
  className?: string;
  menuItems: Omit<MenuItemProps, 'subMenu'>[];
  chainNetworkData: ChainNetworkPickerProps;
  onClose?: () => void;
  basePath?: string;
  newFavourite?: boolean;
}

export const MobileMenu = ({
  className,
  menuItems,
  chainNetworkData,
  onClose,
  basePath,
  newFavourite,
}: MobileMenuProps) => {
  return (
    <FlexGrid
      className={cls(['bg-backgroundDark p-3xl w-screen h-screenUnderTopbarMobile', className])}
      direction={'col'}
    >
      <nav className={'w-full'}>
        <FlexGrid component={'ul'} direction={'col'} gap={'md'}>
          {menuItems.map((item, index) => (
            <MenuItem
              basePath={basePath}
              key={`mobile-menu-item-${index + 1}`}
              onClick={onClose}
              {...item}
            />
          ))}
        </FlexGrid>
      </nav>
      <FlexGrid
        alignItems={'center'}
        className={
          'w-full mt-auto border-t-solid border-t-1 border-t-backgroundSecondary pt-3xl px-md'
        }
        justify={'between'}
        mobileDirection={'row'}
      >
        <Link basePath={basePath} href={'/favourites'} onClick={onClose}>
          <div className={'relative'}>
            <IconButton align={'none'} icon={'Heart'} title={'favourites'} variant={'iconOnly'} />
            {newFavourite && (
              <NotificationIcon
                className={'absolute top-0 right-0 pointer-events-none'}
                notificationValue={'!'}
              />
            )}
          </div>
        </Link>
        <ChainNetworkPicker {...chainNetworkData} />
        <div className={'w-iconButtonWidth'} />
      </FlexGrid>
    </FlexGrid>
  );
};

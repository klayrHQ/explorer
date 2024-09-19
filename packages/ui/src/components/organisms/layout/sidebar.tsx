'use client';
import { MainMenu } from '../../molecules';
import {
  /*Button,
  Icon,*/
  IconButton,
  FlexGrid,
  Logo,
  LogoProps,
  MenuItemProps,
} from '../../atoms';
import { useState, useEffect } from 'react';
import { cls } from '../../../utils/functions.ts';

interface SidebarProps {
  menuItems: MenuItemProps[];
  logo: LogoProps;
  basePath: string;
}

export const Sidebar = ({ menuItems, logo, basePath }: SidebarProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarMinimized');
    if (savedState !== null) {
      setIsMinimized(JSON.parse(savedState));
    }
  }, []);

  const toggleMinimized = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('sidebarMinimized', JSON.stringify(newState));
  };

  return (
    <FlexGrid
      className={cls([
        'h-screen bg-gray-8 gap-8 relative hidden desktop:flex',
        'transition-all duration-200 ease-in-out',
        isMinimized
          ? 'w-sidebarMinWidth px-sidebarMinSpacing py-6 items-center'
          : 'min-w-sidebarWidth w-1/5 max-w-sidebarMaxWidth  p-6',
      ])}
      direction={'col'}
    >
      <Logo
        {...logo}
        className={isMinimized ? ' items-center justify-center' : ''}
        minimized={isMinimized}
      />
      <MainMenu basePath={basePath} menuItems={menuItems} minimized={isMinimized} />
      <IconButton
        className={
          'absolute top-0 bottom-0 sidebarBp:top-auto sidebarBp:bottom-3xl right-0 my-auto h-max'
        }
        icon={isMinimized ? 'ChevronRightDouble' : 'ChevronLeftDouble'}
        onClick={toggleMinimized}
        variant={'iconOnlyAlt'}
      />
      {/* Uncomment when implementing login functionality */}
      {/*<Button
        align={"left"}
        className={"mt-auto"}
        fullWidth
        iconOnly={isMinimized}
        label={isMinimized ? <Icon color={"onPrimary"} icon={"LogIn"} /> : "Login"}
      />*/}
    </FlexGrid>
  );
};

'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '../base/typography';
import { cva } from 'class-variance-authority';
import { Icon } from '../images/icon.tsx';
import { IconComponent } from '../../../types/types.ts';
import { SubMenu } from '../../molecules';
import { cls } from '../../../utils/functions.ts';
import { usePathname } from 'next/navigation';
import { Link } from './link.tsx';

export interface MenuItemProps {
  label: string | React.ReactNode;
  active?: boolean;
  hovered?: boolean;
  disabled?: boolean;
  minimized?: boolean;
  icon: IconComponent;
  subMenu?: MenuItemProps[];
  className?: string;
  href?: string;
  variant?: 'default' | 'small';
  square?: boolean;
  onClick?: () => void;
  basePath?: string;
}

const menuItemStyles = cva(
  ['flex items-center', 'p-lxl', 'group', 'transition-all duration-200 ease-in-out'],
  {
    variants: {
      minimized: {
        true: 'w-minimizedMenuItemWidth',
        false: 'w-full',
      },
      active: {
        true: 'bg-gray-7',
      },
      hovered: {
        true: 'bg-gray-7',
      },
      disabled: {
        true: 'text-gray-1 hover:text-gray-1 grayscale-6 cursor-not-allowed',
        false: 'text-gray-4 hover:text-gray-1 hover:bg-gray-7 cursor-pointer',
      },
      variant: {
        default: 'h-menuItemHeight',
        small: 'h-menuItemSmallHeight',
      },
      square: {
        true: '',
        false: 'rounded-xs',
      },
    },
  },
);

export const MenuItem = ({
  label,
  active = false,
  hovered = false,
  disabled = false,
  minimized = false,
  icon,
  subMenu,
  className,
  href,
  variant = 'default',
  square = false,
  onClick,
  basePath,
}: MenuItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const currentPath = usePathname();

  // Remove the basePath from the current path
  const pathWithoutBase = basePath ? currentPath.replace(basePath, '') : currentPath;

  const firstPartOfPathWithoutBase = pathWithoutBase.split('/')[1];
  const firstPartOfHref = basePath
    ? href?.replace(basePath, '').split('/')[1]
    : href?.split('/')[1];
  const isActive = href
    ? firstPartOfPathWithoutBase === firstPartOfHref ||
      (!firstPartOfPathWithoutBase && !firstPartOfHref)
    : false;

  const handleHover = (event: React.MouseEvent<HTMLElement>, open: boolean) => {
    if (open) {
      setIsSubMenuOpen(true);
      setAnchorElement(event.currentTarget);
    } else {
      setIsSubMenuOpen(false);
      setAnchorElement(null);
    }
  };

  const menuItemInnerComponents = (
    <Typography
      className={'inline-flex items-center gap-3 w-full '}
      color={'inherit'}
      fontWeight={'semibold'}
    >
      <div className={variant === 'default' ? 'w-menuIconWidth' : 'w-menuIconSmallWidth'}>
        <Icon
          className={'group-hover:text-gray-1'}
          color={'gray-5'}
          icon={icon}
          size={variant === 'default' ? 'medium' : 'xs'}
        />
      </div>
      {!minimized && (
        <>
          <span className={cls(['overflow-hidden', minimized ? 'w-0' : 'w-max'])}>{label}</span>
          {subMenu && <Icon className={'ml-auto'} icon={'ChevronRight'} size={'small'} />}
        </>
      )}
    </Typography>
  );

  return href ? (
    <li
      className={'h-max flex w-full'}
      onMouseEnter={(event) => handleHover(event, true)}
      onMouseLeave={(event) => handleHover(event, false)}
      onClick={onClick}
    >
      <Link
        basePath={basePath}
        className={menuItemStyles({
          active: isActive,
          hovered,
          disabled,
          className,
          minimized,
          variant,
          square,
        })}
        href={href}
      >
        {menuItemInnerComponents}
        {subMenu && (
          <SubMenu
            anchorElement={anchorElement}
            basePath={basePath}
            menuItems={subMenu}
            open={isSubMenuOpen}
          />
        )}
      </Link>
    </li>
  ) : (
    <li
      className={menuItemStyles({
        active: isActive,
        hovered,
        disabled,
        className,
        minimized,
        variant,
        square,
      })}
      onMouseEnter={(event) => handleHover(event, true)}
      onMouseLeave={(event) => handleHover(event, false)}
      onClick={onClick}
    >
      {menuItemInnerComponents}
      {subMenu && (
        <SubMenu
          anchorElement={anchorElement}
          basePath={basePath}
          menuItems={subMenu}
          open={isSubMenuOpen}
        />
      )}
    </li>
  );
};

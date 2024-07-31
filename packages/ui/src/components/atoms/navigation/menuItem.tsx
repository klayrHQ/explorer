'use client';
import React, { useState } from 'react';
import { Typography } from '../base/typography';
import { cva } from 'class-variance-authority';
import { Icon } from '../images/icon.tsx';
import { IconComponent } from '../../../types/types.ts';
import { SubMenu } from '../../molecules';
import { cls } from '../../../utils/functions.ts';
import { Link } from './link.tsx';
import { usePathname } from 'next/navigation';

export interface MenuItemProps {
  label: string | React.ReactNode;
  active?: boolean;
  hovered?: boolean;
  disabled?: boolean;
  minimized?: boolean;
  icon: IconComponent;
  subMenu?: MenuItemProps[];
  className?: string;
  linkComponent?: React.PropsWithChildren<React.ReactElement>;
  href?: string;
  variant?: 'default' | 'small';
  square?: boolean;
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
  linkComponent,
  href,
  variant = 'default',
  square = false,
}: MenuItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const currentPath = usePathname();

  const firstPartOfCurrentPath = currentPath.split('/')[1];
  const firstPartOfHref = href?.split('/')[1];
  const isActive = firstPartOfCurrentPath === firstPartOfHref;

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
      className={'inline-flex items-center gap-3 w-full'}
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
    <Link className={'h-max flex'} component={linkComponent} href={href}>
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
      >
        {menuItemInnerComponents}
        {subMenu && (
          <SubMenu anchorElement={anchorElement} menuItems={subMenu} open={isSubMenuOpen} />
        )}
      </li>
    </Link>
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
    >
      {menuItemInnerComponents}
      {subMenu && (
        <SubMenu anchorElement={anchorElement} menuItems={subMenu} open={isSubMenuOpen} />
      )}
    </li>
  );
};

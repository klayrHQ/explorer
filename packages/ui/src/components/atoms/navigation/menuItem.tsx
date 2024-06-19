"use client";
import React, {cloneElement, useState} from 'react';
import {Typography} from "../base/typography";
import {cva} from "class-variance-authority";
import {Icon} from "../images/icon.tsx";
import {IconComponent} from "../../../types/types.ts";
import {SubMenu} from "../../molecules";
import {cls} from "../../../utils/functions.ts";

export interface MenuItemProps {
  label: string | React.ReactNode
  active?: boolean
  hovered?: boolean
  disabled?: boolean
  minimized?: boolean
  icon: IconComponent
  subMenu?: MenuItemProps[]
  className?: string
  linkComponent?: React.PropsWithChildren<React.ReactElement>
  variant?: "default" | "small"
  square?: boolean
}

const menuItemStyles = cva(
  [
    "flex items-center",
    "p-lxl",
    "group",
    "transition-all duration-200 ease-in-out",
  ],
  {
    variants: {
      minimized: {
        true: "w-minimizedMenuItemWidth",
        false: "w-full",
      },
      active: {
        true: "bg-gray-7",
      },
      hovered: {
        true: "bg-gray-7",
        false: "bg-transparent",
      },
      disabled: {
        true: "text-gray-1 hover:text-gray-1 grayscale-6 cursor-not-allowed",
        false: "text-gray-4 hover:text-gray-1 hover:bg-gray-7 cursor-pointer",
      },
      variant: {
        default: "h-menuItemHeight",
        small: "h-menuItemSmallHeight",
      },
      square: {
        true: "",
        false: "rounded-xs",
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
  variant = "default",
  square = false,
}: MenuItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const handleHover = (event: React.MouseEvent<HTMLElement>, open: boolean) => {
    if (open) {
      setIsSubMenuOpen(true);
      setAnchorElement(event.currentTarget);
    } else {
      setIsSubMenuOpen(false);
      setAnchorElement(null);
    }
  }

  const menuItemInnerComponents =  (
    <Typography
      className={"inline-flex items-center gap-2 leading-none w-full"}
      color={"inherit"}
      fontWeight={"semibold"}
    >
      <div className={variant === "default" ? "w-menuIconWidth" : "w-menuIconSmallWidth"}>
        <Icon className={"group-hover:text-gray-1"} color={"gray-5"} icon={icon} size={variant === "default" ? "medium" : "xs"}/>
      </div>
      {
        !minimized && (
          <>
            <span
              className={cls([
                "pt-xs transition-all duration-200 ease-in-out overflow-hidden",
                minimized ? "w-0" : "w-max",
              ])}
            >
              {label}
            </span>
            {subMenu && <Icon className={"ml-auto"} icon={"ChevronRight"} size={"small"}/>}
          </>
        )
      }
    </Typography>
  );

  return (
    <li
      className={menuItemStyles({
        active,
        hovered,
        disabled,
        className,
        minimized,
        variant,
        square,
      })}
      onMouseEnter={(event) => handleHover(event,true)}
      onMouseLeave={(event) => handleHover(event,false)}
    >
      {linkComponent ? (
        cloneElement(linkComponent, {
          children: menuItemInnerComponents,
          className: "h-max flex",
        })
      ) : (
        menuItemInnerComponents
      )}
      {subMenu && (
        <SubMenu anchorElement={anchorElement} menuItems={subMenu} open={isSubMenuOpen} />
      )}
    </li>
  );
};

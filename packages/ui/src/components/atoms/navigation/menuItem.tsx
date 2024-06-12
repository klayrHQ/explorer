"use client";
import React, {cloneElement, useState} from 'react';
import {Typography} from "../base/typography";
import {cva} from "class-variance-authority";
import {Icon} from "../images/icon.tsx";
import {IconComponent} from "../../../types/types.ts";
import {SubMenu} from "../../molecules";

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
}

const menuItemStyles = cva(
    [
        "rounded-md",
        "flex items-center",
        "h-menuItemHeight w-full",
        "p-lxl",
        "group",
    ],
    {
        variants: {
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
      <Icon className={"group-hover:text-gray-1"} color={"gray-5"} icon={icon} size={"medium"}/>
      {
        !minimized && (
          <>
            <span className={"pt-sm"}>{label}</span>
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

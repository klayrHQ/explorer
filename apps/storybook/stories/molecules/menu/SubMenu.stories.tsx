import type { StoryObj } from '@storybook/react';
import { SubMenu } from '@repo/ui/molecules';
import {MenuItem} from "@repo/ui/atoms";
import {useEffect, useState} from "react";

const meta = {
  title: 'Molecules/Menu/SubMenu',
  component: SubMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const subMenu = [
  {
    label: 'Users',
    icon: 'Users',
  },
  {
    label: 'Validators',
    icon: 'Flag',
  },
  {
    label: 'Blocks',
    icon: 'Cube',
  },
  {
    label: 'Tokens',
    icon: 'CryptoCurrency',
  },
  {
    label: 'Nodes',
    icon: 'MarkerPin',
  },
];

const Template: Story = {
  render: (args) => {
    const [anchorElement, setAnchorElement] = useState<Element | null>(null)

    useEffect(() => {
      setAnchorElement(document.querySelector(".subMenu-container"));
    }, []);

    return (
      <div className={"subMenu-container ml-[-120px] w-[5px] h-[200px]"}>
        <SubMenu {...args} anchorElement={anchorElement as HTMLElement} />
      </div>
    )
  },
}

const MenuItemTemplate: Story = {
  render: (args) => (
    <div className={"w-[240px] h-[200px]"}>
      <MenuItem icon={"DataFlow"} label={"Blockchain"} subMenu={args.menuItems} />
    </div>
  ),
}

export const Default: Story = {
  ...Template,
  args: {
    menuItems: subMenu,
    open: true,
  },
};

export const WithMenuItem: Story = {
  ...MenuItemTemplate,
  args: {
    menuItems: subMenu,
  },
};

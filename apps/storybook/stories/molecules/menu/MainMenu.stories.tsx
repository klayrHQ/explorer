import type { StoryObj } from '@storybook/react';
import { MainMenu } from '@repo/ui/molecules';

const meta = {
  title: 'Molecules/Menu/MainMenu',
  component: MainMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className={"w-[240px]"}>
      <MainMenu {...args} />
    </div>
  ),
}

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'BarChartSquare',
  },
  {
    label: 'Transactions',
    icon: 'SwitchHorizontal',
  },
  {
    label: 'Stakes',
    icon: 'LayersThree',
  },
  {
    label: 'Chains',
    icon: 'Data',
  },
  {
    label: 'NFTs',
    icon: 'Image',
  },
];

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

export const Default: Story = {
  ...Template,
  args: {
    menuItems: [
      menuItems[0],
      {
        label: 'Blockchain',
        icon: 'DataFlow',
      },
      ...menuItems,
    ]
  },
};

export const Hovered: Story = {
  ...Template,
  args: {
    menuItems: [
      menuItems[0],
      {
        label: 'Blockchain',
        icon: 'DataFlow',
        hovered: true,
      },
      ...menuItems,
    ]
  },
};

export const Active: Story = {
  ...Template,
  args: {
    menuItems: [
      menuItems[0],
      {
        label: 'Blockchain',
        icon: 'DataFlow',
        active: true,
      },
      ...menuItems,
    ]
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    menuItems: [
      menuItems[0],
      {
        label: 'Blockchain',
        icon: 'DataFlow',
        disabled: true,
      },
      ...menuItems,
    ]
  },
};

export const WithSubmenu: Story = {
  ...Template,
  args: {
    menuItems: [
      menuItems[0],
      {
        label: 'Blockchain',
        icon: 'DataFlow',
        subMenu,
      },
      ...menuItems,
    ]
  },
};
import type { StoryObj } from '@storybook/react';
import {Sidebar} from "@repo/ui/organisms";
import LogoImg from "../../assets/images/logo.svg";

const meta = {
  title: 'Organisms/Layout/Sidebar',
  component: Sidebar,
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

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'BarChartSquare',
  },
  {
    label: 'Blockchain',
    icon: 'DataFlow',
    subMenu,
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

const Template: Story = {
  render: (args) => (
    <div className={"w-sidebarWidth"}>
      <Sidebar {...args} />
    </div>
  ),
}

export const Default: Story = {
  ...Template,
  args: {
    menuItems,
    logo: {
      logoText: 'klayr',
      logoSrc: LogoImg.src,
      altText: 'klayr logo',
    }
  },
};

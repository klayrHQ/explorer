import type { StoryObj } from '@storybook/react';
import {Sidebar} from "@repo/ui/organisms";
import LogoImg from "../../assets/images/logo.svg";
import {menuItems} from "@/stories/utils/mockup";

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
type Template = Omit<Story, "args">;

const Template: Template = {
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

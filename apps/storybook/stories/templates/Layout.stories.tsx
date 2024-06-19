import type { StoryObj } from '@storybook/react';
import {Layout} from "@repo/ui/templates";
import Logo from "@/stories/assets/images/logo.svg";
import {chainNetworkData, kpisObject, menuItems, mobileMenuItems} from "@/stories/utils/mockup";
import {Typography} from "@repo/ui/atoms";

const meta = {
  title: 'Templates/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    menuItems,
    mobileMenuItems,
    chainNetworkData,
    kpis: kpisObject,
    logo: {
      logoSrc: Logo.src,
      altText: "Logo",
      logoText: "klayr"
    },
    children: <Typography variant={"h2"} component={"h1"}>Content</Typography>,
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
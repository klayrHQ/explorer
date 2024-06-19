import type { StoryObj } from '@storybook/react';
import {Topbar} from "@repo/ui/organisms";
import Logo from "@/stories/assets/images/logo.svg";
import {chainNetworkData, kpisObject, mobileMenuItems, optionsMenuItems} from "@/stories/utils/mockup";

const meta = {
  title: 'Organisms/Layout/Topbar',
  component: Topbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    kpis: kpisObject,
    chainNetworkData,
    optionsMenuItems,
    mobileMenuItems: mobileMenuItems,
    logo: {
      logoSrc: Logo.src,
      altText: "Logo",
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};

/*export const NewFavourite: Story = {
  args: {
    newFavourite: true,
  },
};*/

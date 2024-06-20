import type { StoryObj } from '@storybook/react';
import { MobileMenu } from '@repo/ui/molecules';
import Logo from "@/stories/assets/images/logo.svg";
import {DefaultImageComponent} from "@/stories/utils/constants";
import {mobileMenuItems} from "@/stories/utils/mockup";

const meta = {
  title: 'Molecules/Topbar/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const Template: Template = {
  render: (args) => (
    <div className={"relative w-full desktop:w-[300px] h-screen"}>
      <MobileMenu {...args} className={"absolute top-topbarMobileHeight"} />
    </div>
  ),
}

export const Default: Story = {
  ...Template,
  args: {
    menuItems: mobileMenuItems,
    chainNetworkData: {
      currentChain: {
        chainName: "Klayr-main",
        chainId: "00000000",
        chainLogo: Logo.src,
      },
      currentNetwork: {
        networkName: "Testnet",
        networkId: "01000000",
        connected: true,
      },
      imgComponent: DefaultImageComponent,
    }
  },
};
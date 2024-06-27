import type { StoryObj } from '@storybook/react';
import { ImageContainer} from '@repo/ui/atoms';
import Logo from "@/stories/assets/images/logo.svg";
import {DefaultImageComponent} from "@/stories/utils/constants";

const meta = {
  title: 'Atoms/Images/ImageContainer',
  component: ImageContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Avatar: Story = {
  args: {
    src: Logo.src,
    alt: "Logo",
    component: DefaultImageComponent,
    variant: "avatar",
  },
};

export const AvatarLg: Story = {
  args: {
    src: Logo.src,
    alt: "Logo",
    component: DefaultImageComponent,
    variant: "avatarLg",
  },
};

export const ChainLogo: Story = {
  args: {
    src: Logo.src,
    alt: "Logo",
    component: DefaultImageComponent,
    variant: "chainLogo",
  },
};
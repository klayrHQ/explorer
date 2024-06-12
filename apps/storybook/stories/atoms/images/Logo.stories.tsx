import type { StoryObj } from '@storybook/react';
import { Logo } from '@repo/ui/atoms';
import LogoImg from "../../assets/images/logo.svg";

const meta = {
  title: 'Atoms/Images/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    logoSrc: LogoImg.src,
    altText: "placeholder",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    logoText: "klayr",
  },
};

export const WithoutText: Story = {
  args: {
    logoText: undefined
  },
};

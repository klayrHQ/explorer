import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qA0fiq9j4kxSra103XXHS7/Klayr?node-id=9-302&t=GHLRHUNDnCu43LkY-4",
    },
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: 'Button',
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

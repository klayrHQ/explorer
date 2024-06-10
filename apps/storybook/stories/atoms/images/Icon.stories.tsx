import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Icon } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Images/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { icon: "Users" },
  argType: {
    size: { description: "Scales with font-size, using inherit will adhere to parent font-size or alternatively you can set a custom font-size in the className prop" },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomSize: Story = {
  args: {
    size: "inherit",
    className: "text-display-1",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

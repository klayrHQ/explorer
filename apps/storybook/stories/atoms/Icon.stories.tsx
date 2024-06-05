import React from 'react';
import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Icon } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { icon: "Users" },
  argType: {
    size: { control: { type: 'select', options: ["small", "medium", "large"] } },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: "medium",
  },
};
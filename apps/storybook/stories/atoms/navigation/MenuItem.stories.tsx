import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MenuItem } from '@repo/ui/atoms';
import React from 'react';

const meta = {
  title: 'Atoms/Navigation/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    onClick: fn(),
    icon: 'BarChartSquare',
    label: 'Navigation',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Hovered: Story = {
  args: {
    hovered: true,
  },
};

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Minimized: Story = {
  args: {
    minimized: true,
  },
};

export const IsParent: Story = {
  args: {
    subMenu: [],
  },
};

export const HasLink: Story = {
  args: {
    href: '/',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    icon: 'CurrencyDollar',
    label: 'Enable Light mode',
  },
};

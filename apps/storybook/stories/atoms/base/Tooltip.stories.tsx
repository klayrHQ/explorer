import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {Tooltip} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Base/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Tooltip text',
    children: 'Hover me',
    placement: 'top',
  },
};

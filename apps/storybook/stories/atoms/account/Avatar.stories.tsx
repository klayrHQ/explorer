import type { StoryObj } from '@storybook/react';
import { Avatar } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Account/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    address: "klyrwwsnngamakd64af7nnyod2zswvwtj7aka8fur",
    size: 32,
    circle: true,
  },
};
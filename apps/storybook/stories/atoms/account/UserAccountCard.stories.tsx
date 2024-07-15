import type { StoryObj } from '@storybook/react';
import { UserAccountCard } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Account/UserAccountCard',
  component: UserAccountCard,
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
    name: "Duskhaze",
  },
};

export const WithoutName: Story = {
  args: {
    address: "klyrwwsnngamakd64af7nnyod2zswvwtj7aka8fur",
  },
};
import { StoryObj } from '@storybook/react';
import { SearchDesktop } from '@repo/ui/molecules';

const meta = {
  title: 'Molecules/SearchDesktop',
  component: SearchDesktop,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    query: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: 'Search block, user, transaction, chain, token...',
  },
};

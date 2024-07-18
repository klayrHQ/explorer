import { Pagination } from '@repo/ui/atoms';
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/Data/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 16,
    initialNumber: 1,
  },
};

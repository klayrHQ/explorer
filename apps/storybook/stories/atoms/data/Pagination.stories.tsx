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
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    initialNumber: 1,
  },
};

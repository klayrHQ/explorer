import type { StoryObj } from '@storybook/react';
import { TableCell, Typography } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Data/Table/TableCell',
  component: TableCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: <Typography>{"TableCell"}</Typography>,
  },
};
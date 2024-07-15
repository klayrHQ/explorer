import type { StoryObj } from '@storybook/react';
import { StatusTag } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Base/StatusTag',
  component: StatusTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: "success",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
  }
}

export const Failed: Story = {
  args: {
    status: "failed",
  }
}
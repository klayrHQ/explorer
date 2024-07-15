import type { StoryObj } from '@storybook/react';
import { TxDataPopover } from '@repo/ui/molecules';
import {IconButton, Popover} from "@repo/ui/atoms";

const meta = {
  title: 'Molecules/Data/TxDataPopover',
  component: TxDataPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    txData: {
      status: "success",
      data: "Example data",
      nonce: 123,
    },
  },
};

export const Pending: Story = {
  args: {
    txData: {
      status: "pending",
      data: "Example data",
      nonce: 123,
    },
  }
}

export const Failed: Story = {
  args: {
    txData: {
      status: "failed",
      data: "Example data",
      nonce: 123,
    },
  }
}
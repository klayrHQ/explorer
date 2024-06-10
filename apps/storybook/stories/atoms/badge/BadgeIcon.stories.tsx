import type { Meta, StoryObj } from '@storybook/react';
import { BadgeIcon } from '@repo/ui/atoms';

const meta: Meta<typeof BadgeIcon> = {
  title: 'Atoms/Badge/BadgeIcon',
  component: BadgeIcon,
  tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const VoltIcon: Story = {
  args: {
    colorVariant: "volt",
  },
};

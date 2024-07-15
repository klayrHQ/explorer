import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {Button, Popover} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Utilities/Popover',
  component: Popover,
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
    button: <Button label={"Open"} />,
    children: 'Hover me',
    placement: 'bottom',
  },
};

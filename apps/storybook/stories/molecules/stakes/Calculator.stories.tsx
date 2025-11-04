import { Meta, StoryObj } from '@storybook/react';
import { Calculator } from '@repo/ui/molecules';

const meta: Meta<typeof Calculator> = {
  title: 'Molecules/Stakes/Calculator',
  component: Calculator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: 'block', label: 'Block' },
      { value: 'day', label: 'Day' },
      { value: 'month', label: 'Month' },
      { value: 'year', label: 'Year' },
    ],
  },
};

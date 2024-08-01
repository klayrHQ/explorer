import type { StoryObj } from '@storybook/react';
import { DonutChart } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Data/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { id: 1, value: 50, label: 'Active' },
  { id: 2, value: 40, label: 'Standby' },
  { id: 3, value: 30, label: 'Ineligible' },
  { id: 4, value: 20, label: 'Banned' },
  { id: 5, value: 10, label: 'Punished' },
];

export const Default: Story = {
  args: {
    data,
  },
};

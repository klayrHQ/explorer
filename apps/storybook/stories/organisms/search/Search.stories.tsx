import type { StoryObj } from '@storybook/react';
import { Search } from '@repo/ui/organisms';

const meta = {
  title: 'Organisms/Search/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

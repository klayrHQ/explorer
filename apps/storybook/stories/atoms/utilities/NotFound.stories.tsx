import { StoryObj } from '@storybook/react';
import { NotFound } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Utilities/NotFound',
  component: NotFound,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerText: 'Not Found',
    subheaderText: 'The page you are looking for does not exist.',
  },
};

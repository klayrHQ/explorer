import type { StoryObj } from '@storybook/react';
import { SectionHeader } from '@repo/ui/organisms';

const meta = {
  title: 'Organisms/Layout/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Header',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id dui velit. Sed ligula nisl, tempor vel odio ac, varius rutrum diam. Cras tristique vulputate arcu, id aliquet ligula scelerisque semper.',
    count: 123,
  },
};

export const WithLink: Story = {
  args: {
    title: 'Section Header',
    href: '#',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Section Header',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id dui velit. Sed ligula nisl, tempor vel odio ac, varius rutrum diam. Cras tristique vulputate arcu, id aliquet ligula scelerisque semper.',
  },
};

export const WithCount: Story = {
  args: {
    title: 'Section Header',
    count: 123,
  },
};

import type { StoryObj } from '@storybook/react';
import {Link} from '@repo/ui/atoms';
import {DefaultLinkComponent} from "@/stories/utils/constants";

const meta = {
  title: 'Atoms/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Link",
    href: "#",
  },
};
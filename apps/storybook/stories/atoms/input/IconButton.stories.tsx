import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Input/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className={"w-[300px]"}>
      <IconButton {...args} />
    </div>
  ),
}

export const Primary: Story = {
  ...Template,
  args: {
    variant: "primary",
    icon: 'Users',
  },
};

export const Secondary: Story = {
  ...Template,
  args: {
    variant: "secondary",
    icon: 'Users',
  },
};

export const Tertiary: Story = {
  ...Template,
  args: {
    variant: "tertiary",
    icon: 'Users',
  },
};

export const SemiTransparent: Story = {
  ...Template,
  args: {
    variant: "semiTransparent",
    icon: 'Users',
  },
};

export const Transparent: Story = {
  ...Template,
  args: {
    variant: "transparent",
    icon: 'Users',
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    disabled: true,
    icon: 'Users',
  },
};

export const Hovered: Story = {
  ...Template,
  args: {
    hovered: true,
    icon: 'Users',
  },
};

import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@repo/ui/atoms';
import ButtonDesign from '../assets/figma-designs/button.png';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: "image",
      url: ButtonDesign.src,
    },
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className={"w-[300px]"}>
      <Button {...args} />
    </div>
  ),
}

export const Primary: Story = {
  ...Template,
  args: {
    variant: "primary",
    label: 'Button',
  },
};

export const Secondary: Story = {
  ...Template,
  args: {
    variant: "secondary",
    label: 'Button',
  },
};

export const Transparent: Story = {
  ...Template,
  args: {
    variant: "transparent",
    label: 'Button',
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    disabled: true,
    label: 'Button',
  },
};

export const Hovered: Story = {
  ...Template,
  args: {
    hovered: true,
    label: 'Button',
  },
};

export const Large: Story = {
  ...Template,
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  ...Template,
  args: {
    size: 'small',
    label: 'Button',
  },
};

import type { StoryObj } from '@storybook/react';
import {TextAreaField} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Input/TextAreaField',
  component: TextAreaField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const Template: Template = {
  render: (args) => (
    <div className={"w-[300px]"}>
      <TextAreaField {...args} />
    </div>
  ),
}

export const OnBgPrimary: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a textarea",
  },
};

export const OnBgSecondary: Story = {
  ...Template,
  args: {
    variant: "onBgSecondary",
    placeholder: "This is a textarea",
  },
};
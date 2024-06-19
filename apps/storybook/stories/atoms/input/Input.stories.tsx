import type { StoryObj } from '@storybook/react';
import {Input} from '@repo/ui/atoms';
import {cls} from "@repo/ui/utils";

const meta = {
  title: 'Atoms/Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const Template: Template = {
  render: (args) => (
    <div
      className={cls([
        "w-[350px] p-3xl",
        args.variant === "onBgPrimary" && "bg-backgroundPrimary",
        args.variant === "onBgSecondary" && "bg-backgroundSecondary",
      ])}
    >
      <Input {...args} />
    </div>
  ),
}

export const OnBgPrimary: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a textfield",
  },
};

export const OnBgSecondary: Story = {
  ...Template,
  args: {
    variant: "onBgSecondary",
    placeholder: "This is a textfield",
  },
};

export const WithLabel: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a textfield",
    label: "Label",
  },
};

export const TextArea: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a textarea",
    type: "textarea",
  },
};

export const WithIcon: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a textfield with an icon",
    icon: "SearchLg",
  },
};

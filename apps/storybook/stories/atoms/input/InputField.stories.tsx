import type { StoryObj } from '@storybook/react';
import {InputField} from '@repo/ui/atoms';
import {cls} from "@repo/ui/utils";

const meta = {
  title: 'Atoms/Input/InputField',
  component: InputField,
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
    <div
      className={cls([
        "w-[350px] p-3xl",
        args.variant === "onBgPrimary" && "bg-backgroundPrimary",
        args.variant === "onBgSecondary" && "bg-backgroundSecondary",
      ])}
    >
      <InputField {...args} />
    </div>
  ),
}

export const OnBgPrimary: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a text field",
  },
};

export const OnBgSecondary: Story = {
  ...Template,
  args: {
    variant: "onBgSecondary",
    placeholder: "This is a text field",
  },
};

export const WithIcon: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a text field with an icon",
    icon: "SearchLg",
  },
};

export const Number: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a number field",
    type: "number",
  },
};

export const Password: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is a password field",
    type: "password",
  },
};

export const Email: Story = {
  ...Template,
  args: {
    variant: "onBgPrimary",
    placeholder: "This is an email field",
    type: "email",
  },
};
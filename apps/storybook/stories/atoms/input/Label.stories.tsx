import type { StoryObj } from '@storybook/react';
import {Label} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Input/Label',
  component: Label,
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
      <Label {...args} />
    </div>
  ),
}

export const Default: Story = {
  ...Template,
  args: {
    //variant: "onBgPrimary",
    label: "Label example",
  },
};
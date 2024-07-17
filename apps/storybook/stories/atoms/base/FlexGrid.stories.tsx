import React from 'react';
import type { StoryObj } from '@storybook/react';
import {FlexGrid, Typography} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Base/FlexGrid',
  component: FlexGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, 'args'>;

const Template: Template = {
  render: (args) => (
    <FlexGrid {...args} className={"w-[400px] h-[400px]"}>
      <div className="w-16 h-16 bg-primary py-2 px-3"><Typography variant={"h2"} color={"onPrimary"}>1</Typography></div>
      <div className="w-16 h-16 bg-primary py-2 px-3"><Typography variant={"h2"} color={"onPrimary"}>2</Typography></div>
      <div className="w-16 h-16 bg-primary py-2 px-3"><Typography variant={"h2"} color={"onPrimary"}>3</Typography></div>
    </FlexGrid>
  ),
}

export const DirectionRow: Story = {
  ...Template,
  args: {
    direction: "row",
    children: [],
  },
};

export const DirectionColumn: Story = {
  ...Template,
  args: {
    direction: "col",
    children: [],
  },
};


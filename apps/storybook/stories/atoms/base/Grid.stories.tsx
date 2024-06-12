import React from 'react';
import type { StoryObj } from '@storybook/react';
import {Grid, Typography} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Base/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (cols: number) => {
  return {
    // @ts-ignore
    render: (args) => (
      <Grid {...args} className={"w-[400px] h-[400px]"}>
        {
          Array.from({length: cols}, (_, i) => (
            <div key={i} className="w-16 h-16 bg-primary py-2 px-3">
              <Typography variant={"h2"} color={"onPrimary"}>{i + 1}</Typography>
            </div>
          ))
        }
      </Grid>
    ),
  }
}

export const TwoColumns: Story = {
  ...Template(2),
  args: {
    columns: "3",
    children: [],
  },
}

export const ThreeColumns: Story = {
  ...Template(3),
  args: {
    columns: "3",
    children: [],
  },
}

export const FourColumns: Story = {
  ...Template(4),
  args: {
    columns: "4",
    children: [],
  },
}

export const FiveColumns: Story = {
  ...Template(5),
  args: {
    columns: "5",
    children: [],
  },
}

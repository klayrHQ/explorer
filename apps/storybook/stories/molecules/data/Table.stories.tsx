import type { StoryObj } from '@storybook/react';
import { Table } from '@repo/ui/molecules';
import {headCols, rows, rowsAlt} from "@/stories/utils/mockup";

const meta = {
  title: 'Molecules/Data/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, "args">;

const Template: Template =  {
  render: (args) => <div className={"max-w-screen"}><Table {...args} /></div>
};
export const Default: Story = {
  ...Template,
  args: {
    keyPrefix: "sb-table",
    rows,
    headCols,
  },
};

export const WithPremadeCells = {
  ...Template,
  args: {
    keyPrefix: "sb-table-2",
    rows: rowsAlt,
    headCols,
  }
}
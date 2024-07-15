import type { StoryObj } from '@storybook/react';
import {TableCell, TableRow, Typography} from '@repo/ui/atoms';
import {headCols, rows} from "@/stories/utils/mockup";

const meta = {
  title: 'Atoms/Data/Table/TableRow',
  component: TableRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: rows[0].cells.map((cell, index) => (
      <TableCell key={`sb-cell-${index + 1}`}>
        <Typography>{cell.children}</Typography>
      </TableCell>
    )),
  },
};

export const TableHead: Story = {
  args: {
    children: headCols.map((cell, index) => (
      <TableCell key={`sb-cell-${index + 1}`} type={"head"}>
        <Typography>{cell.children}</Typography>
      </TableCell>
    )),
  },
};
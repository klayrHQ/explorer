import type { StoryObj } from '@storybook/react';
import { TableContainer } from '@repo/ui/organisms';
import {headCols, rows} from "@/stories/utils/mockup";

const meta = {
  title: 'Organisms/Table/TableContainer',
  component: TableContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    keyPrefix: "sb-table",
    rows,
    headCols,
  },
};

export const WithPagination: Story = {
  args: {
    keyPrefix: "sb-table",
    rows,
    headCols,
    pagination: true,
  },
};

export const WithFilters: Story = {
  args: {
    keyPrefix: "sb-table",
    rows,
    headCols,
    filters: true,
  },
};

export const WithPaginationAndFilters: Story = {
  args: {
    keyPrefix: "sb-table",
    rows,
    headCols,
    pagination: true,
    filters: true,
  },
};
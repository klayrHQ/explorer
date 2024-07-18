import type { StoryObj } from '@storybook/react';
import { TableContainer } from '@repo/ui/organisms';
import { headCols, rows } from '@/stories/utils/mockup';

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
type Template = Omit<Story, 'args'>;

const Template: Template = {
  render: (args) => (
    <div className={'max-w-screen'}>
      <TableContainer {...args} />
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    keyPrefix: 'sb-table',
    rows,
    headCols,
    totalPages: 0,
  },
};

export const WithPagination: Story = {
  ...Template,
  args: {
    keyPrefix: 'sb-table',
    rows,
    headCols,
    pagination: true,
    totalPages: 15,
  },
};

export const WithFilters: Story = {
  ...Template,
  args: {
    keyPrefix: 'sb-table',
    rows,
    headCols,
    filters: true,
    totalPages: 0,
  },
};

export const WithPaginationAndFilters: Story = {
  ...Template,
  args: {
    keyPrefix: 'sb-table',
    rows,
    headCols,
    pagination: true,
    filters: true,
    totalPages: 15,
  },
};

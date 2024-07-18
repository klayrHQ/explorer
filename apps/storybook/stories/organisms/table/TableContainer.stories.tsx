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
  },
};

export const WithPagination: Story = {
  ...Template,
  args: {
    keyPrefix: 'sb-table',
    rows,
    headCols,
    pagination: true,
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};

export const WithFilters: Story = {
  ...Template,
  args: {
    keyPrefix: 'sb-table',
    rows,
    headCols,
    filters: true,
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
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};

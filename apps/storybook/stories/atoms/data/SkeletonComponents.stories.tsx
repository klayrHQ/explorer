import type { StoryObj } from '@storybook/react';
import {FlexGrid, SkeletonComponent, TableCell, TableRow} from '@repo/ui/atoms';

const meta = {
  title: 'Atoms/Data/SkeletonComponent',
  component: SkeletonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InSearchResult: Story = {
  render: () => (
    <FlexGrid className={"w-[200px]"}>
      <SkeletonComponent className={"shrink-0"} height="avatarMdHeight" width="avatarMdWidth" />
      <FlexGrid className={"w-full"} direction={"col"}>
        <SkeletonComponent height="3" width="full" />
        <SkeletonComponent height="3" width="full" />
      </FlexGrid>
    </FlexGrid>
  ),
  args: {
  }
};

export const InTableRow: Story = {
  render: () => (
    <TableRow className={"w-full"}>
      <TableCell className={"align-middle"}>
        <SkeletonComponent height="6" width="32" />
      </TableCell>
      <TableCell className={"align-middle"}>
        <SkeletonComponent height="6" width="32" />
      </TableCell>
      <TableCell className={"align-middle"}>
        <SkeletonComponent height="6" width="32" />
      </TableCell>
      <TableCell className={"align-middle"}>
        <SkeletonComponent height="6" width="32" />
      </TableCell>
      <TableCell className={"align-middle"}>
        <SkeletonComponent height="6" width="32" />
      </TableCell>
      <TableCell className={"align-middle"}>
        <SkeletonComponent height="6" width="32" />
      </TableCell>
    </TableRow>
  ),
  args: {}
};
import { SortingTitle, Typography } from '@repo/ui/atoms';
import { TableCellType } from '@repo/ui/types';

//TRANSACTIONS
export const transactionTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
): TableCellType[] => [
  {
    children: 'Transaction ID',
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="height"
        title="Height"
      />
    ),
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="timestamp"
        title="Date"
      />
    ),
  },
  {
    children: 'Type',
  },
  {
    children: 'From',
  },
  {
    children: 'To',
  },
  {
    children: 'Amount',
  },
  {
    children: 'Fee',
  },
];

export const eventsTableHead = [
  {
    children: <Typography variant={'paragraph-sm'}>{'Module'}</Typography>,
  },
  {
    children: <Typography variant={'paragraph-sm'}>{'Name'}</Typography>,
  },
];

//VALIDATORS
export const validatorsTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
): TableCellType[] => [
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="rank"
        title="Validator"
      />
    ),
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="nextAllocatedTime"
        title="Status"
      />
    ),
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="generatedBlocks"
          title="Total blocks"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="validatorWeight"
          title="Validator weight"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        {' '}
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="selfStake"
          title="Stake capacity"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Total stake'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="commission"
          title="Commission"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end">{'Total Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end flex-nowrap">{'Block Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end">{'Staking Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
];

export const validatorStakeIncomingTableHead: TableCellType[] = [
  {
    children: 'Account',
  },
  {
    children: 'Amount',
  },
];

export const validatorStakeOutgoingTableHead: TableCellType[] = [
  {
    children: 'Validator',
  },
  {
    children: 'Validator weight',
  },
  {
    children: 'Commission',
  },
  {
    children: 'Stake',
  },
];

export const validatorBlocksTableHead: TableCellType[] = [
  {
    children: 'Block ID',
  },
  {
    children: 'Height',
  },
  {
    children: 'Date',
  },
  {
    children: 'Transactions',
  },
  {
    children: 'Reward',
  },
];

export const validatorEventsTableHead: TableCellType[] = [
  {
    children: 'Date',
  },
  {
    children: 'Height',
  },
  {
    children: 'Module',
  },
  {
    children: 'Event',
  },
  {
    children: 'Amount',
  },
];

//STAKES
export const stakesOverviewTableHead: TableCellType[] = [
  {
    children: 'Stake ID',
  },
  {
    children: 'Date',
  },
  {
    children: 'From',
  },
  {
    children: 'Send stakes',
  },
];

export const stakesCalculatorTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
): TableCellType[] => [
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="rank"
        title="Validator"
      />
    ),
  },
  {
    children: 'Staking rewards',
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="nextAllocatedTime"
        title="Status"
      />
    ),
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="generatedBlocks"
          title="Total blocks"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="validatorWeight"
          title="Validator weight"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        {' '}
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="selfStake"
          title="Stake capacity"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex justify-end">{'Total stake'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="commission"
          title="Commission"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end">{'Total Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end flex-nowrap">{'Block Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: <div className="flex items-end justify-end">{'Staking Rewards'}</div>,
    className: 'items-end text-end whitespace-nowrap',
  },
];

//BLOCKS
export const blockTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
): TableCellType[] => [
  {
    children: 'Block ID',
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="height"
        title="Height"
      />
    ),
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="timestamp"
        title="Date"
      />
    ),
  },
  {
    children: 'Generator',
  },
  {
    children: 'Seed reveal',
  },
  {
    children: 'Transactions',
  },
  {
    children: 'Events',
  },
  {
    children: 'Assets',
  },
];

export const usersTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
): TableCellType[] => [
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="mock_data"
        title="#"
      />
    ),
  },
  {
    children: (
      <SortingTitle
        onSortChange={onSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
        sortValue="mock_data"
        title="User"
      />
    ),
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="mock_data"
          title="Total holding"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="mock_data"
          title="Available amount"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="mock_data"
          title="Locked amount"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="mock_data"
          title="Percentage of tokens"
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
];

import { SortingTitle, InfoTooltip, Typography, Icon } from '@repo/ui/atoms';
import { TableCellType } from '@repo/ui/types';

//TRANSACTIONS
export const transactionTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
  transactionStatus?: boolean,
): TableCellType[] => {
  const headers: TableCellType[] = [
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

  if (transactionStatus) {
    headers.splice(4, 0, { children: 'Status' });
  }

  return headers;
};

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
      <div className="flex gap-1 items-center">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="nextAllocatedTime"
          title="Status"
        />
        <InfoTooltip
          text={
            ' The current status of the validator and, if it’s a generator, the remaining time until the next block is generated.'
          }
        />
      </div>
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
      <div className="flex justify-end gap-1 items-center">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="validatorWeight"
          title="Validator weight"
        />
        <InfoTooltip
          text={
            'The total stake received by a validator, capped at a maximum of 10 times its own self-stake.'
          }
        />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex justify-end items-center gap-1">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="selfStake"
          title="Stake capacity"
        />
        <InfoTooltip
          text={
            'The percentage of the validator’s total stake relative to its maximum allowable weight.'
          }
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
      <div className="flex justify-end items-center gap-1">
        <SortingTitle
          onSortChange={onSortChange}
          sortField={sortField}
          sortOrder={sortOrder}
          sortValue="commission"
          title="Commission"
        />
        <InfoTooltip text={'The percentage of block rewards that a validator retains.'} />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex items-center justify-end gap-1">
        <Typography>{'Total Rewards'}</Typography>{' '}
        <InfoTooltip text={'The total rewards the validator has received.'} />
      </div>
    ),
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: (
      <div className="flex items-end justify-end flex-nowrap">
        <div className="flex items-center justify-end gap-1">
          <Typography>{'Block Rewards'}</Typography>{' '}
          <InfoTooltip
            text={'The current dynamic block reward a validator receives for validating a block.'}
          />
        </div>
      </div>
    ),
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

export const favouritesTableHead = [
  {
    children: 'User',
  },
  /*{
    children: 'Weight',
  },
  {
    children: 'Stake capacity',
  },
  {
    children: 'Total stake',
  },*/
];

export const accountsTableHead = (
  onSortChange: (column: string) => void,
  sortField: string,
  sortOrder: string,
): TableCellType[] => [
  {
    children: '#',
  },
  {
    children: 'User',
  },
  {
    children: 'Total holding',
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: 'Available amount',
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: 'Locked amount',
    className: 'items-end text-end whitespace-nowrap',
  },
  {
    children: 'Percentage of tokens',
    className: 'items-end text-end whitespace-nowrap',
  },
];

export const chainsTableHead = [
  {
    children: 'Name',
  },
  {
    children: 'Chain ID',
  },
  {
    children: 'Status',
  },
  {
    children: 'Created by',
  },
  {
    children: 'Escrow Balance',
  },
  {
    children: 'Last Certificate ',
  },
  {
    children: 'Last Updated',
  },
];

export const userTokensTableHead = [
  {
    children: 'Name',
  },
  {
    children: 'Total amount',
  },
  {
    children: 'Available amount',
  },
  {
    children: 'Locked amount',
  },
  {
    children: 'Claimable rewards',
  },
  {
    children: 'Active chain',
  },
];

export const tokensTableHead = [
  {
    children: 'Token',
  },
  {
    children: 'Active chain',
  },
  {
    children: 'Network',
  },
  {
    children: 'Description',
  },
];

export const nodesTableHead = [
  {
    children: 'IP address ',
  },
  {
    children: 'Port',
  },
  {
    children: 'Country       ',
  },
  {
    children: 'Version ',
  },
  {
    children: 'Height',
  },
  {
    children: 'Status',
  },
];

export const nftsTableHead = [
  {
    children: 'Title',
  },
  {
    children: 'Collection name',
  },
  {
    children: 'Price',
  },
  {
    children: 'Status',
  },
  {
    children: 'Rarity rank',
  },
  {
    children: 'Chain',
  },
];

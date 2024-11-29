import { FilterConfigType } from './filterTypes';

export const transactionFilterConfig: FilterConfigType[] = [
  {
    title: 'Transaction Type',
    type: 'checkbox' as 'checkbox',
    dataKey: 'moduleCommand',
    searchKey: 'moduleCommand',
  },
  {
    title: 'Sender Address',
    type: 'input' as 'input',
    dataKey: 'from',
    searchKey: 'senderAddress',
    inputProps: {
      placeholder: 'Type an address',
      validation: (value: string | any[]) => value.length === 41,
      errorMessage: 'Invalid sender address',
    },
  },
  {
    title: 'Receiver Address',
    type: 'input',
    dataKey: 'to',
    searchKey: 'recipientAddress',
    inputProps: {
      placeholder: 'Type an address',
      validation: (value: string | any[]) => value.length === 41,
      errorMessage: 'Invalid receiver address',
    },
  },
];

export const chainFilterConfig: FilterConfigType[] = [
  {
    title: 'Chain Status',
    type: 'checkbox' as 'checkbox',
    dataKey: 'status',
    searchKey: 'status',
  },
];

export const constructSearchParams = (
  filterValues: Record<string, string>,
  searchKeys: string[],
): Record<string, string | undefined> => {
  const searchParams: Record<string, string | undefined> = {};

  searchKeys.forEach((key) => {
    const value = filterValues[key];
    if (value && value.length > 0) {
      searchParams[key] = value;
    }
  });

  return searchParams;
};

import type { StoryObj } from '@storybook/react';
import { Search } from '@repo/ui/organisms';

const meta = {
  title: 'Organisms/Search/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGetSearchResponse = {
  validators: [
    {
      name: 'mock-validator-name-1',
      address: 'klygtrrftvoxhtknhamjab5wenfauk32z9pzk79uj',
      publicKey: 'mock-validator-publicKey-1',
      rank: 1,
    },
    {
      name: 'mock-validator-name-2',
      address: 'klymhp7n4avdedmgprv22r9x2fbfgcc24peod9pcg',
      publicKey: 'mock-validator-publicKey-2',
      rank: 2,
    },
  ],
  blocks: [
    {
      height: 1,
      id: 'bb4a0db453af1c4eff53ae4d3e05fb5cd2c4d7a147be024c4f185e29006d336e',
    },
    {
      height: 2,
      id: 'bb4a0db453af1c4eff53ae4d3e05fb5cd2c4d7a147be024c4f185e29006d336e',
    },
  ],
  transactions: [
    {
      id: '585f8ca0bf23bcab60d863895ce6e69c798451795bbffe81c185a5db7c3fac32',
      sender: 'mock-transaction-sender-1',
    },
    {
      id: '585f8ca0bf23bcab60d863895ce6e69c798451795bbffe81c185a5db7c3fac32',
      sender: 'mock-transaction-sender-2',
    },
  ],
};

let searchResult = mockGetSearchResponse;

export const Primary: Story = {
  args: {
    searchResult: searchResult,
    callSearch: () => mockGetSearchResponse,
    setSearchResults: (result: any) => {
      searchResult = result;
    },
  },
};

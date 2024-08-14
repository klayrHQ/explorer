'use client';
import { FlexGrid, Typography, Avatar, Icon } from '../../atoms';
import { Popper } from '@mui/base';
import React, { useState } from 'react';
import { cls } from '../../../utils/functions.ts';
import { SearchLg } from '../../../assets/icons/general/search-lg';
import Link from 'next/link';
interface SearchProps {
  className?: string;
}

interface Result {
  validators?: any[];
  blocks?: any[];
  transactions?: any[];
}

const searchResult = {
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

export const Search = ({ className }: SearchProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [result, setResult] = useState<any>({} as Result);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>, open: boolean) => {
    setAnchorEl(event.target as Element);
    setOpen(open);
  };

  const handleSearch = (query: string) => {
    if (query.length > 0) {
      setResult(searchResult);
    }
  };

  console.log(result);

  return (
    <div
      className={cls([
        'w-searchBarMobileWidth desktop:max-w-searchBarWidth desktop:w-searchBarWidth',
        className,
      ])}
    >
      <div className="relative w-full min-w-96 cursor-pointer">
        <div className="absolute h-full flex items-center justify-start text-onBackgroundLow">
          <SearchLg className="ml-3.5 w-6 h-6" />
        </div>

        <input
          className="bg-backgroundDark placeholder-lobster min-h-11 w-full pl-12 py-3 rounded-lg focus:outline-0 border-1 focus:border-blue focus:outline-blue focus-visible:border-none hover:cursor-pointer text-onBackground border-borderLow focus:border-b-0 focus:rounded-b-none "
          onBlur={(event) => handleFocus(event, false)}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={(event) => handleFocus(event, true)}
          placeholder="Search block, transaction, validators..."
          type="text"
        />
      </div>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement={'bottom'}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 0],
              },
            },
          ],
        }}
      >
        <FlexGrid
          className={`rounded-t-none rounded-md bg-backgroundDark border-solid border-gray-7 border w-searchBarMobileWidth max-w-searchBarMobileWidth desktop:min-w-searchBarWidth desktop:w-searchBarWidth p-4 overflow-y-auto truncate`}
          direction={'col'}
          gap="4"
        >
          {result?.validators &&
            result.validators.length > 0 &&
            result.validators.map((validator: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Link href={`/validator/${validator.address}`} key={index}>
                <FlexGrid alignItems="center" direction={'row'} gap={'2'} mobileDirection="row">
                  <Avatar address={validator.address} circle size={30} />
                  <FlexGrid direction={'col'} gap={'1'}>
                    <Typography color="onBackgroundLow" variant="caption">
                      {'Validator'}
                    </Typography>
                    <Typography color="onBackground" fontWeight="semibold" variant="paragraph-md">
                      {validator.name}
                    </Typography>
                  </FlexGrid>
                </FlexGrid>
              </Link>
            ))}
          {result?.blocks &&
            result.blocks.length > 0 &&
            result.blocks.map((block: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Link href={`/block/${block.id}`} key={index}>
                <FlexGrid alignItems="center" direction={'row'} gap={'2'} mobileDirection="row">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Icon color="onBackgroundLow" icon={'Cube'} size="xs" />
                  </div>
                  <FlexGrid direction={'col'} gap={'1'}>
                    <Typography color="onBackgroundLow" variant="caption">
                      {' '}
                      {'Block'}
                    </Typography>
                    <Typography color="onBackground" fontWeight="semibold" variant="paragraph-md">
                      {block.id}
                    </Typography>
                  </FlexGrid>
                </FlexGrid>
              </Link>
            ))}
          {result?.transactions &&
            result.transactions.length > 0 &&
            result.transactions.map((transaction: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Link href={`/transaction/${transaction.id}`} key={index}>
                <FlexGrid
                  alignItems="center"
                  className=" "
                  direction={'row'}
                  gap={'2'}
                  mobileDirection="row"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Icon color="onBackgroundLow" size="xs" icon={'SwitchHorizontal'} />
                  </div>
                  <FlexGrid direction={'col'} gap={'1'}>
                    <Typography color="onBackgroundLow" variant="caption">
                      {'transaction'}
                    </Typography>
                    <Typography
                      color="onBackground"
                      component="p"
                      fontWeight="semibold"
                      variant="paragraph-md"
                    >
                      {transaction.id}
                    </Typography>
                  </FlexGrid>
                </FlexGrid>
              </Link>
            ))}
          {result.validators?.length === 0 &&
            result.blocks?.length === 0 &&
            result.transactions?.length === 0 && <Typography>{'No results found'}</Typography>}
        </FlexGrid>
      </Popper>
    </div>
  );
};

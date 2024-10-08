'use client';
import { FlexGrid, Typography, Avatar, Icon, NotFound } from '../../atoms';
import { ClickAwayListener, Popper } from '@mui/base';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cls } from '../../../utils/functions.ts';
import { SearchLg } from '../../../assets/icons/general/search-lg';
import { CrossClose } from '../../../assets/icons/general/x-close.tsx';
import { Link } from '../../atoms';
import debounce from 'lodash/debounce';
import { truncate } from 'lodash';
import {
  SearchQueryParams,
  useSearchStore,
} from '../../../../../../apps/web/src/store/searchStore.ts';
import { usePathname } from 'next/navigation';
import { SearchResultsType } from '@repo/ui/types';

interface SearchProps {
  className?: string;
  searchResult?: SearchResultsType;
  setSearchResults?: (results: SearchResultsType) => void;
  callSearch?: (params: SearchQueryParams) => Promise<SearchResultsType>;
  basePath?: string;
}

export const Search = ({
  className,
  searchResult,
  setSearchResults,
  callSearch,
  basePath,
}: SearchProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const pathname = usePathname();

  const handleFocus = (open: boolean) => {
    setAnchorEl(inputRef.current);
    setOpen(open);
  };

  const handleSearch = async (query: string) => {
    if (query.length > 0) {
      try {
        if (callSearch) {
          await callSearch({ search: query });
        }
      } catch (error) {
        console.error('Search failed', error);
      }
    } else if (query.length === 0) {
      if (setSearchResults) {
        setSearchResults({});
      }
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [handleFocus]);

  useEffect(() => {
    setOpen(false);
    setSearchResults && setSearchResults({});
    setInputValue('');
  }, [pathname, setSearchResults]);

  const handleClear = () => {
    setInputValue('');
    setSearchResults && setSearchResults({});
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={cls(['w-full', className])}>
        <div className="relative cursor-pointer">
          <div className="absolute h-full flex items-center justify-start text-onBackgroundLow">
            <SearchLg className="ml-3.5 w-6 h-6" />
          </div>
          {inputValue && (
            <div className=" absolute right-0 h-full flex items-center justify-start text-onBackgroundLow">
              <div onClick={handleClear}>
                <CrossClose className="mr-3.5 w-6 h-6 hover:text-onBackgroundHigh" />
              </div>
            </div>
          )}

          <input
            className="bg-backgroundDark min-h-11 py-4 px-12 rounded-lg focus:outline-0 border focus:outline-none focus-visible:border-none hover:cursor-pointer text-onBackground border-borderLow focus:rounded-b-none min-w-full desktop:min-w-auto desktop:max-w-searchBarWidth placeholder:text-grayFiveOpacity placeholder:text-paragraph-m"
            onChange={(e) => {
              setInputValue(e.target.value);
              debouncedHandleSearch(e.target.value);
            }}
            onFocus={() => handleFocus(true)}
            placeholder="Search block, transaction, validators..."
            ref={inputRef}
            type="text"
            value={inputValue}
          />
        </div>
        <Popper
          anchorEl={anchorEl}
          className="w-auto truncate z-10"
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
          style={{ width: inputWidth }}
        >
          {searchResult?.blocks && searchResult.accounts && searchResult.transactions && (
            <FlexGrid
              className={`rounded-t-none rounded-md bg-backgroundDark border-solid border-gray-7 border p-4 max-h-96 overflow-y-auto overflow-x-hidden`}
              direction={'col'}
              gap="4"
            >
              {searchResult?.accounts &&
                searchResult.accounts.length > 0 &&
                searchResult.accounts.map((account: any, index: number) => (
                  <Link
                    basePath={basePath}
                    href={`/account/${account.name ?? account.address}`}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  >
                    <FlexGrid alignItems="center" direction={'row'} gap={'2'} mobileDirection="row">
                      <Avatar address={account.address} circle size={30} />
                      <FlexGrid direction={'col'} gap={'1'}>
                        <Typography color="onBackgroundLow" variant="caption">
                          {account.name ? 'Validator' : 'Account'}
                        </Typography>
                        <Typography
                          color="onBackground"
                          fontWeight="semibold"
                          variant="paragraph-md"
                        >
                          {account.name ?? account.address}
                        </Typography>
                      </FlexGrid>
                    </FlexGrid>
                  </Link>
                ))}
              {searchResult?.blocks &&
                searchResult.blocks.length > 0 &&
                searchResult.blocks.map((block: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Link basePath={basePath} href={`/blocks/${block.id}`} key={index}>
                    <FlexGrid alignItems="center" direction={'row'} gap={'2'} mobileDirection="row">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Icon color="onBackgroundLow" icon={'Cube'} size="xs" />
                      </div>
                      <FlexGrid direction={'col'} gap={'1'}>
                        <Typography color="onBackgroundLow" variant="caption">
                          {'Block'}
                        </Typography>
                        <Typography
                          className="hidden desktop:inline-flex"
                          color="onBackground"
                          fontWeight="semibold"
                          variant="paragraph-md"
                        >
                          {truncate(block.id, { length: 55, omission: '...' })}
                        </Typography>
                        <Typography
                          className="inline-flex desktop:hidden"
                          color="onBackground"
                          fontWeight="semibold"
                          variant="paragraph-md"
                        >
                          {truncate(block.id, { length: 32, omission: '...' })}
                        </Typography>
                      </FlexGrid>
                    </FlexGrid>
                  </Link>
                ))}
              {searchResult?.transactions &&
                searchResult.transactions.length > 0 &&
                searchResult.transactions.map((transaction: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Link basePath={basePath} href={`/transactions/${transaction.id}`} key={index}>
                    <FlexGrid
                      alignItems="center"
                      className=" "
                      direction={'row'}
                      gap={'2'}
                      mobileDirection="row"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Icon color="onBackgroundLow" icon={'SwitchHorizontal'} size="xs" />
                      </div>
                      <FlexGrid direction={'col'} gap={'1'}>
                        <Typography color="onBackgroundLow" variant="caption">
                          {'transaction'}
                        </Typography>
                        <Typography
                          className="hidden desktop:inline-flex"
                          color="onBackground"
                          component="p"
                          fontWeight="semibold"
                          variant="paragraph-md"
                        >
                          {truncate(transaction.id, { length: 55, omission: '...' })}
                        </Typography>
                        <Typography
                          className="inline-flex desktop:hidden"
                          color="onBackground"
                          fontWeight="semibold"
                          variant="paragraph-md"
                        >
                          {truncate(transaction.id, { length: 32, omission: '...' })}
                        </Typography>
                      </FlexGrid>
                    </FlexGrid>
                  </Link>
                ))}
              {searchResult.accounts?.length === 0 &&
                searchResult.blocks?.length === 0 &&
                searchResult.transactions?.length === 0 && (
                  <NotFound
                    className="my-9"
                    headerText="No results"
                    subheaderText="We didn’t find anything based on your search"
                  />
                )}
            </FlexGrid>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

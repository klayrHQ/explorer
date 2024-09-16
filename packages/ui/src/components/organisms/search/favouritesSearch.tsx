'use client';
import { FlexGrid, Typography, Avatar, Icon, NotFound } from '../../atoms';
import { ClickAwayListener, Popper } from '@mui/base';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cls } from '../../../utils/functions.ts';
import { SearchLg } from '../../../assets/icons/general/search-lg';
import { CrossClose } from '../../../assets/icons/general/x-close.tsx';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { truncate } from 'lodash';
import { SearchQueryParams, useSearchStore } from 'web/src/store/searchStore.ts';
import { usePathname } from 'next/navigation';
import { SearchResultsType } from '@repo/ui/types';
import { FavouriteType } from 'web/src/utils/types.ts';

interface SearchProps {
  className?: string;
  searchResult?: SearchResultsType;
  setSearchResults?: (results: SearchResultsType) => void;
  callSearch?: (params: SearchQueryParams) => Promise<SearchResultsType>;
  selected: FavouriteType | null;
  setSelected: (selected: FavouriteType) => void;
}

export const FavouritesSearch = ({
  className,
  searchResult,
  setSearchResults,
  callSearch,
  selected,
  setSelected,
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
            className="bg-backgroundSecondary min-h-11 py-4 px-12 rounded-lg focus:outline-0 border focus:outline-none focus-visible:border-none hover:cursor-pointer text-onBackground border-borderMedium focus:rounded-b-none min-w-full desktop:min-w-auto desktop:max-w-searchBarWidth placeholder:text-grayFiveOpacity placeholder:text-paragraph-m"
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
          className="w-auto truncate"
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
          style={{ width: inputWidth, zIndex: 999999 }}
        >
          {searchResult?.validators && searchResult.blocks && searchResult.transactions && (
            <FlexGrid
              className={`rounded-t-none rounded-md bg-backgroundSecondary border-solid border-borderMedium border p-4 max-h-96 overflow-y-auto overflow-x-hidden`}
              direction={'col'}
              gap="4"
            >
              {searchResult?.validators &&
                searchResult.validators.length > 0 &&
                searchResult.validators.map((validator: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <FlexGrid
                    alignItems="center"
                    className={'cursor-pointer w-full'}
                    direction={'row'}
                    gap={'2'}
                    mobileDirection="row"
                    onClick={() => {
                      setSelected({ address: validator.address, name: validator.name });
                      setOpen(false);
                    }}
                  >
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
                ))}
              {searchResult.validators?.length === 0 &&
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

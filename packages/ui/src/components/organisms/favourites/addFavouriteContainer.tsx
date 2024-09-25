import { FavouritesSearch } from '../search/favouritesSearch.tsx';
import { Button, FlexGrid, Icon, Typography, UserAccountCard } from '../../atoms';
import React from 'react';
import { FavouriteType } from 'web/src/utils/types.ts';
import { SearchQueryParams } from 'web/src/store/searchStore.ts';
import { SearchResultsType } from '../../../types/types.ts';

interface AddFavouriteContainerProps {
  selected: FavouriteType | null;
  setSelected: (value: FavouriteType | null) => void;
  callSearch: (params: SearchQueryParams) => Promise<SearchResultsType>;
  searchResult: any;
  setSearchResults: (results: any) => void;
  onCancel: () => void;
  onAdd: () => void;
  isFavourite: boolean;
}

export const AddFavouriteContainer = ({
  selected,
  setSelected,
  callSearch,
  searchResult,
  setSearchResults,
  onAdd,
  onCancel,
  isFavourite,
}: AddFavouriteContainerProps) => {
  return (
    <FlexGrid direction={'col'} gap={'3xl'}>
      <FavouritesSearch
        selected={selected}
        setSelected={setSelected}
        callSearch={callSearch}
        searchResult={searchResult}
        setSearchResults={setSearchResults}
      />
      {selected && (
        <FlexGrid className={'bg-backgroundPrimary py-3xl px-1.5xl rounded-xl w-full'} gap={'xl'} mobileDirection={'row'}>
          <div
            className={'rounded-full mt-2xs'}
            style={{
              outline: 'solid 2px rgba(from var(--color-volt) r g b / 0.1)',
              outlineOffset: '6px',
            }}
          >
            <Icon
              className={'rounded-full'}
              color={'volt'}
              icon={'AlertCircle'}
              size={'small'}
              style={{
                outline: 'solid 2px rgba(from var(--color-volt) r g b / 0.3)',
                outlineOffset: '2px',
              }}
            />
          </div>
          {isFavourite ? (
            <FlexGrid direction={'col'} gap={'0'}>
              <Typography className={'font-semibold'} color={'onBackgroundHigh'}>
                {'Something went wrong'}
              </Typography>
              <Typography color={'onBackgroundLow'}>
                {'User '}
                <span className={'inline-flex translate-y-sm mx-2xs'}>
                  <UserAccountCard
                    address={selected.address}
                    addressVariant={'paragraph-md'}
                    name={selected.name}
                    nameVariant={'paragraph-md'}
                    nameOnly={selected.name !== undefined}
                    size={24}
                  />
                </span>
                {' is already in your favourites list'}
              </Typography>
            </FlexGrid>
          ) : (
            <FlexGrid direction={'col'} gap={'0'}>
              <Typography className={'font-semibold'} color={'onBackgroundHigh'}>
                {'Is this correct?'}
              </Typography>
              <Typography color={'onBackgroundLow'}>
                {'You are about to add '}
                <span className={'inline-flex translate-y-sm mx-2xs'}>
                  <UserAccountCard
                    address={selected.address}
                    addressVariant={'paragraph-md'}
                    name={selected.name}
                    nameVariant={'paragraph-md'}
                    nameOnly={selected.name !== undefined}
                    size={24}
                  />
                </span>
                {' to your favourites list'}
              </Typography>
            </FlexGrid>
          )}
        </FlexGrid>
      )}
      <FlexGrid alignItems={'center'} className={'w-full'} gap={'1'} justify={'end'}>
        <Button
          align={'none'}
          className={'hidden desktop:flex text-gray-5 hover:text-gray-1'}
          label={'Cancel'}
          onClick={onCancel}
          variant={'transparent'}
        />
        <Button
          align={'none'}
          className={'w-full desktop:w-auto'}
          disabled={!selected || isFavourite}
          label={'Add to favourites'}
          onClick={onAdd}
        />
      </FlexGrid>
    </FlexGrid>
  );
};

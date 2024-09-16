'use client';

import { FavouritesSearch, Search, SectionHeader, TableContainer } from '@repo/ui/organisms';
import { favouritesTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { Button, FlexGrid, Icon, Modal, Typography, UserAccountCard } from '@repo/ui/atoms';
import React, { useState } from 'react';
import { FavouriteType } from '../../utils/types.ts';
import { createFavouritesRows } from '../../utils/helpers/helper.tsx';
import { useSearchStore } from '../../store/searchStore.ts';

//todo remove this mock data after implementing favourite functionality
const favouriteUsers = [
  {
    address: 'klygtrrftvoxhtknhamjab5wenfauk32z9pzk79uj',
    name: 'grumlin',
  },
  {
    address: 'klych87o44r7b5h2n2rgmreozvwd4z2u3ohyzkqfs',
    name: 'shinekami',
  },
  {
    address: 'klymhp7n4avdedmgprv22r9x2fbfgcc24peod9pcg',
    name: 'samuray_test',
  },
];
export const Favourites = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<FavouriteType[]>(favouriteUsers);
  const [selected, setSelected] = useState<FavouriteType | null>(null);
  //const [loading, setLoading] = useState<boolean>(false);

  const rows = createFavouritesRows(favourites, false);

  const callSearch = useSearchStore((state) => state.callSearch);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const searchResult = useSearchStore((state) => state.searchResults);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <FlexGrid className={'w-full'} justify={'between'} mobileDirection={'row'}>
        <SectionHeader count={rows.length} title={'Favourites'} />
        <Button align={'none'} label={'Add Favourite'} onClick={() => setOpenModal(true)} />
        <Modal open={openModal} onClose={() => setOpenModal(false)} title={'Add favourite user'}>
          <FlexGrid direction={'col'} gap={'3xl'}>
            <FavouritesSearch
              selected={selected}
              setSelected={setSelected}
              callSearch={callSearch}
              searchResult={searchResult}
              setSearchResults={setSearchResults}
            />
            {selected && (
              <FlexGrid className={'bg-backgroundPrimary py-3xl px-1.5xl rounded-xl'}>
                <Icon color={'volt'} icon={'User'} size={'small'} />
                <FlexGrid direction={'col'}>
                  <Typography color={'onBackgroundHigh'} bold>
                    {'Is this correct?'}
                  </Typography>
                  <Typography color={'onBackgroundLow'}>
                    {'You are about to add '}
                    <span className={'inline-flex translate-y-sm'}>
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
              </FlexGrid>
            )}
          </FlexGrid>
        </Modal>
      </FlexGrid>
      <TableContainer headCols={favouritesTableHead} keyPrefix={'blocks'} rows={rows} />
    </FlexGrid>
  );
};

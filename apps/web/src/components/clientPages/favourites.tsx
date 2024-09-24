'use client';
import { AddFavouriteContainer, SectionHeader, TableContainer } from '@repo/ui/organisms';
import { favouritesTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { Button, FlexGrid, Modal, NotFound } from '@repo/ui/atoms';
import React, {useEffect, useState} from 'react';
import { FavouriteType } from '../../utils/types.ts';
import { createFavouritesRows } from '../../utils/helpers/helper.tsx';
import { useSearchStore } from '../../store/searchStore.ts';
import {useFavouritesStore, useInitializeFavourites} from '../../store/favouritesStore.ts';

export const Favourites = () => {
  useInitializeFavourites();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<FavouriteType | null>(null);

  const favourites = useFavouritesStore((state) => state.favourites);
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const isFavourite = useFavouritesStore((state) => state.isFavourite);
  const setNewFavourite = useFavouritesStore((state) => state.setNewFavourite);

  const callSearch = useSearchStore((state) => state.callSearch);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const searchResult = useSearchStore((state) => state.searchResults);

  const rows = createFavouritesRows(favourites, false);

  const onAdd = () => {
    selected && addFavourite(selected);
    setOpenModal(false);
    setSelected(null);
  };

  const onCancel = () => {
    setOpenModal(false);
    setSelected(null);
  };

  //set newFavourite to false when loading the favourites page and when favourites change while on the page
  useEffect(() => {
    setNewFavourite(false);
  }, [favourites]);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <FlexGrid className={'w-full'} justify={'between'} mobileDirection={'row'}>
        <SectionHeader count={rows.length} title={'Favourites'} />
        <Button align={'none'} label={'Add Favourite'} onClick={() => setOpenModal(true)} />
        <Modal onClose={onCancel} open={openModal} title={'Add favourite user'}>
          <AddFavouriteContainer
            callSearch={callSearch}
            isFavourite={selected ? isFavourite(selected) : false}
            onAdd={onAdd}
            onCancel={onCancel}
            searchResult={searchResult}
            selected={selected}
            setSearchResults={setSearchResults}
            setSelected={setSelected}
          />
        </Modal>
      </FlexGrid>
      {!rows.length ? (
        <div className={'mt-4xl w-full'}>
          <NotFound
            headerText={'No favourites yet'}
            subheaderText={'Click on the button above to start adding favourite users'}
          />
        </div>
      ) : (
        <TableContainer headCols={favouritesTableHead} keyPrefix={'blocks'} rows={rows} />
      )}
    </FlexGrid>
  );
};

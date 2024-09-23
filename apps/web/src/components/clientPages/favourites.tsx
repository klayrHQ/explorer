'use client';

import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { favouritesTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { FlexGrid } from '@repo/ui/atoms';
import React, { useState } from 'react';
import { FavouriteType } from '../../utils/types.ts';
import { createFavouritesRows } from '../../utils/helpers/helper.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';

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
  const [favourites, setFavourites] = useState<FavouriteType[]>(favouriteUsers);
  //const [loading, setLoading] = useState<boolean>(false);
  const basePath = useBasePath();

  const rows = createFavouritesRows(favourites, false, basePath);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader count={rows.length} title={'Favourites'} />
      <TableContainer headCols={favouritesTableHead} keyPrefix={'blocks'} rows={rows} />
    </FlexGrid>
  );
};

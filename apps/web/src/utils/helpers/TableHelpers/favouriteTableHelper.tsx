import { FavouriteType } from '../../types.ts';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { IconButton } from '@repo/ui/atoms';
import { getTableSkeletons } from '../dataHelpers.tsx';
import { favouritesTableHead } from '../tableHeaders.tsx';
import React from 'react';

export const createFavouritesRows = (
  favourites: FavouriteType[],
  loading: boolean,
  basePath: string,
  removeFavourite: (favourite: FavouriteType) => void,
) => {
  return !loading
    ? favourites?.map((fav) => {
        return {
          cells: [
            {
              children: <FormattedValue format={'account'} value={fav} />,
            },
            {
              children: (
                <IconButton
                  className={'group-hover:block desktop:hidden'}
                  icon={'Trash'}
                  onClick={() => removeFavourite(fav)}
                  variant={'quaternary'}
                />
              ),
              className: 'w-iconButtonWidth',
            },
          ],
        };
      })
    : getTableSkeletons(favouritesTableHead.length);
};

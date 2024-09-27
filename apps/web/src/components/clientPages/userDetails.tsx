'use client';

import { FlexGrid, TabButtons, Typography, CopyIcon } from '@repo/ui/atoms';
import { DetailsSection, SectionHeader, TableContainer, UserBanner } from '@repo/ui/organisms';
import {
  UserType,
  UsersType,
  TransactionType,
  ValidatorType,
  TokenType,
} from '../../utils/types.ts';
import { useState, useEffect } from 'react';
import { DataType } from '@repo/ui/types';
import BannerBG from '../../assets/images/bannerBG.png';
import {
  callGetValidators,
  callGetTransactions,
  callGetEvents,
  callGetStakes,
  callGetStakers,
  callGetUsers,
  callGetTokens,
} from '../../utils/api/apiCalls.tsx';
import {
  transactionTableHead,
  validatorEventsTableHead,
  validatorStakeOutgoingTableHead,
  userTokensTableHead,
} from '../../utils/helpers/tableHeaders.tsx';
import {
  createTransactionRows,
  createValidatorEventsRow,
  createValidatorOutgoingStakeRows,
  createUserDetailsTokensRow,
} from '../../utils/helpers/helper.tsx';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import { fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { useFavouritesStore } from '../../store/favouritesStore.ts';
import { useInitializeFavourites } from '../../store/favouritesStore.ts';

export const UserDetails = ({ params }: { params: { id: string } }) => {
  useInitializeFavourites();

  const [user, setUser] = useState<UserType>();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [eventsMeta, setEventsMeta] = useState<any>({});
  const [outgoingStakes, setOutgoingStakes] = useState<any[]>([]);
  const [incomingStakes, setIncomingStakes] = useState<any[]>([]);
  const [validator, setValidator] = useState<ValidatorType>();
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);
  const isFavourite = useFavouritesStore((state) => state.isFavourite);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    if (user?.address) {
      setIsFav(isFavourite({ address: user.address }));
    }
  }, [user?.address, isFavourite]);

  const transactionsPagination = usePagination();
  const eventsPagination = usePagination();
  const basePath = useBasePath();

  useEffect(() => {
    setLoading(true);
    callGetUsers({
      address: params.id,
    })
      .then((data) => {
        const userData = Array.isArray(data?.data) && data.data.length > 0 ? data.data[0] : null;
        setUser(userData);
      })
      .catch((error) => console.error('Error fetching validator:', error))
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (user && user.address) {
      setLoading(true);

      const addSortingParams = (params: any) => {
        if (sortField && sortOrder) {
          params.sort = `${sortField}:${sortOrder}`;
        }
        return params;
      };

      const transactionsPromise = fetchPaginatedData(
        callGetTransactions,
        addSortingParams({
          address: user.address,
        }),
        transactionsPagination.pageNumber,
        transactionsPagination.limit,
      )
        .then((data) => {
          setTransactions(data.data);
          setTransactionsMeta(data.meta);
        })
        .catch((error) => console.error('Error fetching transactions:', error));

      const validatorPromise = callGetValidators({
        address: user.address,
      })
        .then((data) => {
          setValidator(data.data[0]);
        })
        .catch((error) => console.error('Error fetching validator:', error));

      const outgoingStakesPromise = callGetStakes({
        address: user.address,
      })
        .then((data) => {
          setOutgoingStakes(data.data.stakes);
        })
        .catch((error) => console.error('Error fetching outgoing stakes:', error));

      const incomingStakesPromise = callGetStakers({
        address: user.address,
      })
        .then((data) => {
          setIncomingStakes(data.data.stakers);
        })
        .catch((error) => console.error('Error fetching incoming stakers:', error));

      const eventsPromise = fetchPaginatedData(
        callGetEvents,
        { senderAddress: user.address },
        eventsPagination.pageNumber,
        eventsPagination.limit,
      )
        .then((data) => {
          setEvents(data.data);
          setEventsMeta(data.meta);
        })
        .catch((error) => console.error('Error fetching events:', error));

      const tokensPromise = callGetTokens({
        address: user.address,
      })
        .then((data) => {
          setTokens(data.data as unknown as TokenType[]);
        })
        .catch((error) => console.error('Error fetching tokens:', error));

      Promise.all([
        transactionsPromise,
        outgoingStakesPromise,
        validatorPromise,
        eventsPromise,
        incomingStakesPromise,
        tokensPromise,
      ]).finally(() => setLoading(false));
    }
  }, [
    user,
    sortField,
    sortOrder,
    eventsPagination.pageNumber,
    eventsPagination.limit,
    transactionsPagination.pageNumber,
    transactionsPagination.limit,
  ]);

  const createDetails = (label: string, value: any = ' - ', mobileWidth?: string) => {
    return { label: { label }, value, mobileWidth };
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const details = [
    createDetails(
      'Validator address',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{user?.address}</Typography>
        <CopyIcon content={user?.address || ''} size={'xxs'} />
      </div>,
    ),
    createDetails(
      'Public Key',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{user?.publicKey}</Typography>
        <CopyIcon content={user?.publicKey || ''} size={'xxs'} />
      </div>,
      'half',
    ),
  ];

  const rows = createTransactionRows(
    transactions,
    loading,
    copyTooltipText,
    setCopyTooltipText,
    basePath,
    true,
  );
  const eventsRows = createValidatorEventsRow(events, loading);
  const outgoingStake = createValidatorOutgoingStakeRows(
    outgoingStakes,
    validator,
    loading,
    basePath,
  );
  const tokensRows = createUserDetailsTokensRow(tokens, loading);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection data={details} json={user as unknown as DataType} title={'User Details'} />
      ),
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={transactionsMeta?.total}
            title={`${user?.name} transactions`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            currentNumber={transactionsPagination.pageNumber}
            defaultValue={transactionsPagination.limit}
            headCols={transactionTableHead(handleSort, sortField, sortOrder, true)}
            keyPrefix={'validator-tx'}
            onPerPageChange={transactionsPagination.handleLimitChange}
            pagination={
              transactionsMeta?.total
                ? transactionsMeta?.total > parseInt(transactionsPagination.limit)
                : false
            }
            rows={rows}
            setCurrentNumber={transactionsPagination.handlePageChange}
            totalPages={Math.ceil(
              (transactionsMeta?.total ?? 0) / Number(transactionsPagination.limit),
            )}
          />
        </FlexGrid>
      ),
    },
    {
      value: 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={outgoingStakes.length}
            title={`${user?.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorStakeOutgoingTableHead}
            keyPrefix={'validator-blocks'}
            rows={outgoingStake}
          />
        </FlexGrid>
      ),
    },
    {
      value: 4,
      label: 'Tokens',
      icon: 'CryptoCurrency',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={outgoingStakes.length}
            title={`${user?.name}'s tokens`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={userTokensTableHead}
            keyPrefix={'validator-blocks'}
            rows={tokensRows}
          />
        </FlexGrid>
      ),
    },

    {
      value: 5,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={eventsMeta?.total}
            title={`${user?.name}'s events`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            currentNumber={eventsPagination.pageNumber}
            defaultValue={eventsPagination.limit}
            headCols={validatorEventsTableHead}
            keyPrefix={'validator-blocks'}
            onPerPageChange={eventsPagination.handleLimitChange}
            pagination={
              eventsMeta?.total ? eventsMeta?.total > parseInt(eventsPagination.limit) : false
            }
            rows={eventsRows}
            setCurrentNumber={eventsPagination.handlePageChange}
            totalPages={Math.ceil((eventsMeta?.total ?? 0) / Number(eventsPagination.limit))}
          />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <UserBanner
        basePath={basePath}
        coinRate={0.2}
        image={BannerBG.src}
        incomingTransactions={incomingStakes.length}
        isFavorite={isFavourite({ address: user?.address ?? '' })}
        outgoingTransactions={outgoingStakes.length}
        rank={''}
        removeFavorite={() => {
          if (user?.address) {
            removeFavourite({ address: user.address });
            setIsFav(false);
          }
        }}
        senderAddress={user?.address ?? undefined}
        senderName={user?.name ?? undefined}
        setFavorite={() => {
          if (user?.address) {
            addFavourite({ address: user.address });
            setIsFav(true);
          }
        }}
        status={'active'}
        value={232}
        valueSymbol={'KLY'}
      />
      <div className="desktop:hidden w-full">
        <TabButtons padding="6" showLabel={false} tabs={tabs} width="full" />
      </div>
      <div className="hidden desktop:flex w-full">
        <TabButtons tabs={tabs} width="full" />
      </div>
    </FlexGrid>
  );
};

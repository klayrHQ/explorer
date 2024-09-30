'use client';

import { FlexGrid, TabButtons, Typography, CopyIcon } from '@repo/ui/atoms';
import {
  DetailsSection,
  SectionHeader,
  TableContainer,
  AccountBanner,
  ValidatorBanner,
} from '@repo/ui/organisms';
import {
  AccountType,
  AccountsType,
  TransactionType,
  ValidatorType,
  TokenType,
  BlockDetailsType,
  MetaType,
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
  callGetAccounts,
  callGetTokens,
  callGetBlocks,
} from '../../utils/api/apiCalls.tsx';
import {
  transactionTableHead,
  validatorEventsTableHead,
  validatorStakeOutgoingTableHead,
  userTokensTableHead,
  validatorBlocksTableHead,
} from '../../utils/helpers/tableHeaders.tsx';
import {
  createTransactionRows,
  createValidatorEventsRow,
  createValidatorOutgoingStakeRows,
  createUserDetailsTokensRow,
  createValidatorBlockRows,
} from '../../utils/helpers/helper.tsx';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import { fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { useFavouritesStore } from '../../store/favouritesStore.ts';
import { useChainNetwork } from '../../providers/chainNetworkProvider.tsx';
import { useInitializeFavourites } from '../../store/favouritesStore.ts';

export const AccountDetails = ({ paramAccount }: { paramAccount: string }) => {
  useInitializeFavourites();

  const paramIsName = paramAccount.length < 41;
  const [account, setAccount] = useState<AccountType>();
  const [validator, setValidator] = useState<ValidatorType>();
  const isValidator = !!validator;

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [eventsMeta, setEventsMeta] = useState<any>({});
  const [outgoingStakes, setOutgoingStakes] = useState<any[]>([]);
  const [incomingStakes, setIncomingStakes] = useState<any[]>([]);
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [blocks, setBlocks] = useState<BlockDetailsType[]>([]);
  const [blocksMeta, setBlocksMeta] = useState<MetaType>({});

  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const { currentChain } = useChainNetwork();

  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);
  const isFavourite = useFavouritesStore((state) => state.isFavourite);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    if (account?.address) {
      setIsFav(isFavourite({ address: account.address }));
    }
  }, [account?.address, isFavourite]);

  const transactionsPagination = usePagination();
  const eventsPagination = usePagination();
  const blocksPagination = usePagination();
  const basePath = useBasePath();

  useEffect(() => {
    setLoading(true);
    callGetAccounts({
      //todo uncomment when name filter is implemented to accounts endpoint
      /*...(!paramIsName ? {address: paramAccount} : {name: paramAccount})*/
      ...{ address: paramAccount },
    })
      .then((data) => {
        const AccountData = Array.isArray(data?.data) && data.data.length > 0 ? data.data[0] : null;
        setAccount(AccountData);
      })
      .catch((error) => console.error('Error fetching validator:', error))
      .finally(() => setLoading(false));
  }, [paramAccount, paramIsName]);

  useEffect(() => {
    callGetValidators({
      ...(!paramIsName ? { address: paramAccount } : { name: paramAccount }),
    })
      .then((data) => {
        setValidator(data.data[0]);
      })
      .catch((error) => console.error('Error fetching validator:', error));
  }, [paramAccount, paramIsName]);

  useEffect(() => {
    if (account && account.address) {
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
          address: account.address,
        }),
        transactionsPagination.pageNumber,
        transactionsPagination.limit,
      )
        .then((data) => {
          setTransactions(data.data);
          setTransactionsMeta(data.meta);
        })
        .catch((error) => console.error('Error fetching transactions:', error));

      const outgoingStakesPromise = callGetStakes({
        address: account.address,
      })
        .then((data) => {
          setOutgoingStakes(data.data.stakes);
        })
        .catch((error) => console.error('Error fetching outgoing stakes:', error));

      const incomingStakesPromise = callGetStakers({
        address: account.address,
      })
        .then((data) => {
          setIncomingStakes(data.data.stakers);
        })
        .catch((error) => console.error('Error fetching incoming stakers:', error));

      const eventsPromise = fetchPaginatedData(
        callGetEvents,
        { senderAddress: account.address },
        eventsPagination.pageNumber,
        eventsPagination.limit,
      )
        .then((data) => {
          setEvents(data.data);
          setEventsMeta(data.meta);
        })
        .catch((error) => console.error('Error fetching events:', error));

      const tokensPromise = callGetTokens({
        address: account.address,
      })
        .then((data) => {
          setTokens(data.data as unknown as TokenType[]);
        })
        .catch((error) => console.error('Error fetching tokens:', error));

      Promise.all([
        transactionsPromise,
        outgoingStakesPromise,
        eventsPromise,
        incomingStakesPromise,
        tokensPromise,
      ]).finally(() => setLoading(false));
    }

    if (validator && validator.account.address) {
      fetchPaginatedData(
        callGetBlocks,
        { generatorAddress: validator.account.address },
        blocksPagination.pageNumber,
        blocksPagination.limit,
      ).then((data) => {
        setBlocks(data.data);
        setBlocksMeta(data.meta);
      });
    }
  }, [
    account,
    sortField,
    sortOrder,
    eventsPagination.pageNumber,
    eventsPagination.limit,
    transactionsPagination.pageNumber,
    transactionsPagination.limit,
    blocksPagination.pageNumber,
    blocksPagination.limit,
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
      'Address',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{account?.address}</Typography>
        <CopyIcon content={account?.address || ''} size={'xxs'} />
      </div>,
    ),
    createDetails(
      'Public Key',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{account?.publicKey}</Typography>
        <CopyIcon content={account?.publicKey || ''} size={'xxs'} />
      </div>,
      'half',
    ),
  ];

  const validatorDetails = [
    createDetails('Validator weight', validator?.validatorWeight),
    createDetails('Total stake', validator?.totalStake),
    createDetails('Self stake', validator?.selfStake),
    createDetails('Generated blocks', validator?.generatedBlocks),
    createDetails('Last generated height', validator?.lastGeneratedHeight),
    createDetails('Consecutive missed blocks', validator?.consecutiveMissedBlocks),
    createDetails('Last commission increase', validator?.lastCommissionIncreaseHeight),
    createDetails('Total commission', validator?.commission),
    createDetails('Commission %', validator?.commission),
    createDetails('Earned rewards', validator?.totalRewards),
    createDetails('Total self stake rewards', validator?.totalSelfStakeRewards),
    createDetails('Max height generated', '-'),
    createDetails('Max height pre-voted', '-'),
  ];

  const stakeCapacity = (
    (Number(validator?.validatorWeight) / Number(validator?.selfStake)) *
    10
  ).toFixed(2);

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
  const tokensRows = createUserDetailsTokensRow(tokens, currentChain, loading);
  const validatorBlocksRows = createValidatorBlockRows(blocks, loading, basePath);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection data={details} json={account as unknown as DataType} title={'Details'} />
      ),
    },
    ...(isValidator
      ? [
          {
            content: <DetailsSection data={validatorDetails} title={'Validator Details'} />,
            icon: 'Flag',
            label: 'Validator',
            value: 2,
          },
        ]
      : []),
    ...(isValidator
      ? [
          {
            value: 3,
            label: 'Blocks',
            icon: 'Cube',
            content: (
              <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
                <SectionHeader
                  count={blocksMeta?.total}
                  title={`${validator?.account.name}'s blocks`}
                  titleSizeNotLink={'h5'}
                />
                <TableContainer
                  currentNumber={blocksPagination.pageNumber}
                  defaultValue={blocksPagination.limit}
                  headCols={validatorBlocksTableHead}
                  keyPrefix={'validator-blocks'}
                  onPerPageChange={blocksPagination.handleLimitChange}
                  pagination={
                    blocksMeta?.total ? blocksMeta?.total > parseInt(blocksPagination.limit) : false
                  }
                  rows={validatorBlocksRows}
                  setCurrentNumber={blocksPagination.handlePageChange}
                  totalPages={Math.ceil((blocksMeta?.total ?? 0) / Number(blocksPagination.limit))}
                />
              </FlexGrid>
            ),
          },
        ]
      : []),
    {
      value: isValidator ? 4 : 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={transactionsMeta?.total}
            title={`${account?.name} transactions`}
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
      value: isValidator ? 5 : 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={outgoingStakes.length}
            title={`${account?.name}'s stakes`}
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
      value: isValidator ? 6 : 4,
      label: 'Tokens',
      icon: 'CryptoCurrency',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={outgoingStakes.length}
            title={`${account?.name}'s tokens`}
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
      value: isValidator ? 7 : 5,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={eventsMeta?.total}
            title={`${account?.name}'s events`}
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
      {isValidator ? (
        <ValidatorBanner
          basePath={basePath}
          blockTime={2} // TODO: Implement
          capacity={stakeCapacity} // TODO: Implement
          image={BannerBG.src}
          isFavorite={isFavourite({ address: account?.address ?? '' })}
          notificationValue={validator?.rank || 0}
          removeFavorite={() => {
            if (account?.address) {
              removeFavourite({ address: account.address });
              setIsFav(false);
            }
          }}
          selfStake={validator?.selfStake || 0}
          selfStakeSymbol="KLY"
          senderAddress={validator?.account.address || ''}
          senderName={validator?.account.name || ''}
          setFavorite={() => {
            if (account?.address) {
              addFavourite({ address: account.address });
              setIsFav(true);
            }
          }}
          status={validator?.status || ''}
          value={validator?.totalStake}
          valueSymbol="KLY"
        />
      ) : (
        <AccountBanner
          basePath={basePath}
          coinRate={0.2}
          image={BannerBG.src}
          incomingTransactions={incomingStakes.length}
          isFavorite={isFavourite({ address: account?.address ?? '' })}
          outgoingTransactions={outgoingStakes.length}
          rank={''}
          removeFavorite={() => {
            if (account?.address) {
              removeFavourite({ address: account.address });
              setIsFav(false);
            }
          }}
          senderAddress={account?.address ?? undefined}
          senderName={account?.name ?? undefined}
          setFavorite={() => {
            if (account?.address) {
              addFavourite({ address: account.address });
              setIsFav(true);
            }
          }}
          status={'active'}
          value={232}
          valueSymbol={'KLY'}
        />
      )}
      <div className="desktop:hidden w-full">
        <TabButtons padding="6" showLabel={false} tabs={tabs} width="full" />
      </div>
      <div className="hidden desktop:flex w-full">
        <TabButtons tabs={tabs} width="full" />
      </div>
    </FlexGrid>
  );
};

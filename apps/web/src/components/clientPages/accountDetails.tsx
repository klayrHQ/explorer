'use client';

import { FlexGrid, TabButtons, Typography, CopyIcon, IconButton, Button } from '@repo/ui/atoms';
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
import { NftCard } from '@repo/ui/molecules';
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
  nftsTableHead,
} from '../../utils/helpers/tableHeaders.tsx';
import {
  createTransactionRows,
  createValidatorEventsRow,
  createValidatorOutgoingStakeRows,
  createUserDetailsTokensRow,
  createValidatorBlockRows,
  createNftsRows,
} from '../../utils/helpers/helper.tsx';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import { fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { useFavouritesStore } from '../../store/favouritesStore.ts';
import { useInitializeFavourites } from '../../store/favouritesStore.ts';
import { useChainNetworkStore } from '../../store/chainNetworkStore.ts';
import { shortString } from '@repo/ui/utils';
import { FormattedValue } from '../formattedValue.tsx';
import { Currency } from '../currency.tsx';
import { create } from 'domain';

export const AccountDetails = ({ paramAccount }: { paramAccount: string }) => {
  useInitializeFavourites();

  const paramIsName = paramAccount.length < 41;
  const [account, setAccount] = useState<AccountType>();
  const [validator, setValidator] = useState<ValidatorType>();
  const isValidator = !!validator;
  const [isGridView, setIsGridView] = useState(false);

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

  const currentChain = useChainNetworkStore((state) => state.currentChain);

  const chains = useChainNetworkStore((state) => state.chains);
  const symbol = currentChain?.token?.symbol;


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
    callGetAccounts({ [paramIsName ? 'name' : 'address']: paramAccount })
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
      <>
        <FormattedValue
          copy
          format={'string'}
          typographyProps={{ color: 'onBackgroundHigh', className: 'hidden desktop:inline-flex' }}
          value={account?.address}
        />
        <FormattedValue
          copy
          format={'string'}
          typographyProps={{ color: 'onBackgroundHigh', className: 'desktop:hidden' }}
          value={shortString(account?.address ?? ' ', 16, 'center')}
        />
      </>,
    ),
    createDetails(
      'Public Key',
      <>
        <FormattedValue
          copy
          format={'string'}
          typographyProps={{ color: 'onBackgroundHigh', className: 'hidden desktop:inline-flex' }}
          value={account?.publicKey}
        />
        <FormattedValue
          copy
          format={'string'}
          typographyProps={{ color: 'onBackgroundHigh', className: 'desktop:hidden' }}
          value={shortString(account?.publicKey ?? ' ', 16, 'center')}
        />
      </>,
    ),
    createDetails(
      'Nonce',
      <>
        <FormattedValue
          format="number"
          typographyProps={{ color: 'onBackgroundHigh' }}
          value={account?.nonce}
        />
      </>,
    ),
    createDetails(
      'Total Balance',
      <>
        <FormattedValue
          format="currency"
          currencyProps={{ className: 'font-onBackgroundHigh' }}
          value={account?.totalBalance}
        />
      </>,
    ),
    createDetails(
      'Locked Balance',
      <>
        <FormattedValue
          format="currency"
          currencyProps={{ className: 'font-onBackgroundHigh' }}
          value={account?.lockedBalance}
        />
      </>,
    ),
    createDetails(
      'Available Balance',
      <>
        <FormattedValue
          format="currency"
          currencyProps={{ className: 'font-onBackgroundHigh' }}
          value={account?.availableBalance}
        />
      </>,
    ),
    createDetails(
      'Claimable Rewards',
      <>
        <FormattedValue
          format="currency"
          currencyProps={{ className: 'font-onBackgroundHigh opacity-40' }}
          value={'0'}
        />
      </>,
    ),
  ];

  const validatorDetails = [
    createDetails('Validator weight', <Currency amount={validator?.validatorWeight ?? 0} />),
    createDetails('Total stake', <Currency amount={validator?.totalStake ?? 0} />),
    createDetails('Self stake', <Currency amount={validator?.selfStake ?? 0} />),
    createDetails(
      'Generated blocks',
      <FormattedValue
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
        value={validator?.generatedBlocks}
      />,
    ),
    createDetails(
      'Last generated height',
      <FormattedValue
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
        value={validator?.lastGeneratedHeight}
      />,
    ),
    createDetails(
      'Consecutive missed blocks',
      <FormattedValue
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
        value={validator?.consecutiveMissedBlocks}
      />,
    ),
    createDetails(
      'Last commission increase',
      <FormattedValue
        format={'number'}
        typographyProps={{ color: 'onBackgroundHigh' }}
        value={validator?.lastCommissionIncreaseHeight}
      />,
    ),
    createDetails(
      'Total commission',
      <Currency amount={validator?.commission ?? 0} decimals={5} />,
    ),
    createDetails('Commission %', <Currency amount={validator?.commission ?? 0} decimals={5} />),
    createDetails('Earned rewards', <Currency amount={validator?.totalRewards ?? 0} />),
    createDetails(
      'Total self stake rewards',
      <Currency amount={validator?.totalSelfStakeRewards ?? 0} />,
    ),
    createDetails(
      'Max height generated',
      <FormattedValue
        format={'string'}
        typographyProps={{ color: 'onBackgroundHigh' }}
        value={'-'}
      />,
    ),
    createDetails(
      'Max height pre-voted',
      <FormattedValue
        format={'string'}
        typographyProps={{ color: 'onBackgroundHigh' }}
        value={'-'}
      />,
    ),
  ];

  const stakeCapacity = (
    (Number(validator?.validatorWeight) / Number(validator?.selfStake)) *
    10
  ).toFixed(2);

  const rows = createTransactionRows(
    transactions,
    currentChain,
    chains,
    loading,
    copyTooltipText,
    setCopyTooltipText,
    basePath,
    false,
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

  //MOCK NFTs
  const nfts = [
    {
      name: 'Orange F',
      collection: 'CyberPunk AI',
      price: '145500000000',
      status: 'active',
      rarityRank: '213',
      chain: 'Klayr-main',
      image:
        'https://img.freepik.com/free-photo/international-day-education-futuristic-style_23-2150998750.jpg?t=st=1727856493~exp=1727860093~hmac=1cdc94549100461630c13ee835dd86c2e12449c334338d0508f6babf639c368c?uid=R97798057&ga=GA1.1.203049697.1727194306://placehold.co/600x400',
      chainImage:
        'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
    },
    {
      name: 'White Ki',
      collection: 'CyberPunk AI',
      price: '93500000000',
      status: 'active',
      rarityRank: '24',
      chain: 'Klayr-main',
      image:
        'https://img.freepik.com/free-photo/cyberpunk-woman-warrior-portrait_23-2150712276.jpg?t=st=1727857940~exp=1727861540~hmac=1b8c47b6d615671e2baf5e0516ca4ee240ebbae5b563b2fb6ba065610767186d?uid=R97798057&ga=GA1.1.203049697.1727194306',
      chainImage:
        'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
    },
    {
      name: 'Pink B',
      collection: 'CyberPunk AI',
      price: '1345500000000',
      status: 'active',
      rarityRank: '43',
      chain: 'Klayr-main',
      image:
        'https://img.freepik.com/free-photo/cyberpunk-woman-warrior-portrait_23-2150712588.jpg?t=st=1727857940~exp=1727861540~hmac=227d6f34d4ac97f5fa3af8e423563556cfcf11734d2e3d3956e12dc05f875650?uid=R97798057&ga=GA1.1.203049697.1727194306',
      chainImage:
        'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
    },
    {
      name: 'Sobaka Laika',
      collection: 'Lika Laka',
      price: '4550000000',
      status: 'active',
      rarityRank: '34',
      chain: 'Klayr-main',
      image:
        'https://img.freepik.com/premium-photo/dog-painting-portrait-doberman_53876-523706.jpg?w=1060',
      chainImage:
        'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
    },
    {
      name: 'Pesik Laika',
      collection: 'Lika Laka',
      price: '7785400000000',
      status: 'active',
      rarityRank: '325',
      chain: 'Klayr-main',
      image:
        'https://img.freepik.com/premium-photo/bulldog-costuming-wearing-halloween-surrealism-portrait-animal-human_53876-521385.jpg?w=996',
      chainImage:
        'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
    },
    {
      name: 'Kobel Samka',
      collection: 'Lika Laka',
      price: '7785400000000',
      status: 'active',
      rarityRank: '325',
      chain: 'Klayr-main',
      image:
        'https://img.freepik.com/premium-photo/regal-husky-vintage-attire_53876-305029.jpg?w=1480',
      chainImage:
        'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/iajdm4uwsshvi1d4dt7g',
    },
  ];

  const nftsRows = createNftsRows(nfts, loading);

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: <DetailsSection data={details} json={account as unknown as DataType} />,
    },
    ...(isValidator
      ? [
          {
            content: <DetailsSection data={validatorDetails} />,
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
      count: transactionsMeta?.total,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <TableContainer
            currentNumber={transactionsPagination.pageNumber}
            defaultValue={transactionsPagination.limit}
            headCols={transactionTableHead(handleSort, sortField, sortOrder, false)}
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
      count: outgoingStakes.length,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <TableContainer
            headCols={validatorStakeOutgoingTableHead}
            keyPrefix={'validator-stakes'}
            rows={outgoingStake}
          />
        </FlexGrid>
      ),
    },
    {
      value: isValidator ? 6 : 4,
      label: 'Tokens',
      icon: 'CryptoCurrency',
      count: outgoingStakes.length,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
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
      label: 'NFTs',
      icon: 'Image',
      content: (
        <div className={'w-full relative mb-10 pt-5xl'}>
          <IconButton
            className="absolute top-0 right-0"
            icon={isGridView ? 'Menu' : 'DotsVertical'}
            onClick={() => setIsGridView(!isGridView)}
            variant="tertiary"
          />
          {isGridView ? (
            <div className="flex flex-wrap gap-6 justify-center desktop:justify-start">
              {nfts.map((nft) => (
                <NftCard
                  chain={nft.chain}
                  chainImage={nft.chainImage}
                  collection={nft.collection}
                  image={nft.image}
                  key={nft.name}
                  price={nft.price}
                  title={nft.name}
                />
              ))}
            </div>
          ) : (
            <TableContainer headCols={nftsTableHead} keyPrefix={'account-nfts'} rows={nftsRows} />
          )}
        </div>
      ),
    },
    {
      value: isValidator ? 8 : 6,
      label: 'Events',
      icon: 'List',
      count: eventsMeta?.total,
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
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
          selfStakeSymbol={symbol}
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
          valueSymbol={symbol}
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
          valueSymbol={symbol}
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

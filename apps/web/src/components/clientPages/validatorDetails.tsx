'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import { useEffect, useState } from 'react';
import { TabButtons, FlexGrid, Typography, CopyIcon } from '@repo/ui/atoms';
import { SectionHeader, TableContainer, DetailsSection } from '@repo/ui/organisms';
import { DataType } from '@repo/ui/types';
import { usePagination } from '../../utils/hooks/usePagination.ts';
import {
  transactionTableHead,
  validatorStakeIncomingTableHead,
  validatorStakeOutgoingTableHead,
  validatorBlocksTableHead,
  validatorEventsTableHead,
} from '../../utils/helpers/tableHeaders.tsx';
import {
  createTransactionRows,
  createValidatorEventsRow,
  createValidatorIncomingStakeRows,
  createValidatorOutgoingStakeRows,
  createValidatorBlockRows,
} from '../../utils/helpers/helper.tsx';
import {
  EventsType,
  TransactionType,
  ValidatorType,
  MetaType,
  BlockDetailsType,
  StakeType,
} from '../../utils/types';
import {
  callGetBlocks,
  callGetEvents,
  callGetTransactions,
  callGetValidators,
  callGetStakes,
  callGetStakers,
} from '../../utils/api/apiCalls.tsx';
import { useFavouritesStore } from '../../store/favouritesStore.ts';

import { formatCommission, fetchPaginatedData } from '../../utils/helpers/dataHelpers.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { Currency } from '../currency.tsx';
import {useChainNetworkStore} from "../../store/chainNetworkStore.ts";

export const ValidatorDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [validator, setValidators] = useState<ValidatorType | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [incomingStakes, setIncomingStakes] = useState<StakeType[]>([]);
  const [outgoingStakes, setOutgoingStakes] = useState<StakeType[]>([]);
  const [events, setEvents] = useState<EventsType[]>([]);
  const [blocks, setBlocks] = useState<BlockDetailsType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<MetaType>({});
  const [eventsMeta, setEventsMeta] = useState<MetaType>({});
  const [blocksMeta, setBlocksMeta] = useState<MetaType>({});
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore();
  const [isFav, setIsFav] = useState<boolean>(false);
  const currentChain = useChainNetworkStore((state) => state.currentChain);
  const symbol = currentChain?.currency.symbol;

  const blocksPagination = usePagination(1, '10');
  const eventsPagination = usePagination();
  const transactionsPagination = usePagination();
  const basePath = useBasePath();

  useEffect(() => {
    setLoading(true);
    callGetValidators({
      name: id,
    })
      .then((data) => setValidators(data.data[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (validator && validator.account && validator.account.address) {
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
          address: validator.account.address,
        }),
        transactionsPagination.pageNumber,
        transactionsPagination.limit,
      ).then((data) => {
        setTransactions(data.data);
        setTransactionsMeta(data.meta);
      });

      const incomingStakesPromise = callGetStakers({
        address: validator.account.address,
      }).then((data) => {
        setIncomingStakes(data.data.stakers);
      });

      const outgoingStakesPromise = callGetStakes({
        address: validator.account.address,
      }).then((data) => {
        setOutgoingStakes(data.data.stakes);
      });

      const eventsPromise = fetchPaginatedData(
        callGetEvents,
        { senderAddress: validator.account.address },
        eventsPagination.pageNumber,
        eventsPagination.limit,
      ).then((data) => {
        setEvents(data.data);
        setEventsMeta(data.meta);
      });

      const blocksPromise = fetchPaginatedData(
        callGetBlocks,
        { generatorAddress: validator.account.address },
        blocksPagination.pageNumber,
        blocksPagination.limit,
      ).then((data) => {
        setBlocks(data.data);
        setBlocksMeta(data.meta);
      });

      Promise.all([
        transactionsPromise,
        incomingStakesPromise,
        outgoingStakesPromise,
        eventsPromise,
        blocksPromise,
      ]).finally(() => setLoading(false));
    }
  }, [
    validator,
    sortField,
    sortOrder,
    blocksPagination.pageNumber,
    blocksPagination.limit,
    eventsPagination.pageNumber,
    eventsPagination.limit,
    transactionsPagination.pageNumber,
    transactionsPagination.limit,
  ]);

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const createDetails = (label: string, value: any = ' - ', mobileWidth?: string) => {
    return { label: { label }, value, mobileWidth };
  };

  const stakeCapacity = (
    (Number(validator?.validatorWeight) / Number(validator?.selfStake)) *
    10
  ).toFixed(2);
  const totalReceivedStake = Number(validator?.totalStake) + Number(validator?.selfStake);

  const details = [
    createDetails(
      'Validator address',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{validator?.account.address}</Typography>
        <CopyIcon content={validator?.account.address || ''} size={'xxs'} />
      </div>,
    ),
    createDetails(
      'Public Key',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{validator?.account.publicKey}</Typography>
        <CopyIcon content={validator?.account.publicKey || ''} size={'xxs'} />
      </div>,
      'half',
    ),
    createDetails(
      'Nonce',
      <Typography variant={'paragraph-sm'}>{validator?.account.nonce}</Typography>,
    ),
    createDetails('Token', 'KLY', 'half'),
    createDetails('Active chain', 'Klayr-mainchain', 'half'),
    createDetails(
      'Available tokens',
      <Currency
        amount={validator?.totalStake || 0}
        className={'truncate max-w-full'}
        decimals={2}
      />,
    ),
    createDetails(
      'Locked tokens',
      <Currency amount={''} className={'truncate max-w-full'} decimals={2} />,
    ),
    createDetails('Claimable rewards', ' - '),
    createDetails(
      'Validator weight',
      <Currency
        amount={validator?.validatorWeight || 0}
        className={'truncate max-w-full'}
      />,
    ),
    createDetails(
      'Stake capacity',
      <div className="flex flex-row gap-1 items-baseline ">
        <Typography variant={'paragraph-sm'}>{stakeCapacity}</Typography>
        <Typography variant={'paragraph-sm'}>{'%'}</Typography>
      </div>,
    ),
    createDetails(
      'Total received stake',
      <Currency
        amount={totalReceivedStake || 0}
        className={'truncate max-w-full'}
      />,
    ),
    createDetails(
      'Self stake',
      <Currency
        amount={validator?.selfStake || 0}
        className={'truncate max-w-full'}
      />,
    ),
    createDetails(
      'Commission',

      <Typography variant={'paragraph-sm'}>{formatCommission(validator?.commission)}%</Typography>,
    ),
    createDetails('Last commission increase', validator?.lastCommissionIncreaseHeight),
    createDetails(
      'Total rewards',
      <div className="flex items-center gap-1">
        <Currency
          amount={validator?.totalRewards || 0}
          className={'truncate max-w-full'}
          decimals={2}
        />
      </div>,
    ),
    createDetails(
      'Total self stake rewards',
      <div className="flex items-center gap-1">
        <Currency
          amount={validator?.totalSelfStakeRewards || 0}
          className={'truncate max-w-full'}
          decimals={2}
        />
      </div>,
    ),
    createDetails(
      'Total shared rewards',
      <Currency
        amount={validator?.totalSharedRewards || 0}
        className={'truncate max-w-full'}
        decimals={2}
      />,
    ),
    createDetails(
      'Dynamic block rewards',
      <Currency amount={validator?.blockReward || 0} decimals={4} />,
    ),
    createDetails('Last generated heights', validator?.lastGeneratedHeight),
    createDetails('Max height generated', ' - '),
    createDetails('Max height prevoted', ' - '),
    createDetails('Generated blocks', validator?.generatedBlocks),
    createDetails('Missed blocks', ' - '),
    createDetails('Consecutive missed blocks', validator?.consecutiveMissedBlocks),
    createDetails('Ratio blocks forged/missed', ' -  / - '),
    createDetails('Punishments', ' - '),
  ];

  const rows = createTransactionRows(
    transactions,
    loading,
    copyTooltipText,
    setCopyTooltipText,
    basePath,
  );
  const eventsRows = createValidatorEventsRow(events, loading);
  const incomingStake = createValidatorIncomingStakeRows(incomingStakes, loading, basePath);
  const outgoingStake = createValidatorOutgoingStakeRows(
    outgoingStakes,
    validator,
    loading,
    basePath,
  );
  const validatorBlocksRows = createValidatorBlockRows(blocks, loading, basePath);

  const stakeTabs = [
    {
      value: 1,
      label: 'Incoming',
      content: (
        <div>
          <SectionHeader
            className="absolute top-0 left-0"
            count={setIncomingStakes.length}
            title={`${validator?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorStakeIncomingTableHead}
            keyPrefix={'validator-blocks'}
            rows={incomingStake}
          />
        </div>
      ),
    },
    {
      value: 2,
      label: 'Outgoing',
      content: (
        <>
          <SectionHeader
            className="absolute top-0 left-0"
            count={outgoingStakes.length}
            title={`${validator?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorStakeOutgoingTableHead}
            keyPrefix={'validator-blocks'}
            rows={outgoingStake}
          />
        </>
      ),
    },
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection
          data={details}
          headerWidth="detailsLabelWidthLarge"
          json={validator as unknown as DataType}
          title={'Validator Details'}
        />
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
            title={`${validator?.account.name} transactions`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            currentNumber={transactionsPagination.pageNumber}
            defaultValue={transactionsPagination.limit}
            headCols={transactionTableHead(handleSort, sortField, sortOrder)}
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
        <FlexGrid className={'w-full desktop:gap-4.5xl relative'} direction={'col'} gap={'1.5xl'}>
          <TabButtons className="justify-start desktop:justify-end" tabs={stakeTabs} width="full" />
        </FlexGrid>
      ),
    },
    {
      value: 4,
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
    {
      value: 5,
      label: 'Events',
      icon: 'List',
      content: (
        <FlexGrid className={'w-full'} direction={'col'} gap={'4.5xl'}>
          <SectionHeader
            count={eventsMeta?.total}
            title={`${validator?.account.name}'s events`}
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
      <ValidatorBanner
        basePath={basePath}
        blockTime={2} // TODO: Implement
        capacity={stakeCapacity} // TODO: Implement
        image={BannerBG.src}
        isFavorite={isFavourite({ address: validator?.account.address ?? '' })}
        notificationValue={validator?.rank || 0}
        removeFavorite={() => {
          if (validator?.account.address) {
            removeFavourite({ address: validator.account.address });
            setIsFav(false);
          }
        }}
        selfStake={validator?.selfStake || 0}
        selfStakeSymbol={symbol}
        senderAddress={validator?.account.address || ''}
        senderName={validator?.account.name || ''}
        setFavorite={() => {
          if (validator?.account.address) {
            addFavourite({ address: validator.account.address });
            setIsFav(true);
          }
        }}
        stakes={incomingStake.length} // TODO: Implement
        status={validator?.status || ''}
        value={validator?.totalStake}
        valueSymbol={symbol}
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

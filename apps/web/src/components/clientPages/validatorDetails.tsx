'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useValidatorStore } from '../../store/validatorStore';
import { useEventsStore } from '../../store/eventStore';
import { useBlockStore } from '../../store/blockStore.ts';
import { TabButtons, FlexGrid, Currency, Typography } from '@repo/ui/atoms';
import { SectionHeader, TableContainer, DetailsSection } from '@repo/ui/organisms';
import { DataType } from '@repo/ui/types';
import { useTransactionStore } from '../../store/transactionStore.ts';
import {
  transactionTableHead,
  validatorStakeIncomingTableHead,
  validatorStakeOutgoingTableHead,
  validatorBlocksTableHead,
  validatorEventsTableHead,
} from '../../utils/constants.tsx';
import {
  createTransactionRows,
  createValidatorEventsRow,
  createValidatorIncomingStakeRows,
  createValidatorOutgoingStakeRows,
  createValidatorBlockRows,
} from '../../utils/helper.tsx';
import {
  EventsType,
  TransactionType,
  ValidatorType,
  MetaType,
  BlockDetailsType,
} from '../../utils/types';

export const ValidatorDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const callGetValidators = useValidatorStore((state) => state.callGetValidators);
  const callGetTransactions = useTransactionStore((state) => state.callGetTransactions);
  const callGetEvents = useEventsStore((state) => state.callGetEvents);
  const callGetBlocks = useBlockStore((state) => state.callGetBlocks);

  const [loading, setLoading] = useState<boolean>(true);
  const [validator, setValidators] = useState<ValidatorType | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [incomingStakes, setIncomingStakes] = useState<TransactionType[]>([]);
  const [outgoingStakes, setOutgoingStakes] = useState<TransactionType[]>([]);
  const [events, setEvents] = useState<EventsType[]>([]);
  const [blocks, setBlocks] = useState<BlockDetailsType[]>([]);
  const [transactionsMeta, setTransactionsMeta] = useState<MetaType>({});
  const [incomingStakesMeta, setIncomingStakesMeta] = useState<MetaType>({});
  const [outgoingStakesMeta, setOutgoingStakesMeta] = useState<MetaType>({});
  const [eventsMeta, setEventsMeta] = useState<MetaType>({});
  const [blocksMeta, setBlocksMeta] = useState<MetaType>({});
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const defaultLimit = '10';
  const [blockPageNumber, setBlockPageNumber] = useState<number>(1);
  const handleBlockPageChange = (newPageNumber: number) => {
    setBlockPageNumber(newPageNumber);
  };

  const [eventPageNumber, setEventPageNumber] = useState<number>(1);
  const handleEventPageChange = (newPageNumber: number) => {
    setEventPageNumber(newPageNumber);
  };

  const [transactionPageNumber, setTransactionPageNumber] = useState<number>(1);
  const handleTransactionPageChange = (newPageNumber: number) => {
    setTransactionPageNumber(newPageNumber);
  };

  const [incomingStakesPageNumber, setIncomingStakesPageNumber] = useState<number>(1);
  const handleIncomingStakesPageChange = (newPageNumber: number) => {
    setIncomingStakesPageNumber(newPageNumber);
  };

  const [outgoingStakesPageNumber, setOutgoingStakesPageNumber] = useState<number>(1);
  const handleOutgoingStakesPageChange = (newPageNumber: number) => {
    setOutgoingStakesPageNumber(newPageNumber);
  };

  const fetchPaginatedData = async (
    callFunction: Function,
    params: any,
    pageNumber: any,
    defaultLimit: any,
  ) => {
    const offset = (Number(pageNumber) - 1) * Number(defaultLimit);
    const updatedParams = { ...params, limit: defaultLimit, offset };
    return callFunction(updatedParams);
  };

  useEffect(() => {
    setLoading(true);
    callGetValidators({
      address: id,
    })
      .then((data) => setValidators(data.data[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [callGetValidators, id]);

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
        transactionPageNumber,
        defaultLimit,
      ).then((data) => {
        setTransactions(data.data);
        setTransactionsMeta(data.meta);
      });

      const incomingStakesPromise = fetchPaginatedData(
        callGetTransactions,
        {
          recipientAddress: validator.account.address,
          moduleCommand: 'pos:stake',
        },
        incomingStakesPageNumber,
        defaultLimit,
      ).then((data) => {
        setIncomingStakes(data.data);
        setIncomingStakesMeta(data.meta);
      });

      const outgoingStakesPromise = fetchPaginatedData(
        callGetTransactions,
        {
          senderAddress: validator.account.address,
          moduleCommand: 'pos:stake',
        },
        outgoingStakesPageNumber,
        defaultLimit,
      ).then((data) => {
        setOutgoingStakes(data.data);
        setOutgoingStakesMeta(data.meta);
      });

      const eventsPromise = fetchPaginatedData(
        callGetEvents,
        { senderAddress: validator.account.address },
        eventPageNumber,
        defaultLimit,
      ).then((data) => {
        setEvents(data.data);
        setEventsMeta(data.meta);
      });

      const blocksPromise = fetchPaginatedData(
        callGetBlocks,
        { generatorAddress: validator.account.address },
        blockPageNumber,
        defaultLimit,
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
    callGetTransactions,
    callGetEvents,
    callGetBlocks,
    blockPageNumber,
    eventPageNumber,
    transactionPageNumber,
    incomingStakesPageNumber,
    outgoingStakesPageNumber,
  ]);

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  console.log(blocksMeta?.total);

  const createDetails = (label: string, value: any = ' - ', mobileWidth?: string) => {
    return { label: { label }, value, mobileWidth };
  };

  const details = [
    createDetails('Validator ID', validator?.account.address),
    createDetails('Public Key', validator?.account.publicKey, 'half'),
    createDetails('Nonce', ' - '),
    createDetails('Token', 'KLY', 'half'),
    createDetails('Active Chain', 'Klayr-mainchain', 'half'),
    createDetails(
      'Available tokens',
      <Currency
        amount={validator?.totalStake || 0}
        className={'truncate max-w-full'}
        decimals={2}
        symbol={'KLY'}
      />,
    ),
    createDetails(
      'Locked tokens',
      <Currency amount={''} className={'truncate max-w-full'} decimals={2} symbol={'KLY'} />,
    ),
    createDetails('Claimable rewards', ' - '),
    createDetails(
      'Validator weight',
      <Currency
        amount={validator?.validatorWeight || 0}
        className={'truncate max-w-full'}
        symbol={'KLY'}
      />,
    ),
    createDetails(
      'Stake capacity',
      <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />,
    ),
    createDetails(
      'Total received stake',
      <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />,
    ),
    createDetails(
      'Self stake',
      <Currency
        amount={validator?.selfStake || 0}
        className={'truncate max-w-full'}
        symbol={'KLY'}
      />,
    ),
    createDetails(
      'Commission',
      <div className="flex items-center gap-1">
        <Currency
          amount={validator?.commission || 0}
          className={'truncate max-w-full'}
          decimals={5}
          symbol={'KLY'}
        />
        {'|'}
        <Typography variant={'paragraph-sm'}>{'- %'}</Typography>
      </div>,
    ),
    createDetails('Last commission increase', validator?.lastCommissionIncreaseHeight),
    createDetails(
      'Total rewards',
      <div className="flex items-center gap-1">
        <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />
        {'|'}
        <Typography variant={'paragraph-sm'}>{'- %'}</Typography>
      </div>,
    ),
    createDetails(
      'Total self stake rewards',
      <div className="flex items-center gap-1">
        <Currency amount={''} className={'truncate max-w-full'} symbol={'KLY'} />
        {'|'}
        <Typography variant={'paragraph-sm'}>{'- %'}</Typography>
      </div>,
    ),
    createDetails('Dynamic block rewards', ' - '),
    createDetails('Last generated heights', validator?.lastGeneratedHeight),
    createDetails('Max height generated', ' - '),
    createDetails('Max height prevoted', ' - '),
    createDetails('Generated blocks', validator?.generatedBlocks),
    createDetails('Missed blocks', ' - '),
    createDetails('Consecutive missed blocks', validator?.consecutiveMissedBlocks),
    createDetails('Ratio blocks forged/missed', ' -  / - '),
    createDetails('Punishments', ' - '),
    createDetails('Blockchain version', ' - '),
  ];

  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');

  const rows = createTransactionRows(transactions, loading, copyTooltipText, setCopyTooltipText);
  const eventsRows = createValidatorEventsRow(events, loading);
  const incomingStake = createValidatorIncomingStakeRows(incomingStakes, loading);
  const outgoingStake = createValidatorOutgoingStakeRows(outgoingStakes, validator, loading);
  const validatorBlocksRows = createValidatorBlockRows(blocks, loading);

  const stakeTabs = [
    {
      value: 1,
      label: 'Incoming',
      content: (
        <div>
          <SectionHeader
            className="absolute top-0 left-0"
            count={incomingStakesMeta?.total}
            title={`${validator?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorStakeIncomingTableHead}
            keyPrefix={'validator-blocks'}
            rows={incomingStake}
            pagination
            setCurrentNumber={handleIncomingStakesPageChange}
            totalPages={Math.ceil((incomingStakesMeta?.total ?? 0) / Number(defaultLimit))}
            currentNumber={incomingStakesPageNumber}
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
            count={outgoingStakesMeta?.total}
            title={`${validator?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorStakeOutgoingTableHead}
            keyPrefix={'validator-blocks'}
            rows={outgoingStake}
            pagination
            setCurrentNumber={handleOutgoingStakesPageChange}
            totalPages={Math.ceil((outgoingStakesMeta?.total ?? 0) / Number(defaultLimit))}
            currentNumber={outgoingStakesPageNumber}
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
            headCols={transactionTableHead(handleSort, sortField, sortOrder)}
            keyPrefix={'validator-tx'}
            rows={rows}
            pagination
            setCurrentNumber={handleTransactionPageChange}
            totalPages={Math.ceil((transactionsMeta?.total ?? 0) / Number(defaultLimit))}
            currentNumber={transactionPageNumber}
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
            headCols={validatorBlocksTableHead}
            keyPrefix={'validator-blocks'}
            rows={validatorBlocksRows}
            pagination
            setCurrentNumber={handleBlockPageChange}
            totalPages={Math.ceil((blocksMeta?.total ?? 0) / Number(defaultLimit))}
            currentNumber={blockPageNumber}
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
            headCols={validatorEventsTableHead}
            keyPrefix={'validator-blocks'}
            rows={eventsRows}
            pagination
            setCurrentNumber={handleEventPageChange}
            totalPages={Math.ceil((eventsMeta?.total ?? 0) / Number(defaultLimit))}
            currentNumber={eventPageNumber}
          />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <ValidatorBanner
        blockTime={2} // TODO: Implement
        capacity={233} // TODO: Implement
        image={BannerBG.src}
        notificationValue={validator?.rank || 0}
        selfStake={validator?.selfStake || 0}
        selfStakeSymbol="KLY"
        senderAddress={validator?.account.address || ''}
        senderName={validator?.account.name || ''}
        stakes={1} // TODO: Implement
        status={validator?.status || ''}
        value={validator?.totalStake}
        valueSymbol="KLY"
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

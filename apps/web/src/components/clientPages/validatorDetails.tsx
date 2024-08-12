'use client';
import { ValidatorBanner } from '@repo/ui/organisms';
import BannerBG from '../../assets/images/bannerBG.png';
import { useEffect, useState } from 'react';
import { useValidatorStore } from '../../store/validatorStore';
import { useEventsStore } from '../../store/eventStore';
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
import { createTransactionRows, createValidatorEventsRow } from '../../utils/helper.tsx';

export const ValidatorDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const validator = useValidatorStore((state) => state.validator);
  const callGetValidators = useValidatorStore((state) => state.callGetValidators);

  const transactions = useTransactionStore((state) => state.transactions);
  const callGetTransactions = useTransactionStore((state) => state.callGetTransactions);

  const events = useEventsStore((state) => state.events);
  const callGetEvents = useEventsStore((state) => state.callGetEvents);

  // TODO: loading not used?
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    callGetValidators({ address: id }).finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (validator && validator.account && validator.account.address) {
      setLoading(true);
      callGetTransactions({
        address: validator.account.address,
      }).finally(() => setLoading(false));
    }
  }, [validator]);

  useEffect(() => {
    if (validator && validator.account && validator.account.address) {
      setLoading(true);
      callGetEvents({ senderAddress: validator.account.address }).finally(() => setLoading(false));
    }
  }, [validator]);

  console.log(events);

  // useEffect(() => {
  //   if (validator && validator.account && validator.account.address) {
  //     setLoading(true);
  //     callGetTransactionsByAddressAndModuleCommand(validator.account.address, 'pos:stake').finally(
  //       () => setLoading(false),
  //     );
  //   }
  // }, [validator]);

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
          symbol={'KLY'}
          decimals={5}
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

  const stakeTabs = [
    {
      value: 1,
      label: 'Incoming',
      content: <div className="w-64 h-64 bg-lobster"></div>,
    },
    {
      value: 2,

      label: 'Outgoing',
      content: <div className="w-80 h-96 bg-volt"></div>,
    },
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection
          headerWidth="detailsLabelWidthLarge"
          data={details}
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
            count={transactions?.length}
            title={`${validator?.account.name} transactions`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer headCols={transactionTableHead} keyPrefix={'validator-tx'} rows={rows} />
        </FlexGrid>
      ),
    },
    {
      value: 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: (
        <FlexGrid className={'w-full desktop:gap-4.5xl relative'} direction={'col'} gap={'1.5xl'}>
          <SectionHeader
            count={transactions?.length}
            title={`${validator?.account.name}'s stakes`}
            titleSizeNotLink={'h5'}
            fullWidth
          />
          <TabButtons
            className="justify-start static desktop:absolute desktop:right-0 desktop:top-0"
            width="full"
            tabs={stakeTabs}
          />
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
            count={''}
            title={`${validator?.account.name}'s blocks`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorBlocksTableHead}
            keyPrefix={'validator-blocks'}
            rows={[]}
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
            count={events?.length}
            title={`${validator?.account.name}'s events`}
            titleSizeNotLink={'h5'}
          />
          <TableContainer
            headCols={validatorEventsTableHead}
            keyPrefix={'validator-blocks'}
            rows={eventsRows}
          />
        </FlexGrid>
      ),
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <ValidatorBanner
        senderAddress={validator?.account.address || ''}
        notificationValue={validator?.rank || 0}
        image={BannerBG.src}
        senderName={validator?.account.name || ''}
        stakes={1} // TODO: Implement
        value={validator?.totalStake}
        valueSymbol="KLY"
        selfStake={validator?.selfStake || 0}
        selfStakeSymbol="KLY"
        capacity={233} // TODO: Implement
        status={validator?.status || ''}
        blockTime={2} // TODO: Implement
      />
      <div className="desktop:hidden w-full">
        <TabButtons tabs={tabs} width="full" padding="6" showLabel={false} />
      </div>
      <div className="hidden desktop:flex w-full">
        <TabButtons tabs={tabs} width="full" />
      </div>
    </FlexGrid>
  );
};

'use client';
import React, { useEffect, useState } from 'react';
import {
  FlexGrid,
  Icon,
  KeyValueComponent,
  StatusIcon,
  Tooltip,
  Typography,
  UserAccountCard,
} from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { TableCellType } from '@repo/ui/types';
import Link from 'next/link';
import { dayjs, fromNowFormatter, handleCopy, shortString } from '@repo/ui/utils';
import { getTableSkeletons } from '../../utils/constants.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getSeedRevealFromAssets } from '../../utils/dataHelpers.tsx';
import { useBlockStore } from '../../store/blockStore.ts';
import { useSocketStore } from '../../store/socketStore.ts';

export const Blocks = () => {
  const blocks = useBlockStore((state) => state.blocks);
  const totalBlocks = useBlockStore((state) => state.totalBlocks);
  const callGetBlocks = useBlockStore((state) => state.callGetBlocks);
  const newBlockEvent = useSocketStore((state) => state.height);
  const setBlocks = useBlockStore((state) => state.setBlocks);
  const setTotalBlocks = useBlockStore((state) => state.setTotalBlocks);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page')) || 1);
  const defaultLimit = '10';

  const handleSetPageNumber = async (number: number) => {
    setPageNumber(number);
    router.push(pathname + '?' + `page=${number}`);
  };

  useEffect(() => {
    setLoading(true);
    const limit = searchParams.get('limit') || defaultLimit;
    const page = Number(searchParams.get('page')) || 1;
    const offset = (page - 1) * Number(limit);
    callGetBlocks({
      limit,
      offset,
    })
      .then((data) => {
        setTotalBlocks(data.meta.total);
        setBlocks(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchParams, newBlockEvent]);

  const tableHead: TableCellType[] = [
    {
      children: 'Block ID',
    },
    {
      children: 'Height',
    },
    {
      children: 'Date',
    },
    {
      children: 'Generator',
    },
    {
      children: 'Seed reveal',
    },
    {
      children: 'Transactions',
    },
    {
      children: 'Events',
    },
    {
      children: 'Assets',
    },
  ];

  const rows = !loading
    ? blocks?.map((block) => {
        return {
          cells: [
            {
              children: (
                <KeyValueComponent
                  contentValue={
                    <Link href={`/blocks/${block.id}`}>
                      <Typography link>{shortString(block.id, 12, 'center')}</Typography>
                    </Link>
                  }
                  keyValue={<StatusIcon connected={block.isFinal} />}
                />
              ),
            },
            {
              children: (
                <Typography
                  className={'whitespace-nowrap inline-flex gap-sm items-center cursor-pointer'}
                  color={'onBackgroundLow'}
                >
                  {block?.height.toLocaleString()}
                  <Tooltip placement={'bottom'} text={copyTooltipText}>
                    <span
                      className={'w-4 block'}
                      onClick={() => handleCopy(block?.height.toString(), setCopyTooltipText)}
                    >
                      <Icon
                        className={'desktop:group-hover/child:inline desktop:hidden cursor-pointer'}
                        icon={'Copy'}
                        size={'2xs'}
                      />
                    </span>
                  </Tooltip>
                </Typography>
              ),
              className: 'group/child min-w-[120px]',
            },
            {
              children: (
                <div className="flex items-center">
                  <Tooltip
                    placement={'top'}
                    text={dayjs(block.timestamp * 1000).format('DD MMM YYYY HH:mm')}
                  >
                    <Typography className={'whitespace-nowrap'} color={'onBackgroundLow'}>
                      {fromNowFormatter(block.timestamp * 1000, 'DD MMM YYYY')}
                    </Typography>
                  </Tooltip>
                </div>
              ),
            },
            {
              children: (
                <UserAccountCard address={block.generator.address} name={block.generator.name} />
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {shortString(getSeedRevealFromAssets(block.assets), 12, 'center')}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {(block.numberOfTransactions || 0).toLocaleString()}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {(block.numberOfEvents || 0).toLocaleString()}
                </Typography>
              ),
            },
            {
              children: (
                <Typography color={'onBackgroundLow'}>
                  {(block.numberOfAssets || 0).toLocaleString()}
                </Typography>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(tableHead.length);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader
        count={totalBlocks}
        subTitle={'Overview of all blocks on the blockchain'}
        title={'Blocks'}
      />
      <TableContainer
        currentNumber={pageNumber}
        headCols={tableHead}
        keyPrefix={'blocks'}
        pagination
        rows={rows}
        setCurrentNumber={handleSetPageNumber}
        totalPages={totalBlocks / Number(defaultLimit)}
      />
    </FlexGrid>
  );
};

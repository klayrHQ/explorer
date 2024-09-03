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
  SortingTitle,
} from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { TableCellType } from '@repo/ui/types';
import Link from 'next/link';
import { dayjs, fromNowFormatter, handleCopy, shortString } from '@repo/ui/utils';
import { getTableSkeletons } from '../../utils/dataHelpers.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getSeedRevealFromAssets } from '../../utils/dataHelpers.tsx';
import { BlockDetailsType } from '../../utils/types.ts';
import { useGatewayClientStore } from '../../store/clientStore.ts';
import { callGetBlocks } from '../../utils/api/apiCalls.tsx';
import { useSocketStore } from '../../store/socketStore.ts';
import { blockTableHead } from '../../utils/helpers/tableHeaders.tsx';

export const Blocks = () => {
  const defaultLimit = '10';

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [blocks, setBlocks] = useState<BlockDetailsType[]>([]);
  const [totalBlocks, setTotalBlocks] = useState<number>(0);
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy to clipboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page')) || 1);

  const network = useGatewayClientStore((state) => state.network);
  const newBlockEvent = useSocketStore((state) => state.height);

  const handleSetPageNumber = async (number: number) => {
    setPageNumber(number);
    router.push(pathname + '?' + `page=${number}`);
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    if (blocks.length === 0) setLoading(true);
    const limit = searchParams.get('limit') || defaultLimit;
    const page = Number(searchParams.get('page')) || 1;
    const offset = (page - 1) * Number(limit);
    const params: any = {
      limit,
      offset,
      includeAssets: true,
    };
    if (sortField && sortOrder) {
      params.sort = `${sortField}:${sortOrder}`;
    }
    callGetBlocks(params)
      .then((data) => {
        setTotalBlocks(data.meta.total);
        setBlocks(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchParams, sortOrder, sortField, network, newBlockEvent, blocks.length]);

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
    : getTableSkeletons(blockTableHead.length);

  return (
    <FlexGrid className="w-full mx-auto" direction={'col'} gap={'5xl'}>
      <SectionHeader
        count={totalBlocks}
        subTitle={'Overview of all blocks on the blockchain'}
        title={'Blocks'}
      />
      <TableContainer
        currentNumber={pageNumber}
        headCols={blockTableHead(handleSort, sortField, sortOrder)}
        keyPrefix={'blocks'}
        pagination
        rows={rows}
        setCurrentNumber={handleSetPageNumber}
        totalPages={Math.ceil(totalBlocks / Number(defaultLimit))}
      />
    </FlexGrid>
  );
};

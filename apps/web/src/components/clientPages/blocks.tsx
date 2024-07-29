'use client';
import { useEffect, useState } from 'react';
import { BlockDetailsType, GatewayRes } from '../../utils/types.ts';
import gatewayClient from '../../network/gatewayClient.ts';
import {
  FlexGrid,
  KeyValueComponent,
  StatusIcon,
  Tooltip,
  Typography,
  UserAccountCard,
} from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { TableCellType } from '@repo/ui/types';
import Link from 'next/link';
import { dayjs, fromNowFormatter, shortString } from '@repo/ui/utils';
import { getTableSkeletons } from '../../utils/constants.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getSeedRevealFromAssets } from '../../utils/dataHelpers.tsx';

export const Blocks = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [blocks, setBlocks] = useState<BlockDetailsType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalBlocks, setTotalBlocks] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page')) || 1);
  const defaultLimit = '10';

  const handleSetPageNumber = async (number: number) => {
    setPageNumber(number);
    router.push(pathname + '?' + `page=${number}`);
  };

  useEffect(() => {
    const getBlocks = async () => {
      try {
        setLoading(true);
        const limit = Number(searchParams.get('limit')) || defaultLimit;
        const page = Number(searchParams.get('page')) || 1;
        const offset = (page - 1) * Number(limit);

        const { data } = await gatewayClient.get<GatewayRes<BlockDetailsType[]>>('blocks', {
          params: {
            limit: searchParams.get('limit') || defaultLimit,
            offset: offset,
            includeAssets: true,
          },
        });
        console.log(data.data);

        if (data) {
          const blocks: BlockDetailsType[] = data.data;
          setBlocks(blocks);
          setTotalBlocks(data.meta.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBlocks();
  }, [searchParams]);

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
                <Typography color={'onBackgroundLow'}>{block.height.toLocaleString()}</Typography>
              ),
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
              //todo change to seed reveal when it exists in data
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
              //todo get from data
              children: <Typography color={'onBackgroundLow'}>{0}</Typography>,
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

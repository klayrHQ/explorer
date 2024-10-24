'use client';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { Button, DonutChart, FlexGrid } from '@repo/ui/atoms';
import { NextValidators } from '@repo/ui/molecules';
import { useEffect, useState } from 'react';
import { validatorsTableHead } from '../../utils/helpers/tableHeaders.tsx';
import { createValidatorsRows } from '../../utils/helpers/helper.tsx';
import { useSocketStore } from '../../store/socketStore.ts';
import { ChartDataType, ValidatorType } from '../../utils/types.ts';
import {
  callGetChartData,
  callGetNextValidators,
  callGetValidators,
} from '../../utils/api/apiCalls.tsx';
import { useGatewayClientStore } from '../../store/clientStore.ts';
import { NextValidatorType, TableCellType } from '@repo/ui/types';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import {useChainNetworkStore} from "../../store/chainNetworkStore.ts";

export const Validators = () => {
  const [validators, setValidators] = useState<ValidatorType[]>([]);
  const [nextValidators, setNextValidators] = useState<NextValidatorType[]>([]);
  const [totalValidators, setTotalValidators] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(51);
  const [sortField, setSortField] = useState<string>('rank');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const network = useChainNetworkStore((state) => state.currentNetwork);
  const newBlockEvent = useSocketStore((state) => state.height);

  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const basePath = useBasePath();

  useEffect(() => {
    callGetChartData().then((data) => {
      const transformedData = Object.entries(data.data).map(([key, value], index) => ({
        id: index + 1,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: value as any,
      }));

      setChartData(transformedData);
    });
  }, [network]);

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    if (validators.length === 0) setLoading(true);
    callGetNextValidators().then((data) => {
      setNextValidators(data.data);
    });

    const params: any = {
      limit: rowsPerPage.toString(),
      sort: 'rank:asc',
    };
    if (sortField && sortOrder) {
      params.sort = `${sortField}:${sortOrder}`;
    }
    callGetValidators(params)
      .then((data) => {
        setTotalValidators(data.meta.total);
        setValidators(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [rowsPerPage, newBlockEvent, sortField, sortOrder, network, validators.length]);

  const rows = createValidatorsRows(validators, loading, basePath, false).map((row) => ({
    cells: row.cells.filter((cell) => cell !== null) as TableCellType[],
  }));

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <FlexGrid className={'w-full'} gap={'3xl'}>
        <SectionHeader
          className={'grow'}
          count={totalValidators ?? 0}
          subTitle={'Overview of all validators on the blockchain'}
          title={'Validators'}
        />
        <div className="hidden desktop:flex">
          <DonutChart
            colors={[
              'var(--color-success)',
              'var(--color-sandDark)',
              'var(--color-azule)',
              'var(--color-volt)',
              'var(--color-tulip)',
              'var(--color-success))',
            ]}
            data={chartData}
          />
        </div>
        <div className="hidden desktop:flex">
          <NextValidators validators={nextValidators} />
        </div>
      </FlexGrid>
      <TableContainer
        headCols={validatorsTableHead(handleSort, sortField, sortOrder)}
        keyPrefix={'validators'}
        pagination
        rows={rows}
      />
      <Button
        align={'center'}
        label={'See more'}
        onClick={() => setRowsPerPage(rowsPerPage + 10)}
      />
    </FlexGrid>
  );
};

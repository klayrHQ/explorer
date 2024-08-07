'use client';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { Button, DonutChart, FlexGrid } from '@repo/ui/atoms';
import { NextValidators } from '@repo/ui/molecules';
import { useEffect, useState } from 'react';
import { validatorsTableHead } from '../../utils/constants.tsx';
import { createValidatorsRows } from '../../utils/helper.tsx';
import { useValidatorStore } from '../../store/validatorStore.ts';

export const Validators = () => {
  const validators = useValidatorStore((state) => state.validators);
  const totalValidators = useValidatorStore((state) => state.totalValidators);
  const callGetValidators = useValidatorStore((state) => state.callGetValidators);

  const [loading, setLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    setLoading(true);
    callGetValidators({ limit: rowsPerPage.toString() }).finally(() => setLoading(false));
  }, [rowsPerPage]);

  const rows = createValidatorsRows(validators, loading);

  //todo Get from backend when available
  const mockChartData = [
    { id: 1, value: 50, label: 'Active' },
    { id: 2, value: 40, label: 'Standby' },
    { id: 3, value: 30, label: 'Ineligible' },
    { id: 4, value: 20, label: 'Banned' },
    { id: 5, value: 10, label: 'Punished' },
  ];

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <FlexGrid className={'w-full'} gap={'3xl'}>
        <SectionHeader
          className={'grow'}
          count={totalValidators ?? 0}
          subTitle={'Overview of all validators on the blockchain'}
          title={'Validators'}
        />
        <div>
          <DonutChart data={mockChartData} />
        </div>
        <NextValidators validators={validators} />
      </FlexGrid>
      <TableContainer
        headCols={validatorsTableHead}
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

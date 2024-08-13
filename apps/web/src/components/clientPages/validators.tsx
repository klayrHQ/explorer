'use client';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { Button, DonutChart, FlexGrid } from '@repo/ui/atoms';
import { NextValidators } from '@repo/ui/molecules';
import { useEffect, useState } from 'react';
import { validatorsTableHead } from '../../utils/constants.tsx';
import { createValidatorsRows } from '../../utils/helper.tsx';
import { useValidatorStore } from '../../store/validatorStore.ts';
import { useSocketStore } from '../../store/socketStore.ts';

export const Validators = () => {
  const validators = useValidatorStore((state) => state.validators);
  const nextValidators = useValidatorStore((state) => state.nextValidators);
  const totalValidators = useValidatorStore((state) => state.totalValidators);
  const callGetValidators = useValidatorStore((state) => state.callGetValidators);
  const callGetNextValidators = useValidatorStore((state) => state.callGetNextValidators);
  const setValidators = useValidatorStore((state) => state.setValidators);
  const setTotalValidators = useValidatorStore((state) => state.setTotalValidators);

  const newBlockEvent = useSocketStore((state) => state.height);

  const [loading, setLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(51);

  useEffect(() => {
    if (validators.length === 0) setLoading(true);
    callGetNextValidators();
    callGetValidators({
      limit: rowsPerPage.toString(),
    })
      .then((data) => {
        setTotalValidators(data.meta.total);
        setValidators(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [rowsPerPage, newBlockEvent]);

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
        <div className="hidden desktop:flex">
          <DonutChart data={mockChartData} />
        </div>
        <div className="hidden desktop:flex">
          <NextValidators validators={nextValidators} />
        </div>
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

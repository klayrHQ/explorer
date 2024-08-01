'use client';
import { SectionHeader } from '@repo/ui/organisms';
import {Button, DonutChart, FlexGrid} from '@repo/ui/atoms';
import {GatewayRes, ValidatorType} from "../../utils/types.ts";
import {useEffect, useState} from "react";
import gatewayClient from "../../network/gatewayClient.ts";

export const Validators = () => {
  const [validators, setValidators] = useState<ValidatorType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalValidators, setTotalValidators] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);

        const { data } = await gatewayClient.get<GatewayRes<ValidatorType[]>>('pos/validators', {
          params: {
            limit: rowsPerPage,
          },
        });

        if (data) {
          const validators: ValidatorType[] = data.data;
          setValidators(validators);
          setTotalValidators(data.meta.total);
          //console.log(validators);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [rowsPerPage]);

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
      </FlexGrid>
      <Button align={'center'} label={'See more'} onClick={() => setRowsPerPage(rowsPerPage + 10)} />
    </FlexGrid>
  );
};

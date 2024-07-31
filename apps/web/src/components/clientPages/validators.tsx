'use client';
import { SectionHeader } from '@repo/ui/organisms';
import {Button, FlexGrid} from '@repo/ui/atoms';
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
          console.log(validators);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [rowsPerPage]);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto" direction={'col'}>
      <FlexGrid gap={'3xl'}>
        <SectionHeader
          count={totalValidators ?? 0}
          subTitle={'Overview of all validators on the blockchain'}
          title={'Validators'}
        />
      </FlexGrid>
      <Button align={'center'} label={'See more'} onClick={() => setRowsPerPage(rowsPerPage + 10)} />
    </FlexGrid>
  );
};

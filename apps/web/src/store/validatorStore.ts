import { create } from 'zustand';
import { ValidatorType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';
import { NextValidatorType } from '@repo/ui/molecules';

const numberOfNextValidators = 3;

export interface ValidatorQueryParams {
  address?: string;
  status?: string;
  limit?: string;
  offset?: number;
  sort?: string;
}

interface ValidatorStore {
  validator: ValidatorType | undefined;
  validators: ValidatorType[];
  nextValidators: NextValidatorType[];
  totalValidators: number;
  setValidator: (validator: ValidatorType) => void;
  setValidators: (validators: ValidatorType[]) => void;
  setNextValidators: (nextValidators: NextValidatorType[]) => void;
  setTotalValidators: (totalValidators: number) => void;
  callGetValidators: (params: ValidatorQueryParams) => Promise<void>;
  callGetNextValidators: () => Promise<void>;
}

export const useValidatorStore = create<ValidatorStore>((set, get) => ({
  validator: undefined,
  validators: [],
  nextValidators: [],
  totalValidators: 0,
  setValidator: (validator: ValidatorType) => set(() => ({ validator })),
  setValidators: (validators: ValidatorType[]) => set(() => ({ validators })),
  setNextValidators: (nextValidators: NextValidatorType[]) => set(() => ({ nextValidators })),
  setTotalValidators: (totalValidators: number) => set(() => ({ totalValidators })),

  callGetValidators: async (params: ValidatorQueryParams) => {
    const { setValidator, setValidators, setTotalValidators } = get();
    const { address, status, limit, offset, sort = 'rank:asc' } = params;

    gatewayClient
      .get<GatewayRes<ValidatorType[]>>('pos/validators', {
        params: {
          address,
          status,
          limit,
          offset,
          sort,
        },
      })
      .then(({ data }) => {
        if (data?.data) {
          setTotalValidators(data.meta.total);
          if (data.data.length === 1) {
            setValidator(data.data[0]);
          } else {
            setValidators(data.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  callGetNextValidators: async () => {
    const { setNextValidators } = get();

    gatewayClient
      .get<GatewayRes<NextValidatorType[]>>('generators', {
        params: {
          limit: numberOfNextValidators,
        },
      })
      .then(({ data }) => {
        if (data?.data) {
          setNextValidators(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
}));

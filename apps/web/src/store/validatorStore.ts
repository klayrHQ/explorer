import { create } from 'zustand';
import { ValidatorType, GatewayRes, NextValidatorType } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

const numberOfNextValidators = 3;

export interface ValidatorQueryParams {
  address?: string;
  status?: string;
  limit?: string;
  offset?: number;
  sort?: string;
}

interface ValidatorStore {
  validators: ValidatorType[];
  nextValidators: NextValidatorType[];
  totalValidators: number;
  setValidators: (validators: ValidatorType[]) => void;
  setNextValidators: (nextValidators: NextValidatorType[]) => void;
  setTotalValidators: (totalValidators: number) => void;
  callGetValidators: (params: ValidatorQueryParams) => Promise<GatewayRes<ValidatorType[]>>;
  callGetNextValidators: () => Promise<void>;
}

export const useValidatorStore = create<ValidatorStore>((set, get) => ({
  validators: [],
  nextValidators: [],
  totalValidators: 0,
  setValidators: (validators: ValidatorType[]) => set(() => ({ validators })),
  setNextValidators: (nextValidators: NextValidatorType[]) => set(() => ({ nextValidators })),
  setTotalValidators: (totalValidators: number) => set(() => ({ totalValidators })),

  callGetValidators: async (params: ValidatorQueryParams) => {
    const { address, status, limit, offset, sort = 'rank:asc' } = params;

    try {
      const { data } = await gatewayClient.get<GatewayRes<ValidatorType[]>>('pos/validators', {
        params: {
          address,
          status,
          limit,
          offset,
          sort,
        },
      });

      if (data) {
        return data;
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
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

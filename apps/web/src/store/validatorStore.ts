import { create } from 'zustand';
import { ValidatorType, GatewayRes } from '../utils/types';
import gatewayClient from '../network/gatewayClient';

export interface ValidatorQueryParams {
  address?: string;
  status?: string;
  limit?: string;
  offset?: number;
}

interface ValidatorStore {
  validator: ValidatorType | undefined;
  validators: ValidatorType[];
  totalValidators: number;
  setValidator: (validator: ValidatorType) => void;
  setValidators: (validators: ValidatorType[]) => void;
  setTotalValidators: (totalValidators: number) => void;
  callGetValidators: (params: ValidatorQueryParams) => Promise<void>;
}

export const useValidatorStore = create<ValidatorStore>((set, get) => ({
  validator: undefined,
  validators: [],
  totalValidators: 0,
  setValidator: (validator: ValidatorType) => set(() => ({ validator })),
  setValidators: (validators: ValidatorType[]) => set(() => ({ validators })),
  setTotalValidators: (totalValidators: number) => set(() => ({ totalValidators })),

  callGetValidators: async (params: ValidatorQueryParams) => {
    const { setValidator, setValidators, setTotalValidators } = get();
    const { address, status, limit, offset } = params;

    gatewayClient
      .get<GatewayRes<ValidatorType[]>>('pos/validators', {
        params: {
          address,
          status,
          limit,
          offset,
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
}));

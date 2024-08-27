// src/helpers/blockHelpers.ts
import {
  BlockDetailsType,
  ChartDataType,
  EventsType,
  GatewayRes,
  NextValidatorType,
  TransactionType,
  ValidatorType,
} from '../types';
import { useGatewayClientStore } from '../../store/clientStore';
import {
  BlocksQueryParams,
  EventsQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
} from './types';

async function apiCall<T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<GatewayRes<T>> {
  const { client } = useGatewayClientStore.getState();

  try {
    const { data } = await client.get<GatewayRes<T>>(endpoint, { params });

    if (data) {
      return data;
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const callGetBlocks = async (
  params: BlocksQueryParams,
): Promise<GatewayRes<BlockDetailsType[]>> => {
  return apiCall<BlockDetailsType[]>('blocks', params);
};

export const callGetEvents = async (
  params: EventsQueryParams,
): Promise<GatewayRes<EventsType[]>> => {
  return apiCall<EventsType[]>('events', params);
};

export const callGetTransactions = async (
  params: TransactionQueryParams,
): Promise<GatewayRes<TransactionType[]>> => {
  return apiCall<TransactionType[]>('transactions', params);
};

export const callGetValidators = async (
  params: ValidatorQueryParams,
): Promise<GatewayRes<ValidatorType[]>> => {
  return apiCall<ValidatorType[]>('pos/validators', params);
};

export const callGetNextValidators = async (): Promise<GatewayRes<NextValidatorType[]>> => {
  return apiCall<NextValidatorType[]>('generators', { limit: 3 });
};

export const callGetChartData = async (): Promise<GatewayRes<ChartDataType[]>> => {
  return apiCall<ChartDataType[]>('pos/validators/status-count');
};

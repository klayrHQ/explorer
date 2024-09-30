// src/helpers/blockHelpers.ts
import {
  BlockDetailsType,
  ChartDataType,
  EventsType,
  GatewayRes,
  NodeInfoType,
  TokenSummaryType,
  TransactionType,
  ValidatorType,
  StakeType,
  StakesType,
  StakersType,
  UserType,
  TokenType,
} from '../types';
import { useGatewayClientStore } from '../../store/clientStore';
import {
  BlocksQueryParams,
  EventsQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
  StakersQueryParams,
  UsersQueryParams,
  TokensQueryParams,
} from './types';
import { NextValidatorType } from '@repo/ui/types';

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

export const callGetNodeInfo = async (): Promise<GatewayRes<NodeInfoType>> => {
  return apiCall<NodeInfoType>('node/info');
};

export const callGetTokenSummary = async (): Promise<GatewayRes<TokenSummaryType>> => {
  return apiCall<TokenSummaryType>('token/summary ');
};

export const callGetStakes = async (
  params: StakersQueryParams,
): Promise<GatewayRes<StakesType>> => {
  return apiCall<StakesType>('pos/stakes', params);
};

export const callGetStakers = async (
  params: StakersQueryParams,
): Promise<GatewayRes<StakersType>> => {
  return apiCall<StakersType>('pos/stakers', params);
};

export const callGetUsers = async (params: UsersQueryParams): Promise<GatewayRes<UserType>> => {
  return apiCall<UserType>('account', params);
};

export const callGetTokens = async (params: TokensQueryParams): Promise<GatewayRes<TokenType>> => {
  return apiCall<TokenType>('token/balances', params);
};

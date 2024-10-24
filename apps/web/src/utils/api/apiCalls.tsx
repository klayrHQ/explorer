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
  AccountType,
  TokenType,
  NodeType,
  ChainType,
  ChainTokenType,
} from '../types';
import { useGatewayClientStore } from '../../store/clientStore';
import {
  BlocksQueryParams,
  EventsQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
  StakersQueryParams,
  AccountQueryParams,
  TokensQueryParams,
  ChainsQueryParams,
  ChainTokenQueryParams,
} from './types';
import { NextValidatorType } from '@repo/ui/types';
import axios from 'axios';

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

export const callGetAccounts = async (
  params: AccountQueryParams,
): Promise<GatewayRes<AccountType>> => {
  return apiCall<AccountType>('account', params);
};

export const callGetTokens = async (params: TokensQueryParams): Promise<GatewayRes<TokenType>> => {
  return apiCall<TokenType>('token/balances', params);
};

export const callGetNodes = async (): Promise<GatewayRes<NodeType[]>> => {
  return apiCall<NodeType[]>('network/peers');
};

async function mainChainApiCall<T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<GatewayRes<T>> {
  const mainChainClient = axios.create({
    baseURL: 'https://gateway-mainnet.klayr.dev/api/v1/',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Methods': 'POST,GET',
    },
  });

  try {
    const { data } = await mainChainClient.get<GatewayRes<T>>(endpoint, { params });

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

export const callGetChains = async (
  params: ChainsQueryParams,
): Promise<GatewayRes<ChainType[]>> => {
  return apiCall<ChainType[]>('blockchain/apps/meta', params);
};

export const callGetChainTokens = async (
  params: ChainTokenQueryParams,
): Promise<GatewayRes<ChainTokenType[]>> => {
  return apiCall<ChainTokenType[]>('blockchain/apps/meta/tokens', params);
};

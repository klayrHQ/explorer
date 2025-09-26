// src/helpers/blockHelpers.ts
import {
  AccountType,
  AppsType,
  BlockDetailsType,
  ChainTokenType,
  ChainType,
  ChartDataType,
  ClaimableReward,
  EventsType,
  GatewayRes,
  MetaTransaction,
  NetworkStatus,
  NetworkStatusMeta,
  NodeType,
  StakersMetaType,
  StakersType,
  StakesMetaType,
  StakesType,
  TokenSummaryType,
  TokenType,
  TopAccountsType,
  TopAccountType,
  TransactionType,
  ValidatorsStatusCount,
  ValidatorType,
} from '../types';
import { useGatewayClientStore } from '../../store/clientStore';
import {
  AccountQueryParams,
  AppsQueryParams,
  BlocksQueryParams,
  ChainsQueryParams,
  ChainTokenQueryParams,
  EventsQueryParams,
  NodeQueryParams,
  PosClaimableRewardsQueryParams,
  StakersQueryParams,
  TokensQueryParams,
  TopAccountQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
} from './types';
import { NextValidatorType } from '@repo/ui/types';
import axios from 'axios';

async function apiCall<T, K extends MetaTransaction = MetaTransaction>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<GatewayRes<T, K>> {
  const { client } = useGatewayClientStore.getState();

  try {
    const { data } = await client.get<GatewayRes<T, K>>(endpoint, { params });

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

async function customApiCall<T>(
  baseUrl: string,
  endpoint: string,
  params: Record<string, any> = {},
): Promise<GatewayRes<T>> {
  const mainChainClient = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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

export const callGetChartData = async (): Promise<GatewayRes<ValidatorsStatusCount>> => {
  return apiCall<ValidatorsStatusCount>('pos/validators/status-count');
};

export const callGetPosClaimableRewards = async (
  params: PosClaimableRewardsQueryParams,
): Promise<GatewayRes<ClaimableReward[]>> => {
  return apiCall<ClaimableReward[]>('pos/rewards/claimable', params);
};

export const callGetTokenSummary = async (): Promise<GatewayRes<TokenSummaryType>> => {
  return apiCall<TokenSummaryType>('token/summary ');
};

export const callGetStakes = async (
  params: StakersQueryParams,
): Promise<GatewayRes<StakesType, StakesMetaType>> => {
  return apiCall<StakesType, StakesMetaType>('pos/stakes', params);
};

export const callGetStakers = async (
  params: StakersQueryParams,
): Promise<GatewayRes<StakersType, StakersMetaType>> => {
  return apiCall<StakersType, StakersMetaType>('pos/stakers', params);
};

export const callGetAccounts = async (
  params: AccountQueryParams,
): Promise<GatewayRes<AccountType>> => {
  return apiCall<AccountType>('account', params);
};

export const callGetTopAccounts = async (
  params: TopAccountQueryParams,
): Promise<GatewayRes<TopAccountsType>> => {
  return apiCall<TopAccountsType>('token/balances/top', params);
};

export const callGetTokens = async (
  params: TokensQueryParams,
): Promise<GatewayRes<TokenType[]>> => {
  return apiCall<TokenType[]>('token/balances', params);
};

export const callGetNodes = async (params: NodeQueryParams): Promise<GatewayRes<NodeType[]>> => {
  return apiCall<NodeType[]>('network/peers', params);
};

export const callGetNetworkStatus = async (): Promise<
  GatewayRes<NetworkStatus, NetworkStatusMeta>
> => {
  return apiCall<NetworkStatus, NetworkStatusMeta>('network/status');
};

export const callGetChains = async (
  params: ChainsQueryParams,
): Promise<GatewayRes<ChainType[]>> => {
  const mainnetResponse = await customApiCall<ChainType[]>(
    `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
    'blockchain/apps/meta',
    params,
  );
  const testnetResponse = await customApiCall<ChainType[]>(
    `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_TESTNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
    'blockchain/apps/meta',
    params,
  );
  return {
    data: mainnetResponse.data.concat(testnetResponse.data),
    meta: { ...mainnetResponse.meta, ...testnetResponse.meta },
  };
};

export const callGetChainTokens = async (
  params: ChainTokenQueryParams,
): Promise<GatewayRes<ChainTokenType[]>> => {
  const mainnetResponse = await customApiCall<ChainTokenType[]>(
    `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_MAINNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
    'blockchain/apps/meta/tokens',
    params,
  );
  const testnetResponse = await customApiCall<ChainTokenType[]>(
    `https://${process.env.NEXT_PUBLIC_KLAYR_SERVICE_TESTNET}/api/${process.env.NEXT_PUBLIC_KLAYR_SERVICE_API_VERSION}/`,
    'blockchain/apps/meta/tokens',
    params,
  );
  return {
    data: mainnetResponse.data.concat(testnetResponse.data),
    meta: { ...mainnetResponse.meta, ...testnetResponse.meta },
  };
};

export const callGetApps = async (params: AppsQueryParams): Promise<GatewayRes<AppsType[]>> => {
  return apiCall<AppsType[]>('blockchain/apps', params);
};

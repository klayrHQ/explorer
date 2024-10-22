import { Search } from '@repo/ui/organisms';

export interface BlocksQueryParams {
  blockID?: string;
  limit?: string;
  offset?: number;
  includeAssets?: boolean;
  generatorAddress?: string;
  sort?: string;
}

export interface EventsQueryParams {
  height?: string;
  transactionID?: string;
  senderAddress?: string;
  offset?: number;
  limit?: string;
}

export interface TransactionQueryParams {
  blockID?: string;
  transactionID?: string;
  limit?: string;
  offset?: number;
  address?: string;
  moduleCommand?: string;
  senderAddress?: string;
  recipientAddress?: string;
  sort?: string; // Include the sort parameter
}

export interface ValidatorQueryParams {
  address?: string;
  status?: string;
  limit?: string;
  offset?: number;
  sort?: string;
  name?: string;
}

export interface StakesQueryParams {
  address?: string;
  publicKey?: string;
  name?: number;
}

export interface StakersQueryParams {
  address?: string;
  publicKey?: string;
  name?: number;
}

export interface AccountQueryParams {
  address?: string;
  sort?: string;
  limit?: string;
  offset?: number;
}

export interface TokensQueryParams {
  address?: string;
}

export interface ChainsQueryParams {
  chainName?: string;
  displayName?: string;
  chainID?: string;
  isDefault?: boolean;
  network?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sort?: string;
}

export interface ChainTokenQueryParams {
  chainName?: string;
  chainID?: string;
  tokenName?: string;
  tokenID?: string;
  network?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sort?: string;
}

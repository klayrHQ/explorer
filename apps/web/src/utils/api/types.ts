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
  includeStatusValue?: boolean;
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

export interface PosClaimableRewardsQueryParams {
  address?: string;
  publicKey?: string;
  name?: string;
  limit?: number;
  offset?: number;
}

export interface AccountQueryParams {
  address?: string;
  sort?: string;
  limit?: string;
  offset?: number;
}

export interface TopAccountQueryParams {
  tokenID: string;
  limit?: number;
  offset?: number;
  sort?: string;
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

export interface AppsQueryParams {
  chainID?: string;
  chainName?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface NodeQueryParams {
  ip?: string;
  height?: string;
  state?: string;
  networkVersion?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

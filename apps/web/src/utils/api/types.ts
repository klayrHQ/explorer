import { Search } from "@repo/ui/organisms";

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
  name: string;
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
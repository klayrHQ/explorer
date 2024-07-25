export interface GatewayRes<T> {
  data: T;
  meta: MetaTransaction;
}

export interface MetaTransaction {
  count: number;
  offset: number;
  total: number;
}

export interface TransactionType {
  id: string;
  module: string;
  command: string;
  nonce: string;
  fee: string;
  minFee: string;
  size: number;
  block: BlockType;
  sender: SenderType;
  params: ParamsType;
  signatures: string[];
  executionStatus: string;
  index: number;
  recipient: {
    address: string;
    name?: string;
  };
  meta: MetaType;
}

export interface BlockType {
  id: string;
  height: number;
  timestamp: number;
  isFinal: boolean;
}

export interface SenderType {
  address: string;
  publicKey: string;
  name: string;
}

export interface ParamsType {
  tokenID: string;
  amount: string;
  recipientAddress: string;
  data: string;
}

export interface MetaType {
  recipient: RecipientType;
}

export interface RecipientType {
  address: string;
  publicKey: any;
  name: any;
}

export interface BlockDetailsType {
  height: number;
  id: string;
  version: number;
  timestamp: number;
  previousBlockID: string;
  stateRoot: string;
  assetRoot: string;
  eventRoot: string;
  transactionRoot: string;
  validatorsHash: string;
  generator: BlockGeneratorType;
  maxHeightPrevoted: number;
  maxHeightGenerated: number;
  impliesMaxPrevotes: boolean;
  signature: string;
  aggregatedCommit: {};
  numberOfTransactions: number;
  numberOfAssets: number;
  reward: string;
  isFinal: boolean;
  totalBurnt: string;
  networkFee: string;
  totalForged: string;
  assets: BlockAssetType[];
}

export interface BlockAssetType {
  module: string;
  data: any;
}

export interface BlockGeneratorType {
  address: string;
  name: string;
}

export interface EventsType {
  id: number;
  height: number;
  module: string;
  name: string;
  data: EventsDataType;
  topics: string[];
  index: number;
  block: BlockType;
}

export interface EventsDataType {
  address?: string;
  tokenID?: string;
  amount?: string;
  result?: number;
  reduction?: number;
}

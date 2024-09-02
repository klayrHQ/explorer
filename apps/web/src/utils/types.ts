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
  sender: AccountType;
  params: any;
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
  height?: number;
  timestamp?: number;
  isFinal?: boolean;
  numberOfTransactions?: number;
  reward?: string;
}

export interface ParamsType {
  tokenID: string;
  amount: string;
  recipientAddress: string;
  data: string;
}

export interface MetaType {
  recipient?: AccountType;
  count?: number;
  total?: number;
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
  numberOfEvents: number;
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

export interface ValidatorType {
  address: string;
  totalStake: string;
  selfStake: string;
  validatorWeight: string;
  generatedBlocks: number;
  rank: number;
  blsKey: string;
  proofOfPossession: string;
  generatorKey: string;
  lastGeneratedHeight: number;
  isBanned: boolean;
  status: string;
  reportMisbehaviorHeights: string[];
  punishmentPeriods: string;
  consecutiveMissedBlocks: number;
  commission: number;
  lastCommissionIncreaseHeight: number;
  sharingCoefficients: SharingCoefficientType[];
  account: AccountType;
  nextAllocatedTime?: number;
  totalRewards: string;
  blockReward: string;
}



export interface SharingCoefficientType {
  tokenID: string;
  coefficient: string;
}

export interface AccountType {
  address: string;
  publicKey: string;
  name: string;
}


export interface ChartDataType {
  id: number;
  label: string;
  value: number;
}
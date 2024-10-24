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
  sender: AccountSubType;
  params: any;
  signatures: string[];
  executionStatus: string;
  index: number;
  receivingChainID: string;
  recipient: {
    address: string;
    name?: string;
  };
  meta: MetaType;
}

export interface BlockType {
  assets: BlockAssetType[];
  numberOfAssets: number;
  numberOfEvents: number;
  generator: any;
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
  recipient?: AccountSubType;
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
  account: AccountSubType;
  nextAllocatedTime?: number;
  totalRewards: string;
  blockReward: string;
  totalSelfStakeRewards: string;
  totalSharedRewards: string;
}

export interface SharingCoefficientType {
  tokenID: string;
  coefficient: string;
}

export interface AccountSubType {
  address: string;
  publicKey: string;
  name: string;
  nonce: string;
}

export interface ChartDataType {
  id: number;
  label: string;
  value: number;
}

export interface NodeInfoType {
  version: string;
  networkVersion: string;
  chainID: string;
  lastBlockID: string;
  height: number;
  finalizedHeight: number;
  syncing: boolean;
  unconfirmedTransactions: number;
  genesisHeight: number;
  genesis: GenesisType;
  network: {
    version: string;
    port: number;
    seedPeers: string[];
  };
}

export interface GenesisType {
  block: {
    fromFile: string;
  };
  blockTime: number;
  bftBatchSize: number;
  maxTransactionsSize: number;
  minimumCertifyHeight: number;
  chainID: string;
}

export interface TokenSummaryType {
  escrowedAmounts: {
    escrowChainID: string;
    tokenID: string;
    amount: string;
  }[];
  totalSupply: {
    tokenID: string;
    totalSupply: string;
  }[];
  supportedTokens: string[];
  totalAccounts: number;
  totalTransactions: number;
}

export type StakesCalculatorPeriodType = 'block' | 'day' | 'month' | 'year' | string;

export interface PerfomanceStatsType {
  marketCap: number;
  totalTransactions: number;
  totalAccounts: number;
  totalValueLocked: number;
}

export type StakeType = {
  address: string;
  amount: string;
  name?: string;
};

export type StakesType = {
  stakes: StakeType[];
  meta: MetaTransaction;
};

export type StakersType = {
  stakers: StakeType[];
  meta: MetaTransaction;
};

export type AccountType = {
  lockedBalance: string | number;
  address: string;
  nonce: string;
  publicKey: string;
  name: string | null;
  totalBalance: string;
  availableBalance: string;
};

export type AccountsType = {
  accounts: AccountType[];
};

export interface FavouriteType {
  address: string;
  name?: string;
  /*weight: number;
  totalStake: string;
  stakeCapacity: string;*/
}

export interface LocalTokenBalancesType {
  amount: string;
  module: string;
}

export interface TokenType {
  tokenId: string;
  availableBalance: string;
  lockedBalances: LocalTokenBalancesType[];
}

export interface NodeType {
  chainID: string;
  networkVersion: string;
  nonce: string;
  advertiseAddress: boolean;
  options: {
    height: number;
    maxHeightPrevoted: number;
    blockVersion: number;
    lastBlockID: string;
    legacy: any[];
  };
  ipAddress: string;
  port: number;
  peerId: string;
}

export interface NftType {
  name?: string;
  image?: string;
  collection?: string;
  price?: string;
  status?: string;
  rarityRank?: string;
  chain?: string;
  chainImage?: string;
}

export interface ServiceURLsType {
  http: string;
  ws: string;
  apiCertificatePublicKey: string;
  appChainID: string;
}

export interface ChainType {
  chainID: string;
  chainName: string;
  displayName: string;
  title: string;
  status: string;
  description: string;
  networkType: string;
  isDefault: boolean;
  genesisURL: string;
  projectPage: string;
  backgroundColor: string;
  serviceURLs: ServiceURLsType[];
  logo: {
    png: string;
    svg: string;
    appChainID: string;
  };
  explorers: {
    url: string;
    txnPage: string;
    appChainID: string;
  }[];
  appNodes: {
    url: string;
    maintainer: string;
    apiCertificatePublicKey: string;
    appChainID: string;
  }[];
  token: ChainTokenType;
}

export interface ChainTokenType {
  chainName: string;
  networkType: string;
  tokenID: string;
  chainID: string;
  tokenName: string;
  description: string;
  symbol: string;
  displayDenom: string;
  baseDenom: string;
  logo: {
    png: string;
    svg: string;
    tokenID: string;
  };
  denomUnits: {
    denom: string;
    decimals: number;
    aliases: string[];
    tokenID: string;
  }[];
}
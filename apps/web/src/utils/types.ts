export interface GatewayRes<T, K extends MetaTransaction = MetaTransaction> {
  data: T;
  meta: K;
}

export interface MetaTransaction {
  count: number;
  offset: number;
  total: number;
}

export interface TransactionType {
  id: string;
  moduleCommand: string;
  nonce: string;
  fee: string;
  minFee: string;
  size: number;
  block: BlockConciseWithFinalType;
  sender: AccountSubType;
  params: Record<string, any>;
  signatures: string[];
  executionStatus: string;
  index: number;
  meta: MetaType;
}

export interface BlockConciseWithFinalType {
  id: string;
  height: number;
  timestamp: number;
  isFinal: boolean;
}

export interface BlockConciseType {
  id: string;
  height: number;
  timestamp: number;
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
}

export interface BlockDetailsType {
  id: string;
  version: number;
  height: number;
  timestamp: number;
  previousBlockID: string;
  generator: BlockGeneratorType;
  transactionRoot: string;
  assetRoot: string;
  stateRoot: string;
  eventRoot: string;
  maxHeightGenerated: number;
  maxHeightPrevoted: number;
  validatorsHash: string;
  aggregateCommit: AggregateCommit;
  numberOfTransactions: number;
  numberOfEvents: number;
  numberOfAssets: number;
  totalBurnt: string;
  networkFee: string;
  totalForged: string;
  reward: string;
  signature: string;
  isFinal: boolean;
  assets: BlockAssetType[];
}

export interface AggregateCommit {
  height: number;
  aggregationBits: string;
  certificateSignature: string;
}

export interface BlockAssetType {
  module: string;
  data: any;
}

export interface BlockGeneratorType {
  address: string;
  name: string;
  publicKey: string;
}

export interface EventsType {
  id: number;
  module: string;
  name: string;
  data: EventsDataType;
  topics: string[];
  index: number;
  block: BlockConciseType;
}

export interface EventsDataType {
  address?: string;
  tokenID?: string;
  amount?: string;
  result?: number;
  reduction?: number;
}

export interface ValidatorType {
  name: string;
  totalStake: string;
  selfStake: string;
  validatorWeight: string;
  address: string;
  publicKey: string;
  lastGeneratedHeight: number;
  status: string;
  isBanned: boolean;
  reportMisbehaviorHeights: number[];
  punishmentPeriods: {
    start: number;
    end: number;
  }[];
  consecutiveMissedBlocks: number;
  commission: number;
  lastCommissionIncreaseHeight: number;
  sharingCoefficients: SharingCoefficientType[];
  rank: number;
  generatedBlocks: number;
  totalCommission: number;
  totalSelfStakeRewards: string;
  earnedRewards: string;
  blockReward: string;
  nextAllocatedTime: number;
  statusValue?: {
    height: number;
    maxHeightGenerated: number;
    maxHeightPrevoted: number;
  };
}

export interface PosConstantsType {
  factorSelfStakes: number;
  maxLengthName: number;
  maxNumberSentStakes: number;
  maxNumberPendingUnlocks: number;
  failSafeMissedBlocks: number;
  failSafeInactiveWindow: number;
  punishmentWindowStaking: number;
  punishmentWindowSelfStaking: number;
  roundLength: number;
  minWeightStandby: string;
  numberActiveValidators: number;
  numberStandbyValidators: number;
  posTokenID: string;
  maxBFTWeightCap: number;
  commissionIncreasePeriod: number;
  maxCommissionIncreaseRate: number;
  useInvalidBLSKey: boolean;
  baseStakeAmount: string;
  lockingPeriodStaking: number;
  lockingPeriodSelfStaking: number;
  reportMisbehaviorReward: string;
  reportMisbehaviorLimitBanned: number;
  weightScaleFactor: string;
  extraCommandFees: {
    validatorRegistrationFee: string;
  };
}

export interface SharingCoefficientType {
  tokenID: string;
  coefficient: string;
}

export interface AccountSubType {
  address: string;
  publicKey: string;
  name: string;
}

export interface ValidatorsStatusCount {
  active: number;
  ineligible: number;
  standby: number;
  punished: number;
  banned: number;
}

export interface ClaimableReward {
  tokenID: string;
  reward: string;
}

export interface ChartDataType {
  id: number;
  label: string;
  value: number;
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
  supportedTokens: {
    isSupportAllTokens: boolean;
    patternTokenIDs: string[];
    exactTokenIDs: string[];
  }[];
  totalSupply: {
    tokenID: string;
    amount: string;
  }[];
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
};

export interface StakesMetaType extends MetaTransaction {
  staker: {
    address: string;
    publicKey: string;
    name: string;
  };
}

export type StakersType = {
  stakers: StakeType[];
};

export interface StakersMetaType extends MetaTransaction {
  validator: {
    address: string;
    publicKey: string;
    name: string;
  };
}

export type AccountType = {
  address: string;
  nonce: string;
  publicKey: string;
  name: string | null;
  description: string | null;
  tokenBalances: TokenBalancesType[];
};

export type TokenBalancesType = {
  tokenID: string;
  totalBalance: string;
  availableBalance: string;
  lockedBalance: string | number;
};

export type AccountsType = {
  accounts: AccountType[];
};

export type TopAccountType = {
  address: string;
  publicKey: string;
  name: string;
  balance: string;
  availableBalance: string;
  lockedBalance: string;
  knowledge: {
    owner: string;
    description: string;
  };
};

export type TopAccountsType = Record<string, TopAccountType[]>;

export interface FavouriteType {
  address: string;
  name?: string;
  /*weight: number;
  totalStake: string;
  stakeCapacity: string;*/
}

export interface LocalTokenBalancesType {
  module: string;
  amount: string;
}

export interface TokenType {
  tokenID: string;
  availableBalance: string;
  lockedBalances: LocalTokenBalancesType[];
}

export interface NodeType {
  ip: string;
  port: number;
  networkVersion: string;
  chainID: string;
  state: string;
  height: number;
  location: {
    countryCode: string;
    countryName: string;
    hostname: string;
    ip: string;
    latitude: number;
    longitude: number;
  };
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
}

export interface ChainType {
  chainName: string;
  chainID: string;
  displayName: string;
  title: string;
  status: string;
  description: string;
  networkType: string;
  isDefault: boolean;
  genesisURL: string;
  projectPage: string;
  serviceURLs: ServiceURLsType[];
  logo: {
    png: string;
    svg: string;
  };
  appPage: string;
  backgroundColor: string;
  explorers: {
    url: string;
    txnPage: string;
  }[];
  appNodes: {
    url: string;
    maintainer: string;
    apiCertificatePublicKey: string;
  }[];
  blockchainApp?: {
    status?: string;
    address?: string;
    lastCerticateHeight?: number;
    lastUpdated?: number;
    escrowedKLY?: string;
    escrow?: Escrow[];
  };
}

export interface ChainTokenType {
  chainID: string;
  chainName: string;
  tokenID: string;
  tokenName: string;
  networkType: string;
  description: string;
  denomUnits: {
    denom: string;
    decimals: number;
    aliases: string[];
  }[];
  symbol: string;
  displayDenom: string;
  baseDenom: string;
  logo: {
    png: string;
    svg: string;
  };
}

export interface ChainTokenTypeWithLogoAndDisplayName extends ChainTokenType {
  chainLogo: {
    png: string;
    svg: string;
  };
  displayName?: string;
}

export interface NetworkStatus {
  version: string;
  networkVersion: string;
  chainID: string;
  lastBlockID: string;
  height: number;
  finalizedHeight: 0;
  syncing: true;
  unconfirmedTransactions: number;
  genesis: {
    block: {
      fromFile: string;
    };
    blockTime: number;
    chainID: string;
    maxTransactionsSize: number;
    minimumCertifyHeight: number;
    bftBatchSize: number;
  };
  genesisHeight: number;
  registeredModules: string[];
  moduleCommands: string[];
  network: {
    version: string;
    port: number;
    seedPeers: {
      ip: string;
      port: number;
    }[];
  };
}

export interface NetworkStatusMeta extends MetaTransaction {
  lastUpdate: string;
  lastBlockHeight: number;
  lastBlockID: string;
}

export interface AppsType {
  chainName: string;
  chainID: string;
  status: string;
  address: string;
  lastCerticateHeight: number;
  lastUpdated: number;
  escrowedKLY: string;
  escrow: Escrow[];
}

export interface Escrow {
  tokenID: string;
  amount: string;
}

export interface CombinedAppsType extends AppsType {
  logo?: {
    png: string;
    svg: string;
    appChainID: string;
  };
  displayName?: string;
  projectPage?: string;
  meta?: boolean;
  blockchainApp?: {
    address: string;
    escrowedKLY: string;
    lastUpdated: number;
  };
}

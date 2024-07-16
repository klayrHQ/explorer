export interface GatewayRes<T> {
  data: T
  meta: MetaTransaction
}

export interface MetaTransaction {
  count: number
  offset: number
  total: number
}

export interface TransactionType {
  id: string
  module: string
  command: string
  nonce: string
  fee: string
  minFee: string
  size: number
  block: BlockType
  sender: SenderType
  params: ParamsType
  signatures: string[]
  executionStatus: string
  index: number
  recipient: {
    address: string
    name?: string
  }
  meta: MetaType
}

export interface BlockType {
  id: string
  height: number
  timestamp: number
  isFinal: boolean
}

export interface SenderType {
  address: string
  publicKey: string
  name: string
}

export interface ParamsType {
  tokenID: string
  amount: string
  recipientAddress: string
  data: string
}

export interface MetaType {
  recipient: RecipientType
}

export interface RecipientType {
  address: string
  publicKey: any
  name: any
}
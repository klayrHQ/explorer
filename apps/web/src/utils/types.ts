export interface TransactionType {
  id: string
  moduleCommand: string
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
// src/helpers/blockHelpers.ts
import {
  BlockDetailsType,
  EventsType,
  GatewayRes,
  NextValidatorType,
  TransactionType,
  ValidatorType,
} from '../types';
import { useGatewayClientStore } from '../../store/clientStore';
import {
  BlocksQueryParams,
  EventsQueryParams,
  TransactionQueryParams,
  ValidatorQueryParams,
} from './types';

export const callGetBlocks = async (
  params: BlocksQueryParams,
): Promise<GatewayRes<BlockDetailsType[]>> => {
  try {
    const { client } = useGatewayClientStore.getState();
    const { data } = await client.get<GatewayRes<BlockDetailsType[]>>('blocks', {
      params,
    });

    if (data) {
      return data;
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const callGetEvents = async (
  params: EventsQueryParams,
): Promise<GatewayRes<EventsType[]>> => {
  const { client } = useGatewayClientStore.getState();
  const { height, transactionID, senderAddress, offset, limit } = params;

  try {
    const { data } = await client.get<GatewayRes<EventsType[]>>('events', {
      params: {
        height,
        transactionID,
        senderAddress,
        offset,
        limit,
      },
    });

    if (data) {
      return data;
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const callGetTransactions = async (
  params: TransactionQueryParams,
): Promise<GatewayRes<TransactionType[]>> => {
  const { client } = useGatewayClientStore.getState();
  const {
    blockID,
    transactionID,
    limit,
    offset,
    address,
    moduleCommand,
    senderAddress,
    recipientAddress,
    sort,
  } = params;

  try {
    const { data } = await client.get<GatewayRes<TransactionType[]>>('transactions', {
      params: {
        blockID,
        transactionID,
        limit,
        offset,
        address,
        moduleCommand,
        senderAddress,
        recipientAddress,
        sort,
      },
    });

    if (data) {
      return data;
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const callGetValidators = async (params: ValidatorQueryParams) => {
  const { client } = useGatewayClientStore.getState();
  const { address, status, limit, offset, sort = 'rank:asc' } = params;

  try {
    const { data } = await client.get<GatewayRes<ValidatorType[]>>('pos/validators', {
      params: {
        address,
        status,
        limit,
        offset,
        sort,
      },
    });

    if (data) {
      return data;
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const callGetNextValidators = async () => {
  const { client } = useGatewayClientStore.getState();

  try {
    const { data } = await client.get<GatewayRes<NextValidatorType[]>>('generators', {
      params: {
        limit: 3,
      },
    });

    if (data) {
      return data;
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

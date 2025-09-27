import {
  ChainTokenType,
  ChainTokenTypeWithLogoAndDisplayName,
  ClaimableReward,
  TokenType,
} from '../../types.ts';
import { ChainType } from '@repo/ui/types';
import { KeyValueComponent, Link, StatusIcon, TokenCard } from '@repo/ui/atoms';
import { Currency } from '../../../components/currency.tsx';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { ImageName } from '@repo/ui/molecules';
import { getTableSkeletons } from '../dataHelpers.tsx';
import React from 'react';
import { tokensTableHead } from '../tableHeaders.tsx';
import Placeholder from '../../../assets/images/placeholder.png';

type TokensChainsMeta = { tokens: ChainTokenType[]; chains: ChainType[] };

const getTokenMeta = (tokenID: string, meta: TokensChainsMeta) => {
  const tokenMeta = meta.tokens.find((t) => t.tokenID === tokenID);
  if (tokenMeta) return tokenMeta;
  return undefined;
};

const getChainMeta = (tokenID: string, meta: TokensChainsMeta) => {
  const chainMeta = meta.chains.find((t) => t.chainID === tokenID.substring(0, 8));
  if (chainMeta) return chainMeta;
  return undefined;
};

const getClaimableRewards = (tokenID: string, claimableRewards: ClaimableReward[]) => {
  const claimable = claimableRewards.find((t) => t.tokenID === tokenID);
  if (claimable) return claimable.reward;
  return '0';
};

export const createUserDetailsTokensRow = (
  token: TokenType[],
  claimableRewards: ClaimableReward[],
  loading: boolean,
  meta: TokensChainsMeta,
) => {
  return !loading
    ? token?.map((token) => {
        const totalBalance =
          Number(token.availableBalance) + Number(token.lockedBalances?.[0]?.amount ?? 0);
        const availablePercentage =
          totalBalance > 0
            ? ((Number(token.availableBalance) / totalBalance) * 100).toFixed(2)
            : '0.00';
        const lockedPercentage =
          totalBalance > 0
            ? ((Number(token.lockedBalances?.[0]?.amount ?? 0) / totalBalance) * 100).toFixed(2)
            : '0.00';

        const tokenMeta = getTokenMeta(token.tokenID, meta);
        const chainMeta = getChainMeta(token.tokenID, meta);

        return {
          cells: [
            {
              children: (
                <TokenCard
                  image={tokenMeta?.logo?.png ?? Placeholder.src}
                  name={tokenMeta?.tokenName ?? '{Unknown}'}
                  symbol={tokenMeta?.symbol ?? '???'}
                />
              ),
            },
            {
              children: (
                <div className="flex flex-col">
                  <Currency amount={totalBalance} decimals={0} fontWeight={'semibold'} />
                  {/* TODO: add market equivalent value later */}
                  {/* <Currency
                    amount={Number(token.availableBalance) * 2}
                    className="text-onBackgroundLow text-caption"
                    decimals={2}
                    symbol={'USD'}
                    sign={'$'}
                  /> */}
                </div>
              ),
            },
            {
              children: (
                <div className="flex flex-col ">
                  <Currency amount={token.availableBalance} decimals={0} fontWeight={'semibold'} />
                  <FormattedValue format={'percentage'} value={availablePercentage} />
                </div>
              ),
            },
            {
              children: (
                <div className="flex flex-col ">
                  <Currency
                    amount={token.lockedBalances?.[0]?.amount ?? 0}
                    decimals={0}
                    fontWeight={'semibold'}
                  />
                  <FormattedValue format={'percentage'} value={lockedPercentage} />
                </div>
              ),
            },
            {
              children: (
                <Currency
                  amount={getClaimableRewards(token.tokenID, claimableRewards)}
                  decimals={0}
                />
              ),
            },
            {
              children: (
                <ImageName
                  imageUrl={chainMeta?.logo.png ?? ''}
                  name={chainMeta?.displayName ?? chainMeta?.chainName ?? ''}
                />
              ),
            },
          ],
        };
      })
    : getTableSkeletons(6);
};
export const createTokensRows = (
  tokens: ChainTokenTypeWithLogoAndDisplayName[],
  loading: boolean,
  basePath: string,
) => {
  const columnCount = tokensTableHead.length;

  return !loading
    ? tokens?.map((token) => {
        return {
          cells: [
            {
              children: (
                <Link basePath={basePath} href={`/tokens/${token.tokenID}`}>
                  <TokenCard
                    image={token.logo.png ?? token.logo.svg ?? ''}
                    name={token.tokenName}
                    symbol={token.symbol}
                  />
                </Link>
              ),
            },
            {
              children: (
                <Link basePath={basePath} href={`/chains/${token.chainID}`}>
                  <ImageName
                    imageUrl={token.chainLogo?.png ?? token.chainLogo?.svg ?? ''}
                    name={token.displayName ?? token.chainName}
                  />
                </Link>
              ),
            },
            {
              children: <FormattedValue format={'string'} value={token.description} />,
            },
          ],
        };
      })
    : getTableSkeletons(columnCount);
};

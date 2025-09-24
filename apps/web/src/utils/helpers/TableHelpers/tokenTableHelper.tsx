import { ChainTokenType, ChainTokenTypeWithLogoAndDisplayName, TokenType } from '../../types.ts';
import { ChainType } from '@repo/ui/types';
import { KeyValueComponent, Link, StatusIcon, TokenCard } from '@repo/ui/atoms';
import { Currency } from '../../../components/currency.tsx';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { ImageName } from '@repo/ui/molecules';
import { getTableSkeletons } from '../dataHelpers.tsx';
import React from 'react';
import { tokensTableHead } from '../tableHeaders.tsx';

export const createUserDetailsTokensRow = (
  token: TokenType[],
  chain: ChainType,
  loading: boolean,
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

        return {
          cells: [
            {
              children: (
                <TokenCard
                  image={'https://cdn.pixabay.com/photo/2023/10/17/17/01/cat-8321993_1280.jpg'}
                  name={'Monkeyz'}
                  symbol={'MON'}
                />
              ),
            },
            {
              children: (
                <div className="flex flex-col">
                  <Currency amount={totalBalance} decimals={0} fontWeight={'semibold'} />
                  <Currency
                    amount={Number(token.availableBalance) * 2}
                    className="text-onBackgroundLow text-caption"
                    decimals={2}
                    sign={'$'}
                  />
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
              children: <FormattedValue format={'number'} value={2} />,
            },
            {
              children: (
                <ImageName
                  imageUrl={chain.logo.png ?? ''}
                  name={chain.displayName ?? chain.chainName ?? ''}
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

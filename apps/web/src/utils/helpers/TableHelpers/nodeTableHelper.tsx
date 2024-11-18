import { NodeType } from '../../types.ts';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { StatusBadge, Typography } from '@repo/ui/atoms';
import { getTableSkeletons } from '../dataHelpers.tsx';
import React from 'react';

export const createNodesRows = (nodes: NodeType[], loading: boolean) => {
  return !loading
    ? nodes?.map((node) => {
        return {
          cells: [
            {
              children: <FormattedValue format={'string'} value={node.ipAddress} />,
            },
            {
              children: <FormattedValue format={'string'} value={node.port} />,
            },
            {
              children: (
                <div className="flex gap-2 items-center">
                  <div className="flex h-6 w-6 bg-white rounded-full items-center justify-center">
                    <div className="flex h-3 w-3 bg-error rounded-full"></div>
                  </div>
                  <Typography
                    color={'onBackgroundMedium'}
                    fontWeight={'semibold'}
                    variant={'paragraph-sm'}
                  >
                    {'Japan'}
                  </Typography>
                </div>
              ),
            },
            {
              children: <FormattedValue format={'number'} value={node.options.blockVersion} />,
            },
            {
              children: <FormattedValue format={'number'} value={node.options.height} />,
            },
            {
              children: <StatusBadge status={'online'} />,
            },
          ],
        };
      })
    : getTableSkeletons(6);
};

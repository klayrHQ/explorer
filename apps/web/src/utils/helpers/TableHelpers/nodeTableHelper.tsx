import { NodeType } from '../../types.ts';
import { FormattedValue } from '../../../components/formattedValue.tsx';
import { StatusBadge, Typography } from '@repo/ui/atoms';
import { getTableSkeletons } from '../dataHelpers.tsx';
import React from 'react';
import Earth from '../../../public/images/earth.svg';

export const createNodesRows = (nodes: NodeType[], loading: boolean) => {
  return !loading
    ? nodes?.map((node) => {
        return {
          cells: [
            {
              children: <FormattedValue format={'string'} value={node.ip} />,
            },
            {
              children: <FormattedValue format={'string'} value={node.port} />,
            },
            {
              children: (
                <div className="flex gap-2 items-center">
                  <div
                    className="w-8 h-6 rounded-xs bg-cover bg-center bg-no-repeat shrink-0"
                    style={{
                      backgroundImage: node.location
                        ? `url(http://purecatamphetamine.github.io/country-flag-icons/3x2/${node.location.countryCode}.svg)`
                        : `url(${Earth.src})`,
                    }}
                    title={node.location?.countryName || 'Earth'}
                  ></div>

                  <Typography
                    color={'onBackgroundMedium'}
                    fontWeight={'semibold'}
                    variant={'paragraph-sm'}
                  >
                    {node.location?.countryName || 'Earth'}
                  </Typography>
                </div>
              ),
            },
            {
              children: <FormattedValue format={'number'} value={node.networkVersion} />,
            },
            {
              children: <FormattedValue format={'number'} value={node.height} />,
            },
            {
              children: (
                <div>
                  {node.state === 'connected' ? (
                    <StatusBadge status={'online'} />
                  ) : (
                    <StatusBadge status={'offline'} />
                  )}
                </div>
              ),
            },
          ],
        };
      })
    : getTableSkeletons(6);
};

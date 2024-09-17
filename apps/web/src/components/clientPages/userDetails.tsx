'use client';

import { FlexGrid, TabButtons, Typography, CopyIcon } from '@repo/ui/atoms';
import { DetailsSection, SectionHeader, TableContainer } from '@repo/ui/organisms';
import { UsersType } from '../../utils/types.ts';
import { useState, useEffect } from 'react';
import { DataType } from '@repo/ui/types';
import { callGetValidators } from '../../utils/api/apiCalls.tsx';

export const UserDetails = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UsersType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    callGetValidators({
      address: params.id,
    })
      .then((data) => setUser(data.data[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [params.id]);

  const createDetails = (label: string, value: any = ' - ', mobileWidth?: string) => {
    return { label: { label }, value, mobileWidth };
  };

  const details = [
    createDetails(
      'Validator address',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{user?.account.address}</Typography>
        <CopyIcon content={user?.account.address || ''} size={'xxs'} />
      </div>,
    ),
    createDetails(
      'Public Key',
      <div className="flex flex-row gap-1.5 items-baseline ">
        <Typography variant={'paragraph-sm'}>{user?.account.publicKey}</Typography>
        <CopyIcon content={user?.account.publicKey || ''} size={'xxs'} />
      </div>,
      'half',
    ),
  ];

  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <DetailsSection data={details} json={user as unknown as DataType} title={'User Details'} />
      ),
    },
    {
      value: 2,
      label: 'Transactions',
      icon: 'SwitchHorizontal',
      content: <>2</>,
    },
    {
      value: 3,
      label: 'Stakes',
      icon: 'LayersThree',
      content: <>3</>,
    },
    {
      value: 4,
      label: 'Events',
      icon: 'List',
      content: <>4</>,
    },
  ];

  return (
    <FlexGrid direction={'col'} gap={'5xl'}>
      <TabButtons tabs={tabs} />
    </FlexGrid>
  );
};

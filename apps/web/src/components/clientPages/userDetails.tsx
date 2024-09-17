'use client';

import { FlexGrid, TabButtons } from '@repo/ui/atoms';
// import { DetailsSection, SectionHeader, TableContainer } from '@repo/ui/organisms';

export const UserDetails = ({ params }: { params: { id: string } }) => {
  const tabs = [
    {
      value: 1,
      label: 'Details',
      icon: 'InfoSquare',
      content: (
        <>1</>
        // <DetailsSection
        //   data={}
        //   json={}
        //   title={'User Details'}
        // />
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

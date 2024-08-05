import { FlexGrid, StatusTag, Typography } from '../../atoms';

interface TxDataPopoverProps {
  txData: {
    status: 'success' | 'pending' | 'failed' | string;
    data: string;
    nonce: number | string;
  };
}

export const TxDataPopover = ({ txData }: TxDataPopoverProps) => {
  const gap = '';

  return (
    <FlexGrid className={'px-4 min-w-44'} direction={'col'}>
      <FlexGrid
        alignItems={'center'}
        className={'w-full min-h-8 max-h-8 py-2'}
        justify={'between'}
        mobileDirection={'row'}
      >
        <Typography color={'onBackgroundLow'} variant={'caption'}>
          {'Status'}
        </Typography>
        <StatusTag status={txData.status} variant={'caption'} />
      </FlexGrid>
      <FlexGrid
        alignItems={'center'}
        className={'w-full min-h-8 max-h-8 py-2'}
        justify={'between'}
        mobileDirection={'row'}
      >
        <Typography color={'onBackgroundLow'} variant={'caption'}>
          {'Data'}
        </Typography>
        <Typography fontWeight="semibold" variant={'caption'}>
          {txData.data}
        </Typography>
      </FlexGrid>
      <FlexGrid
        alignItems={'center'}
        className={'w-full min-h-8 max-h-8 py-2'}
        justify={'between'}
        mobileDirection={'row'}
      >
        <Typography color={'onBackgroundLow'} variant={'caption'}>
          {'Nonce'}
        </Typography>
        <Typography fontWeight="semibold" variant={'caption'}>
          {txData.nonce}
        </Typography>
      </FlexGrid>
    </FlexGrid>
  );
};

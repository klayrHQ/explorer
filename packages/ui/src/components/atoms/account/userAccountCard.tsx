import { FlexGrid, Typography } from '@repo/ui/atoms';
import { shortString } from '@repo/ui/utils';
import { Avatar } from './avatar/avatar.tsx';
import { TypographyVariant, FontWeight } from '../../../types/types.ts';

interface UserAccountCardProps {
  address: string;
  name?: string;
  size?: number;
  nameColor?: string;
  nameVariant?: TypographyVariant;
  addressColor?: string;
  addressVariant?: TypographyVariant;
  width?: string;
  fontWeight?: FontWeight;
}

export const UserAccountCard = ({
  address,
  name,
  size = 32,
  nameColor = 'onBackgroundMediumHigh',
  nameVariant = 'paragraph-sm',
  addressColor = 'onBackgroundLow',
  addressVariant = 'caption',
  width = 'full',
  fontWeight = 'normal',
}: UserAccountCardProps) => {
  return (
    <FlexGrid
      alignItems={'center'}
      className={`w-${width} cursor-pointer`}
      gap={'md'}
      mobileDirection={'row'}
    >
      <Avatar address={address} circle size={size} />
      <FlexGrid direction={'col'} gap={'0'}>
        <Typography
          className={'leading-none'}
          color={nameColor}
          fontWeight={fontWeight}
          variant={nameVariant}
        >
          {name}
        </Typography>
        <Typography
          className={'leading-none'}
          color={addressColor}
          fontWeight={fontWeight}
          variant={addressVariant}
        >
          {shortString(address, 12, 'center')}
        </Typography>
      </FlexGrid>
    </FlexGrid>
  );
};

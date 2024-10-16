import { FlexGrid, Typography } from '@repo/ui/atoms';
import { shortString } from '@repo/ui/utils';
import { Avatar } from './avatar/avatar.tsx';
import { TypographyVariant, FontWeight } from '../../../types/types.ts';
import { CopyIcon } from '../input/copyIcon.tsx';

export interface UserAccountCardProps {
  address: string;
  name?: string | null;
  size?: number;
  nameColor?: string;
  nameVariant?: TypographyVariant;
  addressColor?: string;
  addressVariant?: TypographyVariant;
  width?: string;
  fontWeight?: FontWeight;
  nameFontWeight?: FontWeight;
  nameOnly?: boolean;
  copyIcon?: boolean;
  truncateName?: boolean;
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
  nameFontWeight = 'semibold',
  nameOnly = false,
  copyIcon = false,
  truncateName = false,
}: UserAccountCardProps) => {
  return (
    <FlexGrid alignItems={'center'} className={`w-${width}`} gap={'md'} mobileDirection={'row'}>
      <Avatar address={address} circle size={size} />
      <FlexGrid direction={'col'} gap={'0'}>
        {name && nameOnly && !truncateName && (
          <Typography color={nameColor} fontWeight={nameFontWeight} variant={nameVariant}>
            {name}
          </Typography>
        )}
        {name && nameOnly && truncateName && (
          <Typography
            className="max-w-16 truncate"
            color={nameColor}
            fontWeight={nameFontWeight}
            variant={nameVariant}
          >
            {name}
          </Typography>
        )}
        {name && !nameOnly && (
          <>
            <Typography color={nameColor} fontWeight={'semibold'} variant={nameVariant}>
              {name}
            </Typography>
            <div className="flex items-center gap-2">
              <Typography color={addressColor} fontWeight={fontWeight} variant={addressVariant}>
                {shortString(address, 12, 'center')}
              </Typography>
              {copyIcon && <CopyIcon content={address} size={'xxs'} />}
            </div>
          </>
        )}
        {!name && (
          <Typography color={addressColor} fontWeight={fontWeight} variant={addressVariant}>
            {shortString(address, 12, 'center')}
          </Typography>
        )}
      </FlexGrid>
    </FlexGrid>
  );
};

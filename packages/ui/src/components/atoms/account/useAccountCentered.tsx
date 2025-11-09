import { FlexGrid, Typography } from '@repo/ui/atoms';
import { shortString } from '@repo/ui/utils';
import { Avatar } from './avatar/avatar.tsx';
import { TypographyVariant, FontWeight } from '../../../types/types.ts';
import { CopyIcon } from '../input/copyIcon.tsx';
import { ImageNotification } from '@repo/ui/atoms';
import { StatusBadge } from '@repo/ui/atoms';

export interface UserAccountCenteredProps {
  address: string;
  name?: string;
  publicKey?: string;
  status?: string;
  notificationValue?: number | string;
  role?: string;
  validator?: boolean;
  isMobile?: boolean;
}

export const UserAccountCentered = ({
  address,
  name,
  publicKey,
  status,
  notificationValue,
  role = 'Validator',
  validator = true,
  isMobile,
}: UserAccountCenteredProps) => {
  const mainContentCopy = name ? '' : address;
  const subContentCopy = name ? address : publicKey ? publicKey : '';

  return (
    <div className="flex gap-2 ">
      <div className="flex items-center">
        {validator && <ImageNotification notificationValue={notificationValue ?? 0} />}
        <Avatar address={address} circle size={40} />
      </div>
      <div className="flex flex-col gap-1.5 desktop:gap-0">
        <div className="flex desktop:hidden">
          {status && <StatusBadge status={`${status} ${role}`} />}
        </div>
        <div className="flex items-center gap-2">
          {mainContentCopy ? (
            <CopyIcon content={mainContentCopy} size={'small'} isMobile={isMobile}>
              <Typography color={'onBackground'} fontWeight={'semibold'} variant={'h3'}>
                {name ? name : shortString(address, 12, 'center')}
              </Typography>
            </CopyIcon>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {subContentCopy ? (
            <CopyIcon content={subContentCopy} size={'xxs'} isMobile={isMobile}>
              <Typography color={'onBackgroundMedium'} fontWeight={'normal'} variant={'caption'}>
                {name
                  ? shortString(address, 12, 'center')
                  : publicKey
                    ? shortString(publicKey, 12, 'center')
                    : ''}
              </Typography>
            </CopyIcon>
          ) : null}
        </div>
      </div>
    </div>
  );
};

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
  status?: string;
  notificationValue?: number | string;
  role?: string;
  validator?: boolean;
}

export const UserAccountCentered = ({
  address,
  name,
  status,
  notificationValue,
  role = 'Validator',
  validator = true,
}: UserAccountCenteredProps) => {
  return (
    <div className="flex gap-2 ">
      <div className="flex items-center">
        {validator && <ImageNotification notificationValue={notificationValue ?? 0} />}
        <Avatar address={address} circle size={40} />
      </div>
      <div className="flex flex-col gap-1.5 desktop:gap-0">
        <div className="flex desktop:hidden">
          <StatusBadge status={`${status} ${role}`} />
        </div>
        <Typography color={'onBackground'} fontWeight={'semibold'} variant={'h3'}>
          {name ? name : '-'}
        </Typography>
        <div className="flex items-center gap-2">
          <Typography color={'onBackgroundMedium'} fontWeight={'normal'} variant={'caption'}>
            {shortString(address, 12, 'center')}
          </Typography>
          <CopyIcon content={address} size={'xxs'} />
        </div>
      </div>
    </div>
  );
};

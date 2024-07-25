import { ReactNode } from 'react';
import { FlexGrid } from '@repo/ui/atoms';
import { Sidebar } from '@repo/ui/organisms';
import { cls } from '@repo/ui/utils';
import { TopbarClient } from './topbarClient.tsx';
import { logo, menuItems, mobileMenuItems } from '../../utils/constants.tsx';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <FlexGrid className={'bg-backgroundDark'} direction={'row'} gap={'0'}>
      <Sidebar logo={logo} menuItems={menuItems} />
      <FlexGrid className={'w-full'} direction={'col'} gap={'0'}>
        <TopbarClient logo={logo} mobileMenuItems={mobileMenuItems} />
        <main
          className={cls([
            'w-full h-screenUnderTopbarMobile desktop:h-screenUnderTopbar bg-background p-8',
            'overflow-y-auto overflow-x-hidden',
            'border-t-backgroundSecondary border-t-1 border-solid',
            'desktop:border-l-backgroundSecondary desktop:border-l-1',
            'desktop:rounded-tl-3xl',
          ])}
        >
          {children}
        </main>
      </FlexGrid>
    </FlexGrid>
  );
};

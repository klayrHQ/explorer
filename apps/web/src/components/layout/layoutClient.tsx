'use client';
import { ReactNode } from 'react';
import { FlexGrid, Grid, Typography } from '@repo/ui/atoms';
import { Sidebar, InfoBanner } from '@repo/ui/organisms';
import { cls } from '@repo/ui/utils';
import { TopbarClient } from './topbarClient.tsx';
import { logo, menuItems, mobileMenuItems } from '../../utils/constants.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';

export const Layout = ({ children }: { children: ReactNode }) => {
  const basePath = useBasePath();

  return (
    <Grid gap={'0'}>
      <FlexGrid className={'bg-backgroundDark'} direction={'row'} gap={'0'}>
        <Sidebar basePath={basePath} logo={logo} menuItems={menuItems} />
        <Grid className={'w-full overflow-hidden h-full'} gap={'0'}>
          <TopbarClient logo={logo} mobileMenuItems={mobileMenuItems} />
          <main
            className={cls([
              'w-full h-screenUnderTopbarMobile desktop:h-screenUnderTopbar bg-background p-6 desktop:p-8 max-h-full',
              'overflow-y-auto overflow-x-hidden',
              'border-t-backgroundSecondary border-t-1 border-solid',
              'desktop:border-l-backgroundSecondary desktop:border-l-1',
              'desktop:rounded-tl-3xl',
            ])}
          >
            {/* <InfoBanner className={'mb-3xl rounded-md'}>
              <FlexGrid
                alignItems={'center'}
                gap={'1.5xl'}
                justify={'between'}
                mobileDirection={'row'}
              >
                <Typography color={'currentColor'} variant={'paragraph-sm'}>
                  <span aria-label="warning" className="mr-3" role="img">
                    ⚠️
                  </span>
                  {`Urgent Notice:  This is a development environment, and `}
                  <span className="font-semibold">{`data is currently unreliable `}</span>
                  {`due to ongoing work. `}
                </Typography>
              </FlexGrid>
            </InfoBanner> */}
            {children}
          </main>
        </Grid>
      </FlexGrid>
    </Grid>
  );
};

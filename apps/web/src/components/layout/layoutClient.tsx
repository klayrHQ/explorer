/* eslint-disable react/jsx-no-literals */
'use client';
import { ReactNode, useEffect } from 'react';
import { FlexGrid, Grid, Typography } from '@repo/ui/atoms';
import { Sidebar, InfoBanner } from '@repo/ui/organisms';
import { cls } from '@repo/ui/utils';
import { TopbarClient } from './topbarClient.tsx';
import { logo, menuItems, mobileMenuItems } from '../../utils/constants.tsx';
import { useBasePath } from '../../utils/hooks/useBasePath.ts';
import { useAppErrorStore } from '../../store/appErrorStore.ts';
import { usePathname } from 'next/navigation';
import ErrorPage from '../../app/(user)/[chain]/error.tsx';

export const Layout = ({
  children,
  bannerText,
  bannerType,
}: {
  children: ReactNode;
  bannerText?: ReactNode;
  bannerType?: 'info' | 'warning' | 'error' | 'success';
}) => {
  const basePath = useBasePath();
  const pathname = usePathname();
  const { error, clearError } = useAppErrorStore();

  useEffect(() => {
    clearError();
  }, [pathname, clearError]);

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
            {bannerText ? (
              <InfoBanner className={'mb-3xl rounded-md'}>
                <FlexGrid
                  alignItems={'center'}
                  gap={'1.5xl'}
                  justify={'between'}
                  mobileDirection={'row'}
                >
                  <Typography color={'currentColor'} variant={'paragraph-sm'}>
                    {bannerType === 'warning' && (
                      <span aria-label="warning" className="mr-3" role="img">
                        ⚠️
                      </span>
                    )}
                    {bannerText}
                  </Typography>
                </FlexGrid>
              </InfoBanner>
            ) : null}
            {error ? <ErrorPage error={error} /> : children}
          </main>
        </Grid>
      </FlexGrid>
    </Grid>
  );
};

import { ReactNode } from 'react';
import { FlexGrid } from '../../atoms';
import { cls } from '../../../utils/functions.ts';

interface InfoBannerProps {
  children: ReactNode;
  className?: string;
}

export const InfoBanner = ({ children, className }: InfoBannerProps) => {
  return (
    <FlexGrid
      alignItems={'center'}
      className={cls(['bg-secondary text-onSecondary p-4', className])}
      justify={'center'}
    >
      {children}
    </FlexGrid>
  );
};

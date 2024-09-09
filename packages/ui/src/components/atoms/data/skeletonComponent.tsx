import { cls } from '../../../utils/functions.ts';
import { CSSProperties } from 'react';

interface SkeletonComponentProps {
  height?: string;
  width?: string;
  className?: string;
  style?: CSSProperties;
}

export const SkeletonComponent = ({ height, width, className, style }: SkeletonComponentProps) => {
  return (
    <div
      className={cls([
        'animate-pulse rounded-full bg-backgroundTertiary',
        height ? `h-${height}` : 'h-full',
        width ? `w-${width}` : 'w-full',
        className,
      ])}
      style={style}
    />
  );
};

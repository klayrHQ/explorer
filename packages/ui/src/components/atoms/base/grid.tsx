import { CSSProperties, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cls } from '../../../utils/functions.ts';

type GapType =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '1.5xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '4.5xl'
  | '5xl';

type ColsRowsType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'none'
  | 'subgrid';

interface GridProps {
  columns?: ColsRowsType
  rows?: ColsRowsType
  autoCols?: 'auto' | 'min' | 'max' | 'fr';
  autoRows?: 'auto' | 'min' | 'max' | 'fr';
  gap?: GapType
  tabletGap?: GapType
  tabletCols?: ColsRowsType
  tabletRows?: ColsRowsType
  desktopGap?: GapType
  desktopCols?: ColsRowsType
  desktopRows?: ColsRowsType
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

const gridStyles = cva(['grid']);

export const Grid = ({
  columns,
  tabletCols,
  desktopCols,
  tabletRows,
  desktopRows,
  tabletGap,
  desktopGap,
  rows,
  autoCols,
  autoRows,
  gap = '2',
  className,
  children,
  style,
}: GridProps) => {
  return (
    <div
      className={gridStyles({
        className: cls([
          columns ? `grid-cols-${columns}` : 'grid-cols-1',
          rows ? `grid-rows-${rows}` : '',
          autoCols ? `auto-cols-${autoCols}` : '',
          autoRows ? `auto-rows-${autoRows}` : '',
          gap ? `gap-${gap}` : '',
          tabletCols ? `tablet:grid-cols-${tabletCols}` : '',
          tabletRows ? `tablet:grid-rows-${tabletRows}` : '',
          tabletGap ? `tablet:gap-${tabletGap}` : '',
          desktopCols ? `desktop:grid-cols-${desktopCols}` : '',
          desktopRows ? `desktop:grid-rows-${desktopRows}` : '',
          desktopGap ? `desktop:gap-${desktopGap}` : '',
          className,
        ]),
      })}
      style={style}
    >
      {children}
    </div>
  );
};

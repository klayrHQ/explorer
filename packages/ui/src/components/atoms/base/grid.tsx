import { CSSProperties, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cls } from '../../../utils/functions.ts';

interface GridProps {
  columns?:
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
  rows?:
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
  autoCols?: 'auto' | 'min' | 'max' | 'fr';
  autoRows?: 'auto' | 'min' | 'max' | 'fr';
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  tabletGap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  tabletCols?:
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
  tabletRows?:
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
  desktopGap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  desktopCols?:
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
  desktopRows?:
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

'use client';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { cls } from '../../../../utils/functions.ts';
import { IconButton } from '../../input/iconButton.tsx';
import { Popover } from '../../utilities/popover.tsx';
import { TableCell } from './tableCell.tsx';

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
  rowDetails?: ReactNode;
  type?: 'head' | 'body';
}

export const TableRow = ({
  children,
  className,
  rowDetails,
  type = 'body',
  ...props
}: TableRowProps) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const relativeWrapperRef = useRef<HTMLTableRowElement>(null);
  const absoluteElementRef = useRef<HTMLTableCellElement>(null);

  const updatePosition = () => {
    const relativeWrapper = relativeWrapperRef.current;
    const absoluteElement = absoluteElementRef.current;

    if (relativeWrapper && absoluteElement) {
      const rect = relativeWrapper.getBoundingClientRect();
      absoluteElement.style.top = `${rect.top + 2}px`;
    }
  };

  useEffect(() => {
    updatePosition(); // Update position on mount and when openDetails changes
  }, [openDetails]);

  useEffect(() => {
    const main = document.querySelector('main');
    main?.addEventListener('scroll', updatePosition);
    return () => {
      main?.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return (
    <tr
      className={cls([
        type === 'body' && 'group hover:bg-backgroundSecondary',
        openDetails ? 'bg-backgroundSecondary' : '',
        className,
      ])}
      ref={relativeWrapperRef}
      {...props}
    >
      {children}
      {rowDetails && (
        <TableCell
          className={'desktop:border-none desktop:absolute right-5xl'}
          ref={absoluteElementRef}
        >
          <Popover
            button={
              <IconButton
                icon={'Eye'}
                onClick={() => {
                  setOpenDetails(!openDetails);
                }}
                variant={'quaternary'}
              />
            }
            containerClassName={cls([
              'desktop:group-hover:flex items-center justify-center',
              openDetails ? 'flex' : 'desktop:hidden',
            ])}
            isOpen={openDetails}
            placement={'bottom-end'}
            setIsOpen={setOpenDetails}
          >
            {rowDetails}
          </Popover>
        </TableCell>
      )}
    </tr>
  );
};

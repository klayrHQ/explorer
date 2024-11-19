'use client';
import React, { ReactNode, useState } from 'react';
import { IconComponent } from '../../../types/types.ts';
import { IconButton } from '../input/iconButton.tsx';
import { FlexGrid } from '../base/flexGrid.tsx';
import { NumberListProps, Pagination } from '../data/table/pagination.tsx';
import { Button } from '../input/button.tsx';

interface ViewSwitcherProps {
  views: {
    view: ReactNode;
    name: string;
    icon?: IconComponent;
    disabled?: boolean;
  }[];
  currentView: string;
  setCurrentView: (view: string) => void;
  paginationProps?: NumberListProps;
  filterComponent?: ReactNode;
}

export const ViewSwitcher = ({
  views,
  paginationProps,
  filterComponent,
  currentView,
  setCurrentView,
}: ViewSwitcherProps) => {
  const currentViewObject = views.find(({ name }) => name === currentView);

  return (
    <FlexGrid
      className={
        'w-full border-collapse border-solid border-borderLow border-1 rounded-xl overflow-hidden'
      }
      direction={'col'}
      gap={'0'}
    >
      <FlexGrid
        alignItems={'center'}
        justify={'end'}
        className={'p-3xl border-b-1 border-borderLow w-full min-h-10'}
      >
        {filterComponent}
        <FlexGrid className={'bg-backgroundSecondary rounded-md'} mobileDirection={'row'} gap={'0'}>
          {views.map(({ name, icon, disabled }) =>
            icon ? (
              <IconButton
                active={currentView === name}
                disabled={disabled}
                icon={icon}
                key={`view-button-${name}`}
                onClick={() => setCurrentView(name)}
                variant={'semiTransparent'}
              />
            ) : (
              <Button
                active={currentView === name}
                disabled={disabled}
                label={name}
                key={`view-button-${name}`}
                onClick={() => setCurrentView(name)}
                variant={'semiTransparent'}
              />
            ),
          )}
        </FlexGrid>
      </FlexGrid>
      <FlexGrid className={'w-full'}>{currentViewObject?.view}</FlexGrid>
      {paginationProps && (
        <FlexGrid className={'px-3xl py-lg border-t-1 border-borderLow w-full'}>
          <Pagination
            currentNumber={paginationProps.currentNumber || 0}
            defaultValue={paginationProps.defaultValue || ''}
            onPerPageChange={paginationProps.onPerPageChange || (() => {})}
            setCurrentNumber={paginationProps.setCurrentNumber || (() => {})}
            totalPages={paginationProps.totalPages || 0}
          />
        </FlexGrid>
      )}
    </FlexGrid>
  );
};

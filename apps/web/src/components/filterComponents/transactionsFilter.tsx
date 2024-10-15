'use client';

import { IconButton, Input, Icon, Typography } from '@repo/ui/atoms';
import { useState } from 'react';
import React from 'react';

interface TransactionsFilterProps {
  valueFrom: string;
  setValueFrom: (value: string) => void;
  valueTo: string;
  setValueTo: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClearFrom: () => void;
  handleClearTo: () => void;
}

export const TransactionsFilter = ({
  valueFrom,
  setValueFrom,
  valueTo,
  setValueTo,
  onBlur,
  onKeyDown,
  handleClearFrom,
  handleClearTo,
}: TransactionsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isErrorFrom = valueFrom.length > 0 && valueFrom.length !== 41;
  const isErrorTo = valueTo.length > 0 && valueTo.length !== 41;
  const [isActive, setIsActive] = useState(false);

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
      setIsActive(true);
    }
  };

  return (
    <div className={`relative flex flex-row-reverse items-center w-full gap-12`}>
      <div className="flex">
        <IconButton
          active={isOpen}
          className=""
          icon="FilterLines"
          onClick={() => setIsOpen(!isOpen)}
          variant="tertiary"
        />
      </div>

      {/* DESKTOP VERSION */}
      <div
        className={`hidden desktop:flex gap-4 w-full transition-all ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <Input
          className={`${valueFrom.length > 0 ? 'bg-backgroundSecondary' : 'bg-background'} ${isErrorFrom ? 'border-error' : 'border-backgroundTertiary'} relative `}
          errorNotification={isErrorFrom ? 'Invalid address' : ''}
          isActive={isActive}
          leftContent={<span>{'From'}</span>}
          leftContentPadding="pl-16"
          onBlur={handleBlur}
          onChange={(e) => setValueFrom((e.target as HTMLInputElement).value)}
          onFocus={() => setIsActive(false)}
          onKeyDown={onKeyDown}
          placeholder="Type an address"
          rightContent={
            <div
              className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-volt rounded-full transition-all ${valueFrom ? 'opacity-100' : 'opacity-0'}`}
              onClick={handleClearFrom}
            >
              <Icon color="backgroundDark" icon="CrossClose" size="xxs" />
            </div>
          }
          rightContentPadding="pr-10"
          type="text"
          value={valueFrom}
          variant="filters"
        />

        <Input
          className={`${valueTo.length > 0 ? 'bg-backgroundSecondary' : 'bg-background'} ${isErrorTo ? 'border-error' : 'border-backgroundTertiary'} `}
          errorNotification={isErrorTo ? 'Invalid address' : ''}
          isActive={isActive}
          leftContent={<span>{'To'}</span>}
          leftContentPadding="pl-10"
          onBlur={handleBlur}
          onChange={(e) => setValueTo((e.target as HTMLInputElement).value)}
          onFocus={() => setIsActive(false)}
          onKeyDown={onKeyDown}
          placeholder="Type an address"
          rightContent={
            <div
              className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-volt rounded-full transition-all ${valueTo ? 'opacity-100' : 'opacity-0'}`}
              onClick={handleClearTo}
            >
              <Icon color="backgroundDark" icon="CrossClose" onClick={handleClearTo} size="xxs" />
            </div>
          }
          rightContentPadding="pr-10"
          type="text"
          value={valueTo}
          variant="filters"
        />
      </div>

      {/* MOBILE VERSION */}
      {isOpen && <div className="flex desktop:hidden">{'Mobile Filter'}</div>}
    </div>
  );
};

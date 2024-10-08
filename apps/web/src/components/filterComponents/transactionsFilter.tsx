'use client';

import { IconButton, Input, Icon } from '@repo/ui/atoms';
import { useState } from 'react';
import React from 'react';

interface TransactionsFilterProps {
  valueFrom: string;
  setValueFrom: (value: string) => void;
  valueTo: string;
  setValueTo: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TransactionsFilter = ({
  valueFrom,
  setValueFrom,
  valueTo,
  setValueTo,
  onBlur,
  onKeyDown,
}: TransactionsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClearFrom = () => {
    setValueFrom('');
  };

  const handleClearTo = () => {
    setValueTo('');
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
          leftContent={<span>{'From'}</span>}
          leftContentPadding="pl-16"
          onChange={(e) => setValueFrom((e.target as HTMLInputElement).value)}
          placeholder="Type an address"
          rightContent={
            <div
              className={`flex items-center justify-center w-4 h-4 bg-volt rounded-full transition-all ${valueFrom ? 'opacity-100' : 'opacity-0'}`}
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
          leftContent={<span>{'To'}</span>}
          leftContentPadding="pl-10"
          onChange={(e) => setValueTo((e.target as HTMLInputElement).value)}
          placeholder="Type an address"
          rightContent={
            <div
              className={`flex items-center justify-center w-4 h-4 bg-volt rounded-full transition-all ${valueTo ? 'opacity-100' : 'opacity-0'}`}
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

'use client';

import { IconButton, Input, Icon, Typography, FilterBadge } from '@repo/ui/atoms';
import { AccordionWithCheckboxes } from '@repo/ui/molecules';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Button } from '@repo/ui/atoms';

interface TransactionsFilterProps {
  valueFrom: string;
  setValueFrom: (value: string) => void;
  valueTo: string;
  setValueTo: (value: string) => void;
  handleApply: () => void;
  handleClearFrom: () => void;
  handleClearTo: () => void;
  data: Record<string, string[]>;
  checkedItems: Record<string, Record<string, boolean>>;
  handleCheckboxChange: (category: string, value: string, isChecked: boolean) => void;
  handleSelectAllChange: (category: string, values: string[], isChecked: boolean) => void;
  handleClear: () => void;
  handleCheckboxClose: (category: string, value: string) => void;
}

export const TransactionsFilter = ({
  valueFrom,
  setValueFrom,
  valueTo,
  setValueTo,
  handleClearFrom,
  handleClearTo,
  data,
  checkedItems,
  handleCheckboxChange,
  handleSelectAllChange,
  handleApply,
  handleClear,
  handleCheckboxClose,
}: TransactionsFilterProps) => {
  const isErrorFrom = valueFrom.length > 0 && valueFrom.length !== 41;
  const isErrorTo = valueTo.length > 0 && valueTo.length !== 41;
  const [isActive, setIsActive] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const hasSelectedFilters =
    Object.values(checkedItems).some((values) =>
      Object.values(values).some((isChecked) => isChecked),
    ) ||
    valueFrom ||
    valueTo;

  useEffect(() => {
    return setIsAccordionOpen(!!hasSelectedFilters);
  }, [checkedItems, valueFrom, valueTo, hasSelectedFilters]);

  return (
    <div
      className={`relative z-100 flex flex-row items-center w-full gap-12 min-w-18 justify-between`}
    >
      <div className="flex gap-4 flex-wrap">
        {Object.entries(checkedItems).map(([category, values]) =>
          Object.entries(values).map(
            ([value, isChecked]) =>
              isChecked && (
                <FilterBadge
                  key={value}
                  label={'Type'}
                  onClose={() => handleCheckboxClose(category, value)}
                  value={`${category} ${value}`}
                />
              ),
          ),
        )}
        {valueFrom && (
          <FilterBadge
            key="from"
            label="From"
            onClose={() => handleClearFrom()}
            value={valueFrom.slice(0, 6) + '...' + valueFrom.slice(-6)}
          />
        )}
        {valueTo && (
          <FilterBadge key="to" label="To" onClose={() => handleClearTo()} value={valueTo} />
        )}
      </div>

      <div className="flex gap-1 shrink-0">
        {hasSelectedFilters && (
          <Button onClick={handleClear} label="Clear All" variant="transparent" />
        )}
        <IconButton
          active={isAccordionOpen}
          className=""
          icon="FilterLines"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          variant="tertiary"
        />
      </div>

      {/* DESKTOP VERSION */}

      {isAccordionOpen && (
        <div className="absolute right-0 top-14 flex flex-col justify-between px-4 py-2 items-center  bg-backgroundPrimary border-1 gap-2  border-borderLow rounded-sm shadow-md">
          <span className="text-caption font-semibold self-start text-gray-5 mt-4 ">
            {'Module Command'}
          </span>

          <AccordionWithCheckboxes
            data={data}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllChange={handleSelectAllChange}
          />

          <span className="text-caption font-semibold self-start text-gray-5 mt-4 ">
            Sender/Receiver
          </span>

          <div className="rounded-sm w-96 ">
            <div className="flex flex-col gap-4 rounded-sm">
              <Input
                className={`${valueFrom.length > 0 ? 'bg-backgroundSecondary' : 'bg-background'} ${isErrorFrom ? 'border-error' : 'border-backgroundTertiary'} relative `}
                errorNotification={isErrorFrom ? 'Invalid address' : ''}
                isActive={isActive}
                leftContent={<span className="text-paragraph-sm">{'From'}</span>}
                leftContentPadding="pl-16"
                onChange={(e) => setValueFrom((e.target as HTMLInputElement).value)}
                onFocus={() => setIsActive(false)}
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
                leftContent={<span className="text-paragraph-sm">{'To'}</span>}
                leftContentPadding="pl-10"
                onChange={(e) => setValueTo((e.target as HTMLInputElement).value)}
                onFocus={() => setIsActive(false)}
                placeholder="Type an address"
                rightContent={
                  <div
                    className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-volt rounded-full transition-all ${valueTo ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleClearTo}
                  >
                    <Icon
                      color="backgroundDark"
                      icon="CrossClose"
                      onClick={handleClearTo}
                      size="xxs"
                    />
                  </div>
                }
                rightContentPadding="pr-10"
                type="text"
                value={valueTo}
                variant="filters"
              />
            </div>
          </div>
          <div className="flex gap-2 my-4">
            <Button onClick={handleApply} label="Apply" variant="primary" />
            <Button onClick={handleClear} label="Clear" variant="transparent" />
          </div>
        </div>
      )}
    </div>
  );
};

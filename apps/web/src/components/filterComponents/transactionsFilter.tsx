'use client';

import { IconButton, Input, Icon, Typography, FilterBadge } from '@repo/ui/atoms';
import { AccordionWithCheckboxes } from '@repo/ui/molecules';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Button, Modal } from '@repo/ui/atoms';

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
  filterValues: { from: string; to: string; moduleCommand: string }; // Add this line
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

  filterValues,
}: TransactionsFilterProps) => {
  const [isErrorFrom, setIsErrorFrom] = useState(false);
  const [isErrorTo, setIsErrorTo] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    setIsErrorFrom(valueFrom.length > 0 && valueFrom.length !== 41);
    setIsErrorTo(valueTo.length > 0 && valueTo.length !== 41);
  }, [valueFrom, valueTo]);

  const hasSelectedFilters =
    Object.values(checkedItems).some((values) =>
      Object.values(values).some((isChecked) => isChecked),
    ) ||
    valueFrom ||
    valueTo;

  return (
    <div className={`relative flex flex-row items-center w-full gap-4 min-w-18 justify-between`}>
      <div className="flex gap-4 flex-wrap">
        {filterValues.moduleCommand &&
          filterValues.moduleCommand.split(',').map((filter, index) => {
            const [category, value] = filter.split(':');
            return (
              <FilterBadge
                key={value}
                label={category}
                onClose={() => handleCheckboxClose(category, value)}
                value={value}
              />
            );
          })}
        {filterValues.from && (
          <FilterBadge
            key="from"
            label="From"
            onClose={() => handleClearFrom()}
            value={filterValues.from.slice(0, 6) + '...' + filterValues.from.slice(-6)}
          />
        )}
        {filterValues.to && (
          <FilterBadge
            key="to"
            label="To"
            onClose={() => handleClearTo()}
            value={filterValues.to}
          />
        )}
      </div>

      <div className="flex gap-2 shrink-0">
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

      <Modal open={isAccordionOpen} onClose={() => setIsAccordionOpen(false)} title="Filters">
        <div
          style={{ maxHeight: '70vh' }}
          className="max-h-full overflow-auto flex flex-col justify-between px-4 items-center  bg-backgroundSecondary border-1 gap-2  border-borderLow rounded-sm "
        >
          <span className="text-paragraph-sm font-medium  self-start text-gray-5 mb-2 ">
            {'Transaction Type'}
          </span>

          <AccordionWithCheckboxes
            data={data}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllChange={handleSelectAllChange}
          />

          <span className="text-paragraph-sm font-medium self-start text-gray-5 mt-4 mb-2 ">
            {'Sender/Receiver'}
          </span>

          <div className="rounded-sm w-full ">
            <div className="flex flex-col gap-5 rounded-sm">
              <Input
                className={`bg-backgroundSecondary  `}
                errorNotification={isErrorFrom ? 'Invalid sender address' : ''}
                isActive={isActive}
                leftContent={<span className="text-paragraph-sm">{'From'}</span>}
                leftContentPadding="pl-16"
                onChange={(e) => setValueFrom((e.target as HTMLInputElement).value)}
                onFocus={() => setIsActive(false)}
                placeholder="Type an address"
                rightContent={
                  <div
                    className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-tulipDark rounded-full transition-all ${valueFrom ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleClearFrom}
                  >
                    <Icon color="backgroundDark" icon="CrossClose" size="xxs" />
                  </div>
                }
                rightContentPadding="pr-10"
                type="text"
                value={valueFrom}
                variant="filters"
                isErrorFrom={isErrorFrom}
              />
              <Input
                className={`bg-backgroundSecondary`}
                errorNotification={isErrorTo ? 'Invalid receiver address' : ''}
                isActive={isActive}
                leftContent={<span className="text-paragraph-sm">{'To'}</span>}
                leftContentPadding="pl-10"
                onChange={(e) => setValueTo((e.target as HTMLInputElement).value)}
                onFocus={() => setIsActive(false)}
                placeholder="Type an address"
                rightContent={
                  <div
                    className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-tulipDark  rounded-full transition-all ${valueTo ? 'opacity-100' : 'opacity-0'}`}
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
                isErrorTo={isErrorTo}
              />
            </div>
          </div>
          <div className="flex gap-2 my-4">
            <Button
              onClick={() => {
                handleApply();
                setIsAccordionOpen(false);
              }}
              disabled={isErrorFrom || isErrorTo}
              label="Apply"
              variant="primary"
            />
            <Button onClick={handleClear} label="Clear" variant="transparent" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

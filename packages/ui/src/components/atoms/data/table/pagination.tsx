'use client';

import { IconButton } from '../../input/iconButton';
import { Typography } from '../../base/typography';
import { useState, useEffect } from 'react';
import { PageLimit } from './pageLimit';

export interface NumberListProps {
  totalPages: number;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
  defaultValue: string;
  onPerPageChange: (value: string) => void;
}

export const Pagination = ({
  totalPages,
  currentNumber,
  setCurrentNumber,
  defaultValue = '10',
  onPerPageChange,
}: NumberListProps) => {
  const generatePageArray = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = generatePageArray(totalPages);

  if (pages.length <= 1) {
    return null;
  }

  const handleFirstPage = () => {
    setCurrentNumber(1);
  };

  const handleLastPage = () => {
    setCurrentNumber(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (currentNumber < totalPages) {
      setCurrentNumber(currentNumber + 1);
    }
  };

  const handlePerPageChange = (value: string) => {
    onPerPageChange(value);
  };

  return (
    <div className="flex justify-between items-center w-full relative ">
      <div className="hidden desktop:flex ">
        <PageLimit defaultValue={defaultValue} onPerPageChange={handlePerPageChange} />
      </div>

      <div className="flex justify-between gap-3 desktop:gap-6 flex-wrap">
        <div className="flex items-center gap-1">
          <Typography color="onBackgroundLow" variant="paragraph-sm">
            {`Page`}
          </Typography>
          <Typography color="onBackgroundLow" variant="paragraph-sm" fontWeight="semibold">
            {currentNumber}
          </Typography>
          <Typography color="onBackgroundLow" variant="paragraph-sm">
            {` of ${pages.length}`}
          </Typography>
        </div>
        <div className="flex gap-1.5 desktop:gap-3 items-center justify-between">
          <IconButton
            icon="ChevronLeftDouble"
            onClick={handleFirstPage}
            variant="bordered"
            disabled={currentNumber === 1}
          />
          <IconButton
            icon="ChevronLeft"
            onClick={handlePreviousPage}
            variant="bordered"
            disabled={currentNumber === 1}
          />
          <IconButton
            icon="ChevronRight"
            onClick={handleNextPage}
            variant="bordered"
            disabled={currentNumber === totalPages}
          />
          <IconButton
            icon="ChevronRightDouble"
            onClick={handleLastPage}
            variant="bordered"
            disabled={currentNumber === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

'use client';

import { Button } from '../../input/button';
import { FlexGrid } from '../../base/flexGrid';
import { IconButton } from '../../input/iconButton';
import { Typography } from '../../base/typography';
import { Input } from '../../input/input';
import { useState, useEffect } from 'react';
import { PageLimit } from './pageLimit';

interface NumberListProps {
  totalPages: number;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
}

export const Pagination = ({ totalPages, currentNumber, setCurrentNumber }: NumberListProps) => {
  const [pageNumber, setPageNumber] = useState('');

  const generatePageArray = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = generatePageArray(totalPages);

  if (pages.length <= 1) {
    return null;
  }

  const displayPages = () => {
    if (pages.length <= 5) {
      return pages;
    }
    switch (true) {
      case currentNumber === 1 || currentNumber === 2:
        return [...pages.slice(0, 3), '...', ...pages.slice(-3)];
      case currentNumber === 3:
        return [...pages.slice(0, 4), '...', ...pages.slice(-2)];
      case currentNumber === 4:
        return [...pages.slice(0, 5), '...', ...pages.slice(-2)];
      case currentNumber === pages.length || currentNumber === pages.length - 1:
        return [...pages.slice(0, 3), '...', ...pages.slice(-3)];
      case currentNumber === pages.length - 2:
        return [...pages.slice(0, 2), '...', ...pages.slice(-4)];
      case currentNumber === pages.length - 3:
        return [...pages.slice(0, 2), '...', ...pages.slice(-5)];
      case currentNumber > 3 && currentNumber < pages.length - 3:
        return [
          ...pages.slice(0, 2),
          '...',
          currentNumber - 1,
          currentNumber,
          currentNumber + 1,
          '...',
          ...pages.slice(-2),
        ];
      default:
        return pages;
    }
  };

  const handleInputChange = (e: any) => {
    setPageNumber(e.target.value);
  };

  const handleGoClick = () => {
    const page = parseInt(pageNumber, 10);
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setCurrentNumber(page);
      setPageNumber('');
    }
  };

  return (
    <div className="flex justify-between w-full relative ">
      <PageLimit pageLimit={10} setPageLimit={() => {}} />
      <div className="w-full flex flex-col gap-3 items-end justify-center desktop:flex-row desktop:items-center desktop:gap-6">
        {/* DESKTOP PAGINATION */}
        <div className="gap-0.5 hidden desktop:flex">
          {displayPages().map((number, index) => (
            <div
              className={`min-w-9 h-9 max-h-9 p-2 flex items-center justify-center cursor-pointer text-paragraph-sm ${
                number === currentNumber
                  ? 'bg-onBackground rounded-full text-background'
                  : 'text-onBackgroundLow'
              }`}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => typeof number === 'number' && setCurrentNumber(number)}
            >
              {number}
            </div>
          ))}
        </div>

        {/* MOBILE PAGINATION */}
        <div className="flex gap-6 items-center justify-between desktop:hidden w-full">
          <div>
            <IconButton
              className="text-paragraph-sm"
              color="onBackground"
              icon="ChevronLeft"
              onClick={() => setCurrentNumber(currentNumber - 1)}
              variant="bordered"
            />
          </div>

          <div className="flex items-center">
            <Typography color="onBackgroundLow" variant="paragraph-sm">
              {'Page'}
            </Typography>
            <Typography
              className="mx-2 p-1.5 h-9 max-h-9 min-w-9 flex items-center justify-center bg-onBackground rounded-full text-background"
              color="background"
              variant="paragraph-sm"
            >
              {currentNumber}
            </Typography>
            <Typography color="onBackgroundLow" variant="paragraph-sm">
              {'of'} {pages.length}
            </Typography>
          </div>
          <div>
            <IconButton
              icon="ChevronRight"
              onClick={() => setCurrentNumber(currentNumber + 1)}
              variant="bordered"
            />
          </div>
        </div>

        {/* PAGE GO */}
        <div className="flex items-center gap-2">
          <Typography color="onBackgroundLow" variant="paragraph-sm">
            {'Page'}
          </Typography>
          <Input
            className="max-w-11 h-11 max-h-11 text-paragraph-sm"
            onChange={handleInputChange}
            value={pageNumber}
            variant="onBgPrimary"
          />
          <div onClick={handleGoClick}>
            <Typography
              color="onBackground"
              fontWeight="semibold"
              style={{ cursor: 'pointer' }}
              variant="paragraph-sm"
            >
              {'Go'}
            </Typography>
          </div>
        </div>
      </div>

      {/* DESKTOP BUTTONS */}
      <FlexGrid
        alignItems="center"
        className="w-auto hidden desktop:flex"
        gap="4"
        mobileDirection="row"
      >
        <Button
          className="border-1 w-full desktop:w-auto border-backgroundSecondary"
          label="Previous"
          onClick={() => {
            const currentIndex = pages.indexOf(currentNumber);
            if (currentIndex > 0) {
              setCurrentNumber(pages[currentIndex - 1]);
            }
          }}
          variant="transparent"
        />
        <Button
          className="border-1 w-full desktop:w-auto border-backgroundSecondary"
          label="Next"
          onClick={() => {
            const currentIndex = pages.indexOf(currentNumber);
            if (currentIndex < pages.length - 1) {
              setCurrentNumber(pages[currentIndex + 1]);
            }
          }}
          variant="transparent"
        />
      </FlexGrid>
    </div>
  );
};

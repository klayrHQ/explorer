'use client';

import { Button } from '../../input/button';
import { FlexGrid } from '../../base/flexGrid';
import { IconButton } from '../../input/iconButton';
import { Typography } from '../../base/typography';
import { Input } from '../../input/input';

interface NumberListProps {
  totalPages: number;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
}

export const Pagination = ({ totalPages, currentNumber, setCurrentNumber }: NumberListProps) => {
  const generatePageArray = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = generatePageArray(totalPages);

  if (pages.length <= 1) {
    return null;
  }

  const displayPages = () => {
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

  return (
    <div className="flex items-end desktop:items-center justify-between w-full gap-3 flex-col desktop:flex-row">
      {/* DESKTOP PAGINATION */}
      <div className="gap-0.5 hidden desktop:flex">
        {displayPages().map((number, index) => (
          <div
            className={`min-w-9 h-9 max-h-9 p-2 flex items-center justify-center cursor-pointer ${
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
        <Input className="max-w-11 h-11 max-h-11 text-paragraph-sm" variant="onBgPrimary"></Input>
        <Typography color="onBackground" fontWeight="semibold" variant="paragraph-sm">
          {'Go'}
        </Typography>
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

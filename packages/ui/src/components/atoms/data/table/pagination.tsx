'use client';

import { Button } from '../../input/button';
import { FlexGrid } from '../../base/flexGrid';

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
    <FlexGrid alignItems="center" className="w-full" justify="between">
      <div className="flex">
        {displayPages().map((number, index) => (
          <div
            className={`w-9 h-9 flex items-center justify-center cursor-pointer ${
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

      <FlexGrid gap="4">
        <Button
          className="border-1 border-backgroundSecondary"
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
          className="border-1 border-backgroundSecondary"
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
    </FlexGrid>
  );
};

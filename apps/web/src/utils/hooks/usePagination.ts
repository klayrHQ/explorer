import { useState } from 'react';

export const usePagination = (initialPage: number = 1, initialLimit: string = "10") => {
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [limit, setLimit] = useState<string>(initialLimit);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
  };

  return {
    pageNumber,
    limit,
    handlePageChange,
    handleLimitChange,
  };
};
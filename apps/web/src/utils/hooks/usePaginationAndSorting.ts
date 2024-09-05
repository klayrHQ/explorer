import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { usePathname, useRouter, } from 'next/navigation';
import { useGatewayClientStore } from '../../store/clientStore.ts';


interface UsePaginationAndSortingProps {
  defaultLimit?: string;
  fetchFunction: (params: any) => Promise<any>;
  initialSortField?: string;
  initialSortOrder?: string;
    changeURL?: boolean;
}

export const usePaginationAndSorting = ({
  defaultLimit = '10',
  fetchFunction,
  initialSortField = '',
  initialSortOrder = '',
  changeURL,
}: UsePaginationAndSortingProps) => {
    const router = useRouter();
    const pathname = usePathname();

  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [limit, setLimit] = useState<string>(defaultLimit);
  const [sortField, setSortField] = useState<string>(initialSortField);
  const [sortOrder, setSortOrder] = useState<string>(initialSortOrder);

  const updateURL = useCallback(
    debounce((pageNumber: number, limit: string) => {
      router.push(`${pathname}?page=${pageNumber}&limit=${limit}`);
    }, 300),
    [router, pathname]
  );

  const network = useGatewayClientStore((state) => state.network);


  const fetchData = useCallback(
    debounce(async () => {
      setLoading(true);
      const offset = (pageNumber - 1) * Number(limit);
      const params: any = {
        limit,
        offset,
      };
      if (sortField && sortOrder) {
        params.sort = `${sortField}:${sortOrder}`;
      }
      try {
        const response = await fetchFunction(params);
        setTotalItems(response.meta.total);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [pageNumber, limit, sortField, sortOrder, fetchFunction, network]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

    useEffect(() => {
        if (changeURL) {
        updateURL(pageNumber, limit);
        }
    }, [pageNumber, limit, updateURL, changeURL, ]);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
  };

  const handleSortChange = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  return {
    data,
    totalItems,
    loading,
    pageNumber,
    limit,
    sortField,
    sortOrder,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
  };
};
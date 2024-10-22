import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useGatewayClientStore } from '../../store/clientStore.ts';
import {useChainNetworkStore} from "../../store/chainNetworkStore.ts";

interface UsePaginationAndSortingProps {
  defaultLimit?: string;
  fetchFunction: (params: any) => Promise<any>;
  initialSortField?: string;
  initialSortOrder?: string;
  changeURL?: boolean;
  searchParams?: Record<string, any>;
}

export const useSorting = ({
  fetchFunction,
  initialSortField = '',
  initialSortOrder = '',
  searchParams = {},
}: UsePaginationAndSortingProps) => {

  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>(initialSortField);
  const [sortOrder, setSortOrder] = useState<string>(initialSortOrder);

  const network = useChainNetworkStore((state) => state.currentNetwork);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async () => {
      setLoading(true);
      const params: any = {
        ...searchParams, 
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
    [sortField, sortOrder, fetchFunction, network,]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSortChange = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  return {
    data,
    totalItems,
    loading,
    sortField,
    sortOrder,
    handleSortChange,
  };
};
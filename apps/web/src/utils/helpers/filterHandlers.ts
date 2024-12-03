import { useState, useCallback } from 'react';
import {
  InputValues,
  CheckedItems,
  HandleCheckboxChange,
  HandleSelectAllChange,
  HandleCheckboxClose,
  HandleClear,
  FilterConfigType,
} from '../../components/filterComponents/filterTypes.tsx';

export const useFilterManagement = (searchKeys: string[]) => {
  const createInitialState = (keys: string[]): Record<string, string> => {
    const initialState: Record<string, string> = {};
    keys.forEach((key) => {
      initialState[key] = '';
    });
    return initialState;
  };
  const initialState = createInitialState(searchKeys);

  const [inputValues, setInputValues] = useState<Record<string, string>>(initialState);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(initialState);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const clearAllFields = useCallback(() => {
    setInputValues(initialState);
    setFilterValues(initialState);
    setCheckedItems({});
  }, [initialState]);

  const handleClear: HandleClear = useCallback((field: keyof InputValues) => {
    setInputValues((prev) => ({ ...prev, [field]: '' }));
    setFilterValues((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const handleCheckboxChange: HandleCheckboxChange = (category, value, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [category]: { ...prevState[category], [value]: isChecked },
    }));
  };

  const handleSelectAllChange: HandleSelectAllChange = (category, values, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [category]: values.reduce((acc, value) => ({ ...acc, [value]: isChecked }), {}),
    }));
  };

  const handleApply = () => {
    const selectedItems = Object.entries(checkedItems).flatMap(([category, values]) =>
      Object.entries(values)
        .filter(([, isChecked]) => isChecked)
        .map(([value]) => `${category}:${value}`),
    );

    const updatedFilterValues = { ...inputValues };

    //Add search keys for new filters
    searchKeys.forEach((key) => {
      if (key === 'moduleCommand') {
        updatedFilterValues[key] = selectedItems.join(',');
      } else if (key === 'status') {
        updatedFilterValues[key] = selectedItems
          .filter((item) => item.startsWith('status:'))
          .map((item) => item.split(':')[1])
          .join(',');
      } else {
        updatedFilterValues[key] = inputValues[key];
      }
    });

    setFilterValues(updatedFilterValues);
  };

  const handleCheckboxClose: HandleCheckboxClose = (category, value) => {
    setCheckedItems((prevState) => {
      const updatedCheckedItems = {
        ...prevState,
        [category]: { ...prevState[category], [value]: false },
      };

      const selectedItems = Object.entries(updatedCheckedItems).flatMap(([cat, values]) =>
        Object.entries(values)
          .filter(([, isChecked]) => isChecked)
          .map(([val]) => `${cat}:${val}`),
      );

      const updatedFilterValues = { ...inputValues };

      //Add search keys for new filters
      searchKeys.forEach((key) => {
        if (key === 'moduleCommand') {
          updatedFilterValues[key] = selectedItems.join(',');
        } else if (key === 'status') {
          updatedFilterValues[key] = selectedItems
            .filter((item) => item.startsWith('status:'))
            .map((item) => item.split(':')[1])
            .join(',');
        } else {
          updatedFilterValues[key] = inputValues[key];
        }
      });

      setFilterValues(updatedFilterValues);

      return updatedCheckedItems;
    });
  };

  return {
    inputValues,
    setInputValues,
    filterValues,
    checkedItems,
    handleClear,
    handleCheckboxChange,
    handleSelectAllChange,
    handleApply,
    handleCheckboxClose,
    clearAllFields,
  };
};

export const getSearchKeys = (config: FilterConfigType[]): string[] => {
  return config.map(({ searchKey }) => searchKey).filter((key): key is string => key !== undefined);
};

const createInitialState = (keys: string[]): Record<string, string> => {
  const initialState: Record<string, string> = {};
  keys.forEach((key) => {
    initialState[key] = '';
  });
  return initialState;
};

export default useFilterManagement;

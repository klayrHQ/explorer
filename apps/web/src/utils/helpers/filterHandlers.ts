import { useState, useCallback } from 'react';

export const useFilterManagement = () => {
  const [inputValues, setInputValues] = useState({ from: '', to: '' });
  const [filterValues, setFilterValues] = useState({ from: '', to: '', moduleCommand: '' });
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({});

  const clearAllFields = useCallback(() => {
    setInputValues({ from: '', to: '' });
    setFilterValues({ from: '', to: '', moduleCommand: '' });
    setCheckedItems({});
  }, []);

  const handleClear = useCallback((field: keyof InputValues) => {
    setInputValues((prev) => ({ ...prev, [field]: '' }));
    setFilterValues((prev) => ({ ...prev, [field]: '' }));
  }, []);

  interface InputValues {
    from: string;
    to: string;
  }

  interface FilterValues extends InputValues {
    moduleCommand: string;
  }

  interface CheckedItems {
    [category: string]: {
      [value: string]: boolean;
    };
  }

  type HandleCheckboxChange = (category: string, value: string, isChecked: boolean) => void;

  const handleCheckboxChange: HandleCheckboxChange = (category, value, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [category]: { ...prevState[category], [value]: isChecked },
    }));
  };

  interface HandleSelectAllChange {
    (category: string, values: string[], isChecked: boolean): void;
  }

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

    setFilterValues({ ...inputValues, moduleCommand: selectedItems.join(',') });
  };

  interface HandleCheckboxClose {
    (category: string, value: string): void;
  }

  const handleCheckboxClose: HandleCheckboxClose = (category, value) => {
    setCheckedItems((prevState) => {
      const updatedCheckedItems = {
        ...prevState,
        [category]: { ...prevState[category], [value]: false },
      };

      // Update filterValues based on checked items
      const selectedItems = Object.entries(updatedCheckedItems).flatMap(([cat, values]) =>
        Object.entries(values)
          .filter(([, isChecked]) => isChecked)
          .map(([val]) => `${cat}:${val}`),
      );

      setFilterValues((prevFilterValues) => ({
        ...prevFilterValues,
        moduleCommand: selectedItems.join(','),
      }));

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

export default useFilterManagement;

import { useState, useCallback } from 'react';
import {
  InputValues,
  FilterValues,
  CheckedItems,
  HandleCheckboxChange,
  HandleSelectAllChange,
  HandleCheckboxClose,
  HandleClear,
} from '../../components/filterComponents/filterTypes.tsx';

export const useFilterManagement = () => {
  const [inputValues, setInputValues] = useState<InputValues>({ from: '', to: '' });
  const [filterValues, setFilterValues] = useState<FilterValues>({
    from: '',
    to: '',
    moduleCommand: '',
  });
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const clearAllFields = useCallback(() => {
    setInputValues({ from: '', to: '' });
    setFilterValues({ from: '', to: '', moduleCommand: '' });
    setCheckedItems({});
  }, []);

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

    setFilterValues({ ...inputValues, moduleCommand: selectedItems.join(',') });
  };

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

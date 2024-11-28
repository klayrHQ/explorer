import { Dispatch, SetStateAction } from 'react';

export interface FilterConfigType {
  title: string;
  type: 'input' | 'checkbox' | 'radio';
  dataKey: string;
  searchKey?: string;
  inputProps?: {
    placeholder: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
  };
}

export interface InputValues {
  from: string;
  to: string;
  [key: string]: string;
}

export interface FilterValues extends InputValues {
  moduleCommand: string;
}

export interface CheckedItems {
  [category: string]: {
    [value: string]: boolean;
  };
}

export type HandleCheckboxChange = (category: string, value: string, isChecked: boolean) => void;
export type HandleSelectAllChange = (
  category: string,
  values: string[],
  isChecked: boolean,
) => void;
export type HandleCheckboxClose = (category: string, value: string) => void;
export type HandleClear = (field: keyof InputValues) => void;

export interface FilterProps {
  data: Record<string, string[]>;
  checkedItems: CheckedItems;
  inputValues: InputValues;
  setInputValues: Dispatch<SetStateAction<InputValues>>;
  filterValues: FilterValues;
  handleApply: () => void;
  handleClear: () => void;
  handleCheckboxChange: HandleCheckboxChange;
  handleSelectAllChange: HandleSelectAllChange;
  handleClearField: (field: keyof InputValues) => void;
  handleCheckboxClose: (category: string, value: string) => void;
  filterConfigurations: FilterConfigType[];
}

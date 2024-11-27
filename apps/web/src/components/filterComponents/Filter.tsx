import React, { useState, useEffect, useCallback } from 'react';
import { IconButton, Input, Icon, Typography, FilterBadge, Button, Modal } from '@repo/ui/atoms';
import { AccordionWithCheckboxes } from '@repo/ui/molecules';

interface FilterProps {
  data: Record<string, string[]>;
  checkedItems: Record<string, Record<string, boolean>>;
  inputValues: Record<string, string>;
  setInputValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  filterValues: Record<string, string>;
  handleApply: () => void;
  handleClear: () => void;
  handleCheckboxChange: (category: string, value: string, isChecked: boolean) => void;
  handleSelectAllChange: (category: string, values: string[], isChecked: boolean) => void;
  handleClearField: (field: string) => void;
  handleCheckboxClose: (category: string, value: string) => void;
  filterConfigurations: FilterConfig[];
}

interface FilterConfig {
  title: string;
  type: 'input' | 'checkbox' | 'radio';
  dataKey: string;
  inputProps?: {
    placeholder: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
  };
}

export const UniversalFilter = ({
  data,
  checkedItems,
  inputValues,
  setInputValues,
  filterValues,
  handleApply,
  handleClear,
  handleCheckboxChange,
  handleSelectAllChange,
  handleClearField,
  handleCheckboxClose,
  filterConfigurations,
}: FilterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  console.log('object', errors);

  const handleInputChange = (field: string, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    const newErrors: Record<string, boolean> = {};
    filterConfigurations.forEach(({ type, dataKey, inputProps }) => {
      if (type === 'input' && inputProps?.validation) {
        const value = inputValues[dataKey];
        if (value && value.length > 0) {
          const isValid = inputProps.validation(value);
          newErrors[dataKey] = !isValid;
        } else {
          newErrors[dataKey] = false; // No error if the input is empty
        }
      }
    });
    setErrors(newErrors);
  }, [inputValues, filterConfigurations]);

  const hasSelectedFilters =
    Object.values(checkedItems).some((values) =>
      Object.values(values).some((isChecked) => isChecked),
    ) || Object.values(inputValues).some((value) => value);

  const totalSelectedFilters =
    Object.values(checkedItems).reduce(
      (acc, values) => acc + Object.values(values).filter((isChecked) => isChecked).length,
      0,
    ) + Object.values(inputValues).filter((value) => value).length;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="relative flex flex-row items-center w-full gap-4 min-w-18 justify-end desktop:justify-between">
      <div className="hidden desktop:flex gap-4 flex-wrap">
        {hasSelectedFilters &&
          Object.entries(checkedItems).flatMap(([category, values]) =>
            Object.entries(values)
              .filter(([, isChecked]) => isChecked)
              .map(([value]) => (
                <FilterBadge
                  key={`${category}:${value}`}
                  label={category}
                  onClose={() => handleCheckboxClose(category, value)}
                  value={value}
                />
              )),
          )}
        {Object.values(inputValues).some((value) => value) &&
          Object.entries(inputValues).map(
            ([key, value]) =>
              value && (
                <FilterBadge
                  key={key}
                  label={key}
                  onClose={() => handleClearField(key)}
                  value={value}
                />
              ),
          )}
      </div>

      <div className="flex gap-2 shrink-0">
        {hasSelectedFilters && (
          <Button onClick={handleClear} label="Clear All" variant="transparent" />
        )}
        <div className="relative">
          <IconButton
            active={isModalOpen}
            className="relative"
            icon="FilterLines"
            onClick={() => setIsModalOpen(!isModalOpen)}
            variant="tertiary"
          />
          {totalSelectedFilters > 0 && (
            <div className="absolute  -top-1 -right-1 w-4 h-4 bg-volt text-gray-7 rounded-full flex items-center justify-center text-xs">
              {totalSelectedFilters}
            </div>
          )}
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Filters">
        <div
          style={{ maxHeight: '70vh' }}
          className="max-h-full overflow-auto flex flex-col justify-between px-4 items-center bg-backgroundSecondary border-1 gap-2 border-borderLow rounded-sm"
        >
          {filterConfigurations.map(({ title, type, dataKey, inputProps }) => (
            <div key={dataKey} className="w-full">
              <Typography variant="paragraph-sm" className="text-gray-5 mb-2">
                {title}
              </Typography>
              {type === 'input' && (
                <Input
                  className="bg-backgroundSecondary"
                  errorNotification={errors[dataKey] ? inputProps?.errorMessage : undefined}
                  value={inputValues[dataKey]}
                  onChange={(e) => handleInputChange(dataKey, (e.target as HTMLInputElement).value)}
                  placeholder={inputProps?.placeholder || ''}
                  leftContent={
                    <span className="text-paragraph-sm">{capitalizeFirstLetter(dataKey)}</span>
                  }
                  leftContentPadding="pl-16"
                  rightContent={
                    <div
                      className={`flex items-center cursor-pointer justify-center w-4 h-4 bg-tulipDark rounded-full transition-all ${inputValues[dataKey] ? 'opacity-100' : 'opacity-0'}`}
                      onClick={() => handleClearField(dataKey)}
                    >
                      <Icon color="backgroundDark" icon="CrossClose" size="xxs" />
                    </div>
                  }
                  type="text"
                  variant="filters"
                  isError={errors[dataKey]}
                />
              )}
              {type === 'checkbox' && (
                <AccordionWithCheckboxes
                  data={data || []}
                  checkedItems={checkedItems || {}}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSelectAllChange={handleSelectAllChange}
                />
              )}
            </div>
          ))}

          <div className="flex gap-2 my-4">
            <Button
              onClick={() => {
                handleApply();
                setIsModalOpen(false);
              }}
              disabled={Object.values(errors).some((error) => error)}
              label="Apply"
              variant="primary"
            />
            <Button onClick={handleClear} label="Clear" variant="transparent" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

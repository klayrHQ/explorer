import React from 'react';
import { Accordion } from '../../atoms';
import { Checkbox } from '../../atoms';

interface AccordionWithCheckboxesProps {
  data: Record<string, string[]>;
  checkedItems: Record<string, Record<string, boolean>>;
  handleCheckboxChange: (category: string, value: string, isChecked: boolean) => void;
  handleSelectAllChange: (category: string, values: string[], isChecked: boolean) => void;
}

export const AccordionWithCheckboxes: React.FC<AccordionWithCheckboxesProps> = ({
  data,
  checkedItems,
  handleCheckboxChange,
  handleSelectAllChange,
}) => {
  // Calculate the number of checked items per category
  const getCheckedCount = (category: string) => {
    const count = Object.values(checkedItems[category] || {}).filter(Boolean).length;
    return count === 0 ? 0 : count;
  };

  // Check if all items are selected in a category
  const isAllChecked = (category: string) => {
    const values = data[category];
    return values.every((value) => checkedItems[category]?.[value]);
  };

  return (
    <div className="border-1 border-borderMedium rounded-sm w-96 ">
      {Object.entries(data).map(([category, values]) => (
        <Accordion
          key={category}
          id={category}
          title={category}
          badgeCount={getCheckedCount(category)}
        >
          <div className="flex flex-col gap-2.5 w-full">
            {values.length > 1 && (
              <div
                className="cursor-pointer flex gap-1 items-center mb-1 text-caption text-semibold text-onBackgroundLow hover:text-onBackground"
                onClick={() => handleSelectAllChange(category, values, !isAllChecked(category))}
              >
                {isAllChecked(category) ? 'Clear All' : 'Select All'}
              </div>
            )}
            {values.map((value) => (
              <Checkbox
                key={value}
                id={`${category}-${value}`}
                label={value}
                checked={checkedItems[category]?.[value] || false}
                onChange={(isChecked) => handleCheckboxChange(category, value, isChecked)}
              />
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
};

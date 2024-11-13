import React from 'react';
import { Icon } from '../images/icon';

interface CheckboxProps {
  id: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="
       relative appearance-none shrink-0 w-4 h-4 border-1 border-onBackgroundLow rounded-xs  bg-backgroundSecondary
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-voltDark"
        />
        <Icon
          icon="Check"
          className={`w-4 h-4 absolute top-1/2 left-1/2 transform transition-transform duration-100 font-bold ${
            checked ? 'scale-100 text-volt' : 'scale-0 text-transparent'
          }`}
        />
      </label>
      {label && (
        <label
          className="cursor-pointer ml-2 text-onBackgroundMedium hover:text-onBackgroundHigh  text-paragraph-sm"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17 1L6 12L1 7"
    stroke="black"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>;

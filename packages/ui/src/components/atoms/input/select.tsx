'use client';
import { useState } from 'react';
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Typography } from '../base/typography';
import { Icon } from '../images/icon';
import { clsx } from 'clsx';
import { ClickAwayListener } from '@mui/base';
import { Option } from '../../../types/types';

const selectStyles = cva(
  'justify-start border border-backgroundTertiary focus:outline-none outline-none text-gray-1 focus:border-backgroundTertiary',
  {
    variants: {
      width: {
        sm: 'min-w-36',
        md: 'min-w-40',
        lg: 'min-w-64',
        xl: 'min-w-selectSMWidth desktop:min-w-selectXLWidth',
      },
      fontSize: {
        sm: 'text-paragraph-sm',
        md: 'text-paragraph-md',
      },
      backgroundColor: {
        darkBlue: 'bg-darkBlue',
        bgSecondary: 'bg-gray-7',
      },
      defaultVariants: {
        width: 'md',
        backgroundColor: 'bgSecondary',
        fontSize: 'sm',
      },
    },
  },
);

export interface CustomSelectProps {
  placeholder?: string;
  defaultValue?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: 'darkBlue' | 'bgSecondary';
  options: Option[];
  onChange?: (value: string) => void;
  classNameButton?: string;
  fontSize?: 'sm' | 'md';
}

export const CustomSelect = ({
  options,
  defaultValue,
  placeholder,
  width = 'xl',
  onChange,
  backgroundColor = 'bgSecondary',
  classNameButton,
  fontSize,
}: CustomSelectProps) => {
  const styles = selectStyles({ width });
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
  const [listboxVisible, setListboxVisible] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setListboxVisible(false);
    if (onChange) {
      onChange(value);
    }
  };

  const renderSelectedValue = (value: string | undefined, options: Option[]) => {
    const selectedOption = value ? options.find((option) => option.value === value) : null;
    return selectedOption ? (
      <div className="flex items-center">
        {selectedOption.labelIcon && (
          <Icon
            className="mr-2 "
            hoverColor="darkBlue"
            icon={selectedOption.labelIcon}
            size="inherit"
          />
        )}
        {selectedOption.labelImage && (
          <img alt="icon" className="mr-2 w-4 h-4" src={selectedOption.labelImage} />
        )}
        {selectedOption.labelCircleColor && (
          <div
            className={clsx('mr-2 w-2 h-2 rounded-full', `bg-${selectedOption.labelCircleColor}`)}
          />
        )}
        <Typography fontWeight="semibold" variant="paragraph-sm">
          {selectedOption.label}{' '}
        </Typography>
      </div>
    ) : null;
  };

  return (
    <div>
      <div>
        <button
          className={clsx(
            'relative flex items-center justify-between bg-darkBlue gap-2 py-2 px-3 group focus-visible:border-backgroundTertiary  focus:border-backgroundTertiary transition-all ',
            listboxVisible ? 'rounded-t-md' : 'rounded-md',
            classNameButton,
            selectStyles({ width, backgroundColor, fontSize }),
          )}
          onClick={() => setListboxVisible(!listboxVisible)}
          type="button"
        >
          {renderSelectedValue(selectedValue, options) || (
            <span className="placeholder">{placeholder ?? ' '}</span>
          )}
          <Icon
            className="group-hover:text-gray-1 transition-all"
            color={listboxVisible ? 'gray-1' : 'gray-6'}
            hoverColor="gray-1"
            icon="ChevronDown"
            size="small"
          />
        </button>
      </div>

      {listboxVisible && (
        <ClickAwayListener onClickAway={() => setListboxVisible(false)}>
          <ul
            className={clsx(
              'absolute border border-backgroundTertiary border-t-0 bg-darkBlue z-10 rounded-b-md overflow-hidden ',
              selectStyles({ width, backgroundColor }),
            )}
            role="listbox"
          >
            {options.map((option) => (
              <li
                className={clsx(
                  'cursor-pointer list-none p-3 flex items-center justify-start w-full hover:bg-gray-6 transition-all',
                  {
                    'bg-darkblue': selectedValue === option.value,
                  },
                )}
                key={option.value}
                onClick={() => handleSelect(option.value)}
                value={option.value}
              >
                {option.labelIcon && (
                  <Icon className="mr-2" icon={option.labelIcon} size="inherit" />
                )}
                {option.labelImage && (
                  <img alt="icon" className="mr-2 w-4 h-4" src={option.labelImage} />
                )}
                {option.labelCircleColor && (
                  <div
                    className={clsx('mr-2 w-2 h-2 rounded-full', `bg-${option.labelCircleColor}`)}
                  />
                )}
                <Typography variant="paragraph-sm">{option.label}</Typography>
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      )}
    </div>
  );
};

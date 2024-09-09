'use client';
import { useState } from 'react';
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Typography } from '../base/typography';
import { Icon } from '../images/icon';
import { clsx } from 'clsx';
import { ClickAwayListener } from '@mui/base';
import { Option } from '../../../types/types';
import { TypographyVariant } from '../../../types/types';

const selectStyles = cva(
  'justify-start border border-backgroundTertiary focus:outline-none outline-none text-gray-1 focus:border-backgroundTertiary',
  {
    variants: {
      width: {
        xs: 'min-w-28',
        sm: 'min-w-36',
        md: 'min-w-40',
        lg: 'min-w-64',
        xl: 'min-w-selectSMWidth desktop:min-w-selectXLWidth',
      },
      backgroundColor: {
        darkBlue: 'bg-darkBlue',
        bgSecondary: 'bg-gray-7',
      },
      listBorder: {
        defaultBorder: 'border-backgroundTertiary border-t-0',
        darkBorder: 'border-background',
      },
      defaultVariants: {
        width: 'md',
        backgroundColor: 'bgSecondary',
        listBorder: 'defaultBorder',
      },
    },
  },
);

export interface CustomSelectProps {
  placeholder?: string;
  defaultValue?: string;
  options: Option[];
  onChange?: (value: string) => void;
  fontSize?: string;
  width?: string;
}

export const SelectUp = ({
  options,
  defaultValue,
  placeholder,
  onChange,
  fontSize = 'paragraph-sm',
  width = 'min-w-20',
}: CustomSelectProps) => {
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
        <Typography fontWeight="semibold" variant={fontSize as TypographyVariant}>
          {selectedOption.label}
        </Typography>
      </div>
    ) : null;
  };

  return (
    <div>
      <div>
        <button
          className={clsx(
            ` relative flex items-center justify-between bg-darkBlue gap-2 py-3 px-1.5 group focus-visible:border-backgroundTertiary  focus:border-backgroundTertiary transition-all ${width} border-1 border-backgroundTertiary `,
            listboxVisible ? 'rounded-b-md' : 'rounded-md',
          )}
          onClick={() => setListboxVisible(!listboxVisible)}
          type="button"
        >
          <span className="text-lobster">{placeholder ?? ' '}</span>
          {renderSelectedValue(selectedValue, options) || (
            <span className="text-lobster">{placeholder ?? ' '}</span>
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
            className={`absolute border-1 border-backgroundTertiary ${width} bottom-full bg-darkBlue z-10 rounded-t-md overflow-hidden`}
            role="listbox"
          >
            {options.map((option) => (
              <li
                className={clsx(
                  'cursor-pointer list-none  py-3 flex items-center justify-start w-full hover:bg-gray-6 transition-all',
                  {
                    'bg-darkblue': selectedValue === option.value,
                  },
                )}
                key={option.value}
                onClick={() => handleSelect(option.value)}
                value={option.value}
              >
                <Typography className="pl-5" variant={fontSize as TypographyVariant}>
                  {option.label}
                </Typography>
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      )}
    </div>
  );
};

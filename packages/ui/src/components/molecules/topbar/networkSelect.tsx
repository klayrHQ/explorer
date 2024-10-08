'use client';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Typography } from '../../atoms/base/typography';
import { Icon } from '../../atoms/images/icon';
import { clsx } from 'clsx';
import { ClickAwayListener } from '@mui/base';
import { Option } from '../../../types/types';
import { TypographyVariant } from '../../../types/types';
import { StatusIcon } from '../../atoms/base/statusIcon';
import { KeyValueComponent } from '../../atoms/data/keyValueComponent';

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
  currentNetworkStatusClass?: string;
  value?: string;
}

export const NetworkSelect = ({
  options,
  defaultValue,
  placeholder,
  onChange,
  fontSize = 'paragraph-sm',
  width = 'min-w-20',
  currentNetworkStatusClass,
  value,
}: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
  const [listboxVisible, setListboxVisible] = useState<boolean>(false);

  const handleSelect = (value: string, runOnChange: boolean = true) => {
    setSelectedValue(value);
    setListboxVisible(false);
    if (onChange && runOnChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    value && handleSelect(value, false);
  }, [value]);

  const renderSelectedValue = (value: string | undefined, options: Option[]) => {
    const selectedOption = value ? options.find((option) => option.value === value) : null;
    return selectedOption ? (
      <div className="flex items-center ">
        <Typography
          className="hover:text-gray-3 capitalize"
          color="gray-5"
          fontWeight="normal"
          variant={'paragraph-sm'}
        >
          {selectedOption.label}
        </Typography>
      </div>
    ) : null;
  };

  return (
    <div className="relative">
      <div className="flex items-start">
        <KeyValueComponent
          contentValue={renderSelectedValue(selectedValue, options) || 'Network'}
          hover
          keyValue={<StatusIcon status={currentNetworkStatusClass} />}
          onClick={() => setListboxVisible(!listboxVisible)}
        />
      </div>

      {listboxVisible && (
        <ClickAwayListener onClickAway={() => setListboxVisible(false)}>
          <ul
            className={`absolute desktop:mt-3 desktop:right-0 desktop:bottom-auto bottom-full mb-2.5 shadow-md border-1 border-backgroundTertiary ${width}  bg-darkBlue z-10 rounded-md overflow-hidden`}
            role="listbox"
          >
            {options.map((option) => (
              <li
                className={clsx(
                  'cursor-pointer list-none py-3 px-5 flex items-center justify-start w-full hover:bg-gray-6 transition-all capitalize',
                  {
                    'bg-darkblue': selectedValue === option.value,
                  },
                )}
                key={option.value}
                onClick={() => handleSelect(option.value)}
                value={option.value}
              >
                <KeyValueComponent
                  color="gray-3"
                  contentValue={option.label}
                  keyValue={<StatusIcon status={currentNetworkStatusClass} />}
                  onClick={() => handleSelect(option.value)}
                />
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      )}
    </div>
  );
};

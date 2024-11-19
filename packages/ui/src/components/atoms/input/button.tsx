import React, { forwardRef, Ref } from 'react';
import { Button as MuiButton, ButtonOwnProps } from '@mui/base';
import { Typography } from '../base/typography';
import { cva } from 'class-variance-authority';

interface ButtonProps extends ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'transparent' | 'bordered' | 'semiTransparent';
  className?: string;
  fullWidth?: boolean;
  label: string | React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  align?: 'left' | 'center' | 'right' | 'none';
  active?: boolean;
  hovered?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

const buttonStyles = cva(
  [
    'rounded-md flex items-center justify-center h-buttonHeight',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        primary: 'text-gray-8',
        secondary: 'text-gray-1',
        transparent: 'text-gray-1',
        bordered: 'text-gray-1',
        semiTransparent: 'text-gray-1',
      },
      iconOnly: {
        true: 'p-xl w-iconButtonWidth',
        false: 'py-xl px-2xl',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
        undefined: 'w-auto',
      },
      align: {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
        none: '',
        undefined: 'mx-auto',
      },
      hovered: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      //hovered
      {
        hovered: true,
        variant: 'primary',
        disabled: false,
        className: 'bg-voltDark',
      },
      {
        hovered: false,
        variant: 'primary',
        disabled: false,
        className: 'bg-volt hover:bg-voltDark',
      },
      {
        hovered: true,
        variant: 'secondary',
        disabled: false,
        className: 'bg-azuleDark',
      },
      {
        hovered: false,
        variant: 'secondary',
        disabled: false,
        className: 'bg-azule hover:bg-azuleDark',
      },
      {
        hovered: true,
        variant: 'transparent',
        disabled: false,
        className: 'bg-gray-7',
      },
      {
        hovered: false,
        variant: 'transparent',
        disabled: false,
        className: 'transparent hover:bg-gray-7',
      },
      {
        hovered: true,
        variant: 'bordered',
        disabled: false,
        className: 'bg-gray-7 border-1 border-borderMedium ',
      },
      {
        hovered: false,
        variant: 'bordered',
        disabled: false,
        className: 'transparent hover:bg-gray-7 border-1 border-borderMedium ',
      },
      {
        hovered: true,
        variant: 'semiTransparent',
        disabled: false,
        className: 'bg-gray-6',
      },
      {
        hovered: false,
        variant: 'semiTransparent',
        disabled: false,
        active: false,
        className: 'bg-transparent hover:bg-gray-6',
      },
      //active
      {
        active: true,
        variant: 'primary',
        disabled: false,
        className: 'bg-voltDark',
      },
      {
        active: false,
        variant: 'primary',
        disabled: false,
        className: 'bg-volt hover:bg-voltDark',
      },
      {
        active: true,
        variant: 'secondary',
        disabled: false,
        className: 'bg-azuleDark',
      },
      {
        active: false,
        variant: 'secondary',
        disabled: false,
        className: 'bg-azule hover:bg-azuleDark',
      },
      {
        active: true,
        variant: 'transparent',
        disabled: false,
        className: 'text-gray-6',
      },
      {
        active: false,
        variant: 'transparent',
        disabled: false,
        className: 'text-gray-5 hover:text-gray-6',
      },
      {
        active: true,
        variant: 'bordered',
        disabled: false,
        className: 'text-gray-6 border border-1 border-borderMedium',
      },
      {
        active: false,
        variant: 'bordered',
        disabled: false,
        className: 'text-gray-5 hover:text-gray-6 border-1 border-borderMedium',
      },
      {
        active: true,
        variant: 'semiTransparent',
        className: 'bg-gray-6',
      },
      {
        active: false,
        variant: 'semiTransparent',
        className: 'bg-transparent hover:bg-gray-6',
      },
      //disabled
      {
        disabled: true,
        variant: 'primary',
        className: 'grayscale-60p bg-volt',
      },
      {
        disabled: true,
        variant: 'secondary',
        className: 'grayscale-60p bg-azule',
      },
      {
        disabled: true,
        variant: 'transparent',
        className: 'grayscale-60p',
      },
      {
        disabled: true,
        variant: 'bordered',
        className: 'grayscale-60p border-1 border-borderMedium',
      },
      {
        disabled: true,
        variant: 'semiTransparent',
        className: 'hover:bg-gray-7',
      },
    ],
  },
);

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
  (
    {
      variant = 'primary',
      className,
      fullWidth,
      label,
      onClick,
      align,
      active,
      hovered = false,
      disabled = false,
      iconOnly = false,
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <MuiButton
        {...props}
        className={buttonStyles({
          variant,
          fullWidth,
          align,
          active,
          hovered,
          disabled,
          iconOnly,
          className: className,
        })}
        onClick={onClick}
        ref={ref}
        type="button"
        disabled={disabled}
      >
        <Typography className={'inline-flex items-center gap-2'} fontWeight={'semibold'}>
          {label}
        </Typography>
      </MuiButton>
    );
  },
);

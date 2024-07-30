import React, { ForwardedRef, forwardRef, Ref } from 'react';
import { Button as MuiButton, ButtonOwnProps } from '@mui/base';
import { Typography } from '../base/typography';
import { cva } from 'class-variance-authority';

interface ButtonProps extends ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'transparent';
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
        true: '',
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
      //disabled
      {
        disabled: true,
        variant: 'primary',
        className: 'grayscale-60p bg-volt cursor-not-allowed',
      },
      {
        disabled: true,
        variant: 'secondary',
        className: 'grayscale-60p bg-azule cursor-not-allowed',
      },
      {
        disabled: true,
        variant: 'transparent',
        className: 'grayscale-60p cursor-not-allowed',
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
      >
        <Typography className={'inline-flex items-center gap-2'} fontWeight={'semibold'}>
          {label}
        </Typography>
      </MuiButton>
    );
  },
);

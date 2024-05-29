import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button as MuiButton } from '@mui/base'

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
                         primary = false,
                         size = 'medium',
                         backgroundColor,
                         label,
                         ...props
                       }: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <MuiButton
      type="button"
      className={['storybook-button text-blue-600 p-8', `storybook-button--${size}`, mode].join(' ')}
      style={{backgroundColor: backgroundColor || "transparent"}}
      {...props}
    >
      {label}
    </MuiButton>
  );
};

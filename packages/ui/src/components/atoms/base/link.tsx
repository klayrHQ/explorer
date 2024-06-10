import React from 'react';

interface LinkProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Link = ({
                         primary = false,
                         size = 'medium',
                         backgroundColor,
                         label,
                         ...props
                       }: LinkProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <a
      className={['text-volt p-4 bg-volt border-solid border-2 border-volt font-body', mode].join(' ')}
      style={{backgroundColor: backgroundColor || "transparent",}}
      {...props}
    >
      {label}
    </a>
  );
};

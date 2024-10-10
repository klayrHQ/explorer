'use client';

// components/CopyToClipboardButton.js
import { useState, useEffect } from 'react';
import { Icon } from '../images/icon';
import { Tooltip } from '../utilities/tooltip.tsx';
import { cls } from '../../../utils/functions.ts';
import { cva } from 'class-variance-authority';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      setIsCopied(false);
      console.error('Unable to copy to clipboard:', error);
    }
  };

  return { isCopied, copyToClipboard };
};

interface CopyIconProps {
  content: string;
  size: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'inherit' | 'custom';
  hover?: boolean;
}

const containerStyles = cva([''], {
  variants: {
    size: {
      xxs: '',
      xs: '',
      small: '',
      medium: '',
      large: '',
      inherit: '',
      custom: '',
    },
    hover: {
      true: 'block',
      false: '',
    },
  },
  compoundVariants: [
    {
      size: 'xxs',
      hover: true,
      className: 'w-4',
    },
    {
      size: 'xs',
      hover: true,
      className: 'w-6',
    },
    {
      size: 'small',
      hover: true,
      className: 'w-8',
    },
    {
      size: 'medium',
      hover: true,
      className: 'w-10',
    },
    {
      size: 'large',
      hover: true,
      className: 'w-12',
    },
    {
      size: 'inherit',
      hover: true,
      className: 'w-12',
    },
    {
      size: 'custom',
      hover: true,
      className: 'w-12',
    },
  ],
});

export const CopyIcon = ({ content, size, hover }: CopyIconProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy');

  useEffect(() => {
    setCopyTooltipText(isCopied ? 'Copied!' : 'Copy');
  }, [isCopied]);

  return (
    <Tooltip placement={'bottom'} text={copyTooltipText}>
      <div
        className={containerStyles({
          size,
          hover,
          className: cls(['cursor-pointer']),
        })}
        onClick={() => copyToClipboard(content)}
      >
        <Icon
          className={cls([hover ? 'desktop:group-hover/child:inline desktop:hidden' : ''])}
          color="onBackgroundLow"
          hoverColor="onBackgroundMedium"
          icon="Copy"
          size={size}
        />
      </div>
    </Tooltip>
  );
};

'use client';

// components/CopyToClipboardButton.js
import { useState, useEffect } from 'react';
import { Icon } from '../images/icon';
import { Tooltip } from '../utilities/tooltip.tsx';

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
}

export const CopyIcon = ({ content, size }: CopyIconProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy');

  useEffect(() => {
    setCopyTooltipText(isCopied ? 'Copied!' : 'Copy');
  }, [isCopied]);

  return (
    <Tooltip placement={'bottom'} text={copyTooltipText}>
      <div className={'cursor-pointer'} onClick={() => copyToClipboard(content)}>
        <Icon color="onBackgroundLow" hoverColor="onBackgroundMedium" icon="Copy" size={size} />
      </div>
    </Tooltip>
  );
};

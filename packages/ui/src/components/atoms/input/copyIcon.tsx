'use client';

// components/CopyToClipboardButton.js
import { useState } from 'react';
import { Icon } from '../images/icon';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
      console.log('Copied to clipboard:', content);
    } catch (error) {
      setIsCopied(false);
      console.error('Unable to copy to clipboard:', error);
    }
  };

  return { isCopied, copyToClipboard };
};

interface CopyIconProps {
  content: string;
  size: "xxs" | "xs" | "small" | "medium" | "large" | "inherit" | "custom";

}

export const CopyIcon = ({ content, size }: CopyIconProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className='' onClick={() => copyToClipboard(content)}>
       <Icon icon="Copy" color='onBackgroundLow' hoverColor="onBackgroundMedium" size={size}/>
    </div>
   
  );
};

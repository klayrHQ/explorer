'use client';

// components/CopyToClipboardButton.js
import { CSSProperties, useState, useEffect } from 'react';
import { Icon } from '../images/icon';
import { Popper } from '@mui/base';
import { Typography } from '../base/typography';

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const arrowSize = 4;
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy');

  useEffect(() => {
    setCopyTooltipText(isCopied ? 'Copied!' : 'Copy');
  }, [isCopied]);

  let positionStyles: CSSProperties = {
    left: 0,
    right: 0,
    bottom: `-${arrowSize}px`,
  };

  return (
    <div
      className=""
      onClick={() => copyToClipboard(content)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={setAnchorEl}
    >
      <Icon color="onBackgroundLow" hoverColor="onBackgroundMedium" icon="Copy" size={size} />
      <Popper anchorEl={anchorEl} open={open} placement={'bottom'}>
        <div
          className={
            'relative bg-background rounded-sm px-lg py-sm shadow-below shadow-shadow-gray-3 z-10 box-border'
          }
        >
          <Typography fontWeight={'semibold'} variant={'caption'}>
            {copyTooltipText}
          </Typography>
          <div
            className={'absolute m-auto'}
            style={{
              width: '0',
              height: '0',
              borderStyle: 'solid',
              borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
              borderColor: 'var(--color-background) transparent transparent transparent',
              ...positionStyles,
            }}
          />
        </div>
      </Popper>
    </div>
  );
};

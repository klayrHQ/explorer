import { Typography } from '../base/typography.tsx';
import { ReactNode } from 'react';
import { ColorType, TypographyVariant } from '../../../types/types.ts';
import { FlexGrid } from '../base/flexGrid.tsx';
import { cls } from '../../../utils/functions.ts';

interface KeyValueProps {
  keyValue: string | ReactNode;
  contentValue: string | ReactNode;
  color?: ColorType;
  size?: TypographyVariant;
  hover?: boolean;
  onClick?: () => void;
}

export const KeyValueComponent = ({
  keyValue,
  contentValue,
  onClick,
  color = 'gray-5',
  size = 'paragraph-sm',
  hover,
}: KeyValueProps) => {
  return (
    <FlexGrid
      alignItems={'center'}
      className={cls(['group', hover ? 'cursor-pointer' : ''])}
      gap={'sm'}
      mobileDirection={'row'}
      onClick={onClick}
    >
      {typeof keyValue === 'string' ? (
        <Typography
          className={cls([hover ? 'group-hover:text-gray-3' : '', 'inline-flex items-center'])}
          color={color}
          fontWeight="medium"
          variant={size}
        >
          {keyValue}
        </Typography>
      ) : (
        keyValue
      )}
      {typeof contentValue === 'string' ? (
        <Typography
          className={cls([hover ? 'group-hover:text-gray-3' : '', 'inline-flex items-center'])}
          color={color}
          fontWeight="medium"
          variant={size}
        >
          {contentValue}
        </Typography>
      ) : (
        contentValue
      )}
    </FlexGrid>
  );
};

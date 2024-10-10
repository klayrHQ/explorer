import {
  CopyIcon,
  CurrencyProps, CustomLinkProps,
  Link,
  Tooltip, TooltipProps,
  Typography,
  TypographyProps,
  UserAccountCard,
  UserAccountCardProps,
} from '@repo/ui/atoms';
import { Currency } from './currency.tsx';
import { cls, dayjs, fromNowFormatter, shortString } from '@repo/ui/utils';
import React from 'react';
import { useBasePath } from '../utils/hooks/useBasePath.ts';

interface AccountObject {
  address: string;
  name?: string;
  publicKey?: string;
  nonce?: string;
}

interface FormattedValueProps {
  value: number | string | AccountObject | undefined;
  format:
    | 'currency'
    | 'account'
    | 'number'
    | 'percentage'
    | 'address'
    | 'string'
    | 'date'
    | 'fromNow';
  typographyProps?: Omit<TypographyProps, 'children'>;
  accountProps?: UserAccountCardProps;
  currencyProps?: CurrencyProps;
  copy?: boolean;
  showCopyOnHover?: boolean;
  link?: Omit<CustomLinkProps, 'children'> | string;
  tooltip?: Omit<TooltipProps, 'children'> | string;
}

function isAccountObject(value: any): value is AccountObject {
  return (
    value &&
    typeof value.address === 'string' &&
    (typeof value.name === 'string' || typeof value.name === 'undefined')
  );
}

export const FormattedValue = ({
  value,
  format,
  typographyProps,
  accountProps,
  currencyProps,
  copy,
  showCopyOnHover,
  link,
  tooltip,
}: FormattedValueProps) => {
  const basePath = useBasePath();

  const innerComponent = () => {
    if (format === 'string' && (typeof value === 'string' || typeof value === 'number')) {
      return (
        <Typography
          {...typographyProps}
          className={cls([
            typographyProps?.className,
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center cursor-pointer' : '',
          ])}
          link={!!link}
        >
          {value}
          {copy && <CopyIcon content={value.toString()} hover={showCopyOnHover} size={'xxs'} />}
        </Typography>
      );
    }

    if (format === 'number' && (typeof value === 'string' || typeof value === 'number')) {
      return (
        <Typography
          {...typographyProps}
          className={cls([
            typographyProps?.className,
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center cursor-pointer' : '',
          ])}
          link={!!link}
        >
          {Number(value).toLocaleString()}
          {copy && <CopyIcon content={value.toString()} hover={showCopyOnHover} size={'xxs'} />}
        </Typography>
      );
    }

    if (format === 'percentage' && (typeof value === 'string' || typeof value === 'number')) {
      return (
        <Typography
          {...typographyProps}
          className={cls([
            typographyProps?.className,
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center cursor-pointer' : '',
          ])}
          link={!!link}
        >
          {Number(value).toLocaleString() + '%'}
          {copy && <CopyIcon content={value.toString()} hover={showCopyOnHover} size={'xxs'} />}
        </Typography>
      );
    }

    if (format === 'currency' && (typeof value === 'string' || typeof value === 'number')) {
      return <Currency {...currencyProps} amount={value} />;
    }

    if (format === 'account' && isAccountObject(value)) {
      return (
        <Link basePath={basePath} href={`/account/${value.name ?? value.address}`}>
          <UserAccountCard {...accountProps} {...value} />
        </Link>
      );
    }

    if (format === 'address' && typeof value === 'string') {
      return <Typography {...typographyProps}>{shortString(value, 12, 'center')}</Typography>;
    }

    if (format === 'date' && typeof value === 'number') {
      return (
        <Typography {...typographyProps}>
          {dayjs((value ?? 0) * 1000).format('DD MMM YYYY HH:mm')}
        </Typography>
      );
    }

    if (format === 'fromNow' && typeof value === 'number') {
      return (
        <Tooltip placement={'top'} text={dayjs((value ?? 0) * 1000).format('DD MMM YYYY HH:mm')}>
          <Typography className={'whitespace-nowrap'} {...typographyProps}>
            {fromNowFormatter((value ?? 0) * 1000, 'DD MMM YYYY')}
          </Typography>
        </Tooltip>
      );
    }

    return <Typography color={'error'}>{'type of value is incorrect for chosen format'}</Typography>;
  }

  if (link && tooltip) {
    typeof link === 'string' && (link = { href: link });
    typeof tooltip === 'string' && (tooltip = { text: tooltip, placement: 'top' });
    return (
      <Tooltip {...tooltip}>
        <Link {...link}>
          {innerComponent()}
        </Link>
      </Tooltip>
    );
  }

  if (link) {
    typeof link === 'string' && (link = { href: link });
    return (
      <Link {...link}>
        {innerComponent()}
      </Link>
    );
  }

  if (tooltip) {
    typeof tooltip === 'string' && (tooltip = { text: tooltip, placement: 'top' });
    return (
      <Tooltip {...tooltip}>
        {innerComponent()}
      </Tooltip>
    );
  }

  return innerComponent();
};

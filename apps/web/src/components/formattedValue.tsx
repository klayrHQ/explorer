import {
  CopyIcon,
  CurrencyProps,
  CustomLinkProps,
  Link,
  Tooltip,
  TooltipProps,
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
  name?: string | null;
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
  accountProps?: Omit<UserAccountCardProps, 'address' | 'name'>;
  currencyProps?: Omit<CurrencyProps, 'amount'>;
  copy?: boolean;
  showCopyOnHover?: boolean;
  link?: Omit<CustomLinkProps, 'children'> | string;
  tooltip?: Omit<TooltipProps, 'children'> | string;
  accountIconComponent?: React.ReactNode;
}

function isAccountObject(value: any): value is AccountObject {
  return (
    value &&
    typeof value.address === 'string' &&
    (typeof value.name === 'string' || typeof value.name === 'undefined' || value.name === null)
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
  accountIconComponent,
}: FormattedValueProps) => {
  const basePath = useBasePath();

  const innerComponent = () => {
    if (format === 'string' && (typeof value === 'string' || typeof value === 'number')) {
      return (
        <Typography
          {...typographyProps}
          className={cls([
            typographyProps?.className,
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center' : '',
          ])}
          color={typographyProps?.color ?? 'onBackgroundLow'}
          link={!!link}
          variant={typographyProps?.variant ?? 'paragraph-sm'}
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
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center' : '',
          ])}
          color={typographyProps?.color ?? 'onBackgroundLow'}
          link={!!link}
          variant={typographyProps?.variant ?? 'paragraph-sm'}
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
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center' : '',
          ])}
          color={typographyProps?.color ?? 'onBackgroundLow'}
          link={!!link}
          variant={typographyProps?.variant ?? 'caption'}
        >
          {Number(value).toFixed(2) + '%'}
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
          {accountIconComponent ? (
            <div className={'relative inline-flex items-center gap-1 ml-2.5'}>
              {accountIconComponent}
              <UserAccountCard {...accountProps} {...value} />
            </div>
          ) : (
            <UserAccountCard {...accountProps} {...value} />
          )}
        </Link>
      );
    }

    if (format === 'address' && typeof value === 'string') {
      return (
        <Typography
          {...typographyProps}
          className={cls([
            typographyProps?.className,
            copy ? 'whitespace-nowrap inline-flex gap-sm items-center' : '',
          ])}
          color={typographyProps?.color ?? 'onBackgroundLow'}
          variant={typographyProps?.variant ?? 'paragraph-sm'}
        >
          {shortString(value, 12, 'center')}
          {copy && <CopyIcon content={value.toString()} hover={showCopyOnHover} size={'xxs'} />}
        </Typography>
      );
    }

    if (format === 'date' && typeof value === 'number') {
      return (
        <Typography
          {...typographyProps}
          color={typographyProps?.color ?? 'onBackgroundLow'}
          variant={typographyProps?.variant ?? 'paragraph-sm'}
        >
          {dayjs((value ?? 0) * 1000).format('DD MMM YYYY HH:mm')}
        </Typography>
      );
    }

    if (format === 'fromNow' && typeof value === 'number') {
      return (
        <Tooltip placement={'top'} text={dayjs((value ?? 0) * 1000).format('DD MMM YYYY HH:mm')}>
          <Typography
            className={'whitespace-nowrap'}
            {...typographyProps}
            color={typographyProps?.color ?? 'onBackgroundLow'}
            variant={typographyProps?.variant ?? 'paragraph-sm'}
          >
            {fromNowFormatter((value ?? 0) * 1000, 'DD MMM YYYY')}
          </Typography>
        </Tooltip>
      );
    }

    if (value === undefined) {
      return '';
    }

    return (
      <Typography color={'tulip'} variant={'caption'}>
        {'type of value is incorrect for chosen format'}
      </Typography>
    );
  };

  if (link && tooltip) {
    typeof link === 'string' && (link = { href: link });
    typeof tooltip === 'string' && (tooltip = { text: tooltip, placement: 'top' });
    return (
      <Tooltip {...tooltip}>
        <Link {...link}>{innerComponent()}</Link>
      </Tooltip>
    );
  }

  if (link) {
    typeof link === 'string' && (link = { href: link });
    return <Link {...link}>{innerComponent()}</Link>;
  }

  if (tooltip) {
    typeof tooltip === 'string' && (tooltip = { text: tooltip, placement: 'top' });
    return <Tooltip {...tooltip}>{innerComponent()}</Tooltip>;
  }

  return innerComponent();
};

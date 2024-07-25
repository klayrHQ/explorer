'use client';
import { CSSProperties, useState } from 'react';
import { cls, copyToClipboard } from '../../../utils/functions.ts';
import { Icon } from '../images/icon.tsx';

type DataValueType = string | number | boolean | null | object | undefined;

type DataType = Record<string, string | number | object | boolean | null | undefined>;

interface JsonViewerProps {
  data: DataType;
  customStyles?: Record<string, CSSProperties>;
  copy?: boolean;
  startOpen?: boolean;
  className?: string;
}

export const JsonViewer = ({ data, customStyles, copy, startOpen, className, }: JsonViewerProps) => {
  const [openObjects, setOpenObjects] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const styles: Record<string, CSSProperties> = {
    number: customStyles?.number ?? {
      color: 'var(--color-tulip)',
    },
    string: customStyles?.string ?? {
      color: 'var(--color-green)',
    },
    boolean: customStyles?.boolean ?? {
      color: 'var(--color-azule)',
    },
    null: customStyles?.null ?? {
      color: 'var(--color-lobster)',
    },
    comma: customStyles?.comma ?? {
      color: 'var(--color-white)',
    },
    key: customStyles?.key ?? {
      color: 'var(--color-white)',
    },
    brackets: customStyles?.brackets ?? {
      color: 'var(--color-white)',
    },
  };

  const handleOpenItems = (key: string) => {
    if (openObjects.includes(key)) {
      setOpenObjects(openObjects.filter((item) => item !== key));
    } else {
      setOpenObjects([...openObjects, key]);
    }
  };

  const valueSpan = (value: DataValueType, type: string, key: number | string) => {
    const isNotObject = type !== 'object';
    const isString = type === 'string';
    const isBoolean = type === 'boolean';

    return (
      <span style={styles[type]}>
        {/* @ts-ignore */}
        {isNotObject ? (
          isString ? (
            `"${value}"`
          ) : isBoolean ? (
            value?.toString()
          ) : (
            value
          )
        ) : Array.isArray(value) ? (
          <>
            <span>{'['}</span>
            {startOpen ? (
              !openObjects.includes(key.toString()) ? (
                <div className={'ml-xl'}>{formattedArrayValue(value, key)}</div>
              ) : (
                <span>{'...'}</span>
              )
            ) : openObjects.includes(key.toString()) ? (
              <div className={'ml-xl'}>{formattedArrayValue(value, key)}</div>
            ) : (
              <span>{'...'}</span>
            )}
            <span>{']'}</span>
          </>
        ) : value !== null ? (
          <>
            <span>{'{'}</span>
            {startOpen ? (
              !openObjects.includes(key.toString()) ? (
                <div className={'ml-xl'}>{formattedData(value as DataType, key)}</div>
              ) : (
                <span>{'...'}</span>
              )
            ) : openObjects.includes(key.toString()) ? (
              <div className={'ml-xl'}>{formattedData(value as DataType, key)}</div>
            ) : (
              <span>{'...'}</span>
            )}
            <span>{'}'}</span>
          </>
        ) : (
          <span style={styles.null}>{'null'}</span>
        )}
        <span style={styles.comma}>{','}</span>
      </span>
    );
  };

  const formattedArrayValue = (data: any[], key: number | string, parentKey?: string | number) => {
    return data.map((value: DataValueType, subIndex) => {
      const type = typeof value;
      const isNotObject = type !== 'object';

      return (
        <div className={'ml-xl'} key={`${parentKey ? `${parentKey}-` : ''}${key}-${subIndex + 1}`}>
          {!isNotObject && value !== null && (
            <span
              className={'inline cursor-pointer text-caption'}
              onClick={() => handleOpenItems(`${parentKey ? `${parentKey}-` : ''}${key}-${subIndex}`)}
            >
              {'\u25BC '}
            </span>
          )}
          {valueSpan(value, type, `${parentKey ? `${parentKey}-` : ''}${key}-${subIndex}`)}
        </div>
      );
    });
  };

  const formattedData = (data: DataType, parentKey?: string | number) => {
    return Object.entries(data).map(([key, value]) => {
      //console.log(key, value)
      const type = typeof value;
      const isNotObject = type !== 'object';

      return (
        <div
          className={`relative`}
          key={`${parentKey ? `${parentKey}-` : ''}${key}`}
          onMouseEnter={() => setHoveredItem(`${parentKey ? `${parentKey}-` : ''}${key}`)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {!isNotObject && value !== null && (
            <span
              className={'inline cursor-pointer text-caption'}
              onClick={() => handleOpenItems(`${parentKey ? `${parentKey}-` : ''}${key}`)}
            >
              {'\u25BC '}
            </span>
          )}
          <span style={styles.key}>
            {key}
            {': '}
          </span>
          {valueSpan(value, type, `${parentKey ? `${parentKey}-` : ''}${key}`)}
          {copy && (
            <span
              className={cls([
                'absolute right-md top-0 bottom-0 my-auto cursor-pointer h-max',
                hoveredItem === `${parentKey ? `${parentKey}-` : ''}${key}` ? 'block' : 'hidden',
              ])}
              onClick={() => copyToClipboard(JSON.stringify(value))}
            >
              <Icon color={'white'} icon={'Copy'} size={'xs'} />
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={cls([
        'rounded-md p-3xl bg-backgroundPrimary',
        'font-mono text-paragraph-md break-words',
        'border-borderMedium border-1 border-solid',
        'w-full',
        className,
      ])}
    >
      {formattedData(data)}
    </div>
  );
};

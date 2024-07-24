"use client"
import {CSSProperties, useState} from "react";
import {cls, copyToClipboard} from "../../../utils/functions.ts";
import {Icon} from "../images/icon.tsx";

type DataValueType = string | number | boolean | null | object | undefined;

type DataType = Record<string, string | number | object | boolean | null | undefined>;

interface JsonViewerProps {
  data: DataType;
}

export const JsonViewer = ({ data, }: JsonViewerProps) => {
  const [openObjects, setOpenObjects] = useState<string[]>([]);
  
  const styles: Record<string, CSSProperties>  = {
    number: {
      color: 'var(--color-tulip)',
    },
    string: {
      color: 'var(--color-green)',
    },
    boolean: {
      color: 'var(--color-azule)',
    },
    null: {
      color: 'var(--color-lobster)',
    },
    comma: {
      color: 'var(--color-white)',
    },
    key: {
      color: 'var(--color-white)',
    },
    brackets: {
      color: 'var(--color-white)',
    },
  }

  const handleOpenItems = (key: string) => {
    if (openObjects.includes(key)) {
      setOpenObjects(openObjects.filter((item) => item !== key));
    } else {
      setOpenObjects([...openObjects, key]);
    }
  }

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
            {
              openObjects.includes(key.toString()) ? (
                <div className={'ml-xl'}>{formattedArrayValue(value, key)}</div>
              ) : (
                <span>{'...'}</span>
              )
            }
            <span>{']'}</span>
          </>
        ) : value !== null ? (
          <>
            <span>{'{'}</span>
            {
              openObjects.includes(key.toString()) ? (
                <div className={'ml-xl'}>{formattedData(value as DataType)}</div>
              ) : (
                <span>{'...'}</span>
              )
            }
            <span>{'}'}</span>
          </>
        ) : (
          <span style={styles.null}>{'null'}</span>
        )}
        <span style={styles.comma}>{','}</span>
      </span>
    );
  }

  const formattedArrayValue = (data: any[], key: number | string) => {
    return data.map((value: DataValueType, subIndex) => {
      const type = typeof value;
      const isNotObject = type !== 'object';

      return (
        /* todo make sure it adds the key from every parent if nested multiple times */
        <div className={'ml-xl'} key={`${key}-${subIndex + 1}`}>
          {!isNotObject && value !== null && (
            <span
              className={'inline cursor-pointer text-caption'}
              /* todo make sure it adds the key from every parent if nested multiple times */
              onClick={() => handleOpenItems(`${key}-${subIndex}`)}
            >
              {'\u25BC '}
            </span>
          )}
          {/* todo make sure it adds the key from every parent if nested multiple times */}
          {valueSpan(value, type, `${key}-${subIndex}`)}
        </div>
      );
    });
  };

  const formattedData = (data: DataType) => {
    return Object.entries(data).map(([key, value]) => {
      //console.log(key, value)
      const type = typeof value;
      const isNotObject = type !== 'object';

      return (
        <div className={'relative group'} key={key}>
          {!isNotObject && value !== null && (
            <span
              className={'inline cursor-pointer text-caption'}
              onClick={() => handleOpenItems(key)}
            >
              {'\u25BC '}
            </span>
          )}
          <span style={styles.key}>
            {key}
            {': '}
          </span>
          {valueSpan(value, type, key)}
          {/*<Icon
            className={'absolute right-md top-0 bottom-0 my-auto hidden group-hover:block cursor-pointer'}
            color={'volt'}
            icon={'Copy'}
            onClick={() => copyToClipboard(JSON.stringify(value))}
            size={'xs'}
          />*/}
        </div>
      );
    });
  };

  return (
    <>
      {JSON.stringify(openObjects)}
      <div
        className={cls([
          'rounded-md p-3xl bg-backgroundPrimary',
          'font-mono text-paragraph-md break-words',
          'border-borderMedium border-1 border-solid',
        ])}
      >
        {formattedData(data)}
      </div>
    </>
  );
}
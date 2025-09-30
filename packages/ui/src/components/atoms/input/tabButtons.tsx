/* eslint-disable comma-dangle */
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { Icon } from '../images/icon';
import { Typography } from '../base/typography';
import { IconComponent } from '../../../types/types';
import { ReactNode } from 'react';
import { cls } from '../../../utils/functions.ts';
import { InfoTooltip } from '../utilities/infoTooltip.tsx';

interface TabData {
  value: number;
  label: string;
  icon?: IconComponent;
  content: ReactNode;
  count?: number | string;
  disabled?: boolean;
  tooltip?: string;
}

interface TabButtonsProps {
  tabs: TabData[];
  width?: string;
  showLabel?: boolean;
  padding?: string;
  className?: string;
  trailingComponent?: ReactNode;
}

export const TabButtons = ({
  tabs,
  width,
  className,
  showLabel = true,
  padding = 'lg',
  trailingComponent,
}: TabButtonsProps) => {
  return (
    <Tabs
      className={cls([`flex flex-col gap-1.5xl`, width ? `w-${width}` : ' w-full'])}
      defaultValue={1}
    >
      {/*todo remove overflow-auto when new solution gets implemented*/}
      <TabsList
        className={`flex gap-2 bg-background active:text-lobster overflow-auto items-center ${className}`}
      >
        <div className="flex flex-1 min-w-0">
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              disabled={tab.disabled}
              slotProps={{
                root: ({ selected, disabled }) => ({
                  className: `p-lg px-${padding} rounded-sm ${
                    selected
                      ? 'bg-backgroundSecondary text-onBackground'
                      : 'text-onBackgroundMedium'
                  } ${disabled ? 'cursor-not-allowed opacity-50p' : 'cursor-pointer'} `,
                }),
              }}
              value={tab.value}
            >
              <div className="flex items-center gap-2">
                {tab.icon && <Icon color="" icon={tab.icon} size={'xs'} />}

                {showLabel && (
                  <div className="flex flex-1 min-w-0 items-center">
                    <Typography color="" fontWeight="semibold" variant="paragraph-md">
                      {tab.label}
                    </Typography>
                    {tab.tooltip && (
                      <div className="ml-1">
                        <InfoTooltip text={tab.tooltip} />
                      </div>
                    )}
                  </div>
                )}

                {tab.count !== undefined && tab.count !== null && (
                  <div
                    className={
                      'bg-secondary rounded-sm p-1 h-6 min-w-6 items-center justify-center hidden desktop:flex'
                    }
                  >
                    <Typography color="onSecondary" variant="paragraph-sm">
                      {tab.count}
                    </Typography>
                  </div>
                )}
              </div>
            </Tab>
          ))}
        </div>
        {trailingComponent && (
          <div className="flex items-center justify-end ml-4">{trailingComponent}</div>
        )}
      </TabsList>
      {tabs.map((tab) => (
        <TabPanel className="mt-2" key={tab.value} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

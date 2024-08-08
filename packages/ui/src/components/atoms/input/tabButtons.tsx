import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { Icon } from '../images/icon';
import { Typography } from '../base/typography';
import { IconComponent } from '../../../types/types';
import { ReactNode } from 'react';
import { cls } from '../../../utils/functions.ts';

interface TabData {
  value: number;
  label: string;
  icon: IconComponent;
  content: ReactNode;
}

interface TabButtonsProps {
  tabs: TabData[];
  width?: string;
  showLabel?: boolean;
  padding?: string;
}

export const TabButtons = ({ tabs, width, showLabel = true, padding = '3' }: TabButtonsProps) => {
  return (
    <Tabs
      className={cls(['flex flex-col gap-1.5xl', width ? `w-${width}` : ' w-full'])}
      defaultValue={1}
    >
      <TabsList className="flex gap-2 bg-background active:text-lobster">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `p-3 px-${padding} rounded-sm ${
                  selected ? 'bg-backgroundSecondary text-onBackground' : 'text-onBackgroundMedium'
                } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `,
              }),
            }}
            value={tab.value}
          >
            <div className="flex gap-2">
              <Icon color="" icon={tab.icon} />
              {showLabel && (
                <Typography color="" fontWeight="semibold" variant="paragraph-lg">
                  {tab.label}
                </Typography>
              )}
            </div>
          </Tab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabPanel className="mt-2" key={tab.value} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

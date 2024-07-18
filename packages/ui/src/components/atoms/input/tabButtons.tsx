import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { Icon } from '../images/icon';
import { Typography } from '../base/typography';
import { IconComponent } from '../../../types/types';
import { ReactNode } from 'react';

interface TabData {
  value: number;
  label: string;
  icon: IconComponent;
  content: ReactNode;
}

interface TabButtonsProps {
  tabs: TabData[];
}

export const TabButtons = ({ tabs, }: TabButtonsProps) => {
  return (
    <Tabs className={'flex flex-col gap-1.5xl'} defaultValue={1}>
      <TabsList className="flex gap-2 bg-background active:text-lobster">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            slotProps={{
              root: ({ selected, disabled, }) => ({
                className: `p-3 rounded-sm ${
                  selected ? 'bg-backgroundSecondary text-onBackground' : 'text-onBackgroundMedium'
                } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `,
              }),
            }}
            value={tab.value}
          >
            <div className="flex gap-2">
              <Icon color="" icon={tab.icon} />
              <Typography color="" fontWeight="semibold" variant="paragraph-lg">
                {tab.label}
              </Typography>
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

import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tab } from "@mui/base/Tab";
import { Icon } from "../images/icon";
import { Typography } from "../base/typography";
import { IconComponent } from "../../../types/types";

interface TabData {
  value: number;
  label: string;
  icon: IconComponent;
  content: React.ReactNode;
}

interface TabButtonsProps {
  tabs: TabData[];
}

export const TabButtons: React.FC<TabButtonsProps> = ({ tabs }) => {
  return (
    <Tabs defaultValue={1}>
      <TabsList className="flex gap-2 bg-background active:text-lobster">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `p-3 rounded-sm ${
                  selected
                    ? "bg-backgroundSecondary text-onBackground"
                    : "text-onBackgroundMedium"
                } ${
                  disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                } `,
              }),
            }}
          >
            <div className="flex gap-2">
              <Icon color="" icon={tab.icon} />
              <Typography fontWeight="semibold" variant="paragraph-lg" color="">
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

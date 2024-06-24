import { StoryObj } from "@storybook/react";
import { PerformanceSection } from "@repo/ui/organisms";

const meta = {
  title: "Organisms/PerformanceSection/PerformanceSection",
  component: PerformanceSection,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Stats: Story = {
  args: {
    options: [
      { value: "oneHourAgo", label: "One hour ago" },
      { value: "yesterday", label: "Yesterday" },
      { value: "lastWeek", label: "Last week" },
      { value: "lastMonth", label: "Last month" },
      { value: "lastYear", label: "Last year" },
    ],

    stats: [
        {
          title: "Total Revenue",
          value: "$ 1,204,000",
          percentage: "20%",
          statsVS: "vs last month",
          trend: true,
          icon: "",
          color: "green",
        },
        {
          title: "Total locked",
          value: "32.633 KLY ",
          percentage: "9.3%",
          statsVS: "vs last month",
          trend: false,
          icon: "",
          color: "lobster",
        },
        {
          title: "Total Revenue",
          value: "$ 1,204,000",
          percentage: "20%",
          statsVS: "vs last month",
          trend: true,
          icon: "",
          color: "green",
        },
        {
          title: "Total locked",
          value: "32.633 KLY ",
          percentage: "9.3%",
          statsVS: "vs last month",
          trend: false,
          icon: "",
          color: "lobster",
        },
        {
          title: "Total Revenue",
          value: "$ 1,204,000",
          percentage: "20%",
          statsVS: "vs last month",
          trend: true,
          icon: "",
          color: "green",
          
          
        },
      ],

  },
};
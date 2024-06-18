import { StoryObj } from "@storybook/react";
import { PerformanceCardGrid } from "@repo/ui/organisms";

const meta = {
  title: "Organisms/PerformanceSection/PerformanceCardGrid",
  component: PerformanceCardGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
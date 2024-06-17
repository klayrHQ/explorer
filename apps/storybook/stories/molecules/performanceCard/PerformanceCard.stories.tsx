import { StoryObj } from "@storybook/react";
import { PerformanceCard } from "@repo/ui/molecules";

const meta = {
    title: "Molecules/PerformanceCard",
    component: PerformanceCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        title: { control: "text" },
        value: { control: "text" },
        percentage: { control: "text" },
        statsVS: { control: "text" },
        trend: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Total Revenue",
        value: "$ 1,204,000",
        percentage: "20%",
        statsVS: "vs last month",
        trend: true,
        icon: "",
        color: "green",
    },
};

export const NegativeTrend: Story = {
    args: {
        title: "Total locked",
        value: "32.633 KLY ",
        percentage: "9.3%",
        statsVS: "vs last month",
        trend: false,
        icon: "",
        color: "lobster",
    },
};
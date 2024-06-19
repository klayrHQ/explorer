import type { StoryObj } from "@storybook/react";
import {NotificationIcon} from "@repo/ui/atoms";

const meta = {
  title: "Atoms/Notifications/NotificationIcon",
  component: NotificationIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
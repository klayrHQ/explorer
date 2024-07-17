import type { StoryObj } from "@storybook/react";
import { ImageNotification } from "@repo/ui/atoms";
const meta = {
  title: "Atoms/Images/NotificationIcon",
  component: ImageNotification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    notificationValue: '!',
    imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
    name: 'avatar',
  },
};

export const Number: Story = {
  args: {
    notificationValue: 1,
    imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
    name: 'avatar',
  },
};

import { StoryObj } from "@storybook/react";
import { NewsCard } from "@repo/ui/organisms";

const meta = {
  title: "Organisms/NewsCard/NewsCard",
  component: NewsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    badges: [
      { colorVariant: "greenDark", label: "Development" },
      { colorVariant: "tulipDark", label: "Blockchain" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewsCardDefault: Story = {
  args: {
    src: "https://img.freepik.com/free-vector/hand-drawn-tropical-sunset-background_23-2150672384.jpg?w=1800&t=st=1718192811~exp=1718193411~hmac=73b07debd78a9bb9b80db43c74f8af0ed2f8915fa88215fe4776c5399143801d",
    alt: "Placeholder Image",
    author: "Lara Malta",
    date: "23 Apr 2024",
    title: "Exploring the blockchain",
    description:
      "Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti dolor sol amit ultrices elementum. Vestibulum ultrices elementum eros, sed ...",
  },
};

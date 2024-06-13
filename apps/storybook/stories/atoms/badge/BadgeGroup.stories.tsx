import { BadgeGroup } from "@repo/ui/atoms";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Badge/BadgeGroup",
  component: BadgeGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OneBadge: Story = {
  args: {
    badges: [{ colorVariant: "volt", label: "Development" }],
  },
};

export const TwoBadges: Story = {
  args: {
    badges: [
      { colorVariant: "volt", label: "Development" },
      { colorVariant: "azule", label: "Marketing" },
    ],
  },
};

export const ThreeBadges: Story = {
  args: {
    badges: [
      { colorVariant: "volt", label: "Development" },
      { colorVariant: "azule", label: "Marketing" },
      { colorVariant: "lobster", label: "Blockchain" },
    ],
  },
};

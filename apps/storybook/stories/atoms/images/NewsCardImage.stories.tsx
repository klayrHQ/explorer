import { StoryObj } from "@storybook/react";
import { NewsCardImage } from "@repo/ui/atoms";

const meta = {
  title: "Atoms/Images/NewsCardImage",
  component: NewsCardImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { src: "", alt: "Placeholder Image" },
  argTypes: {
    sizeVariant: {
      control: { type: "select", options: ["desktop", "mobile"] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const imageLink =
  "https://img.freepik.com/free-vector/hand-drawn-tropical-sunset-background_23-2150672384.jpg?w=1800&t=st=1718192811~exp=1718193411~hmac=73b07debd78a9bb9b80db43c74f8af0ed2f8915fa88215fe4776c5399143801d";

  export const NewsCardImageDesktop: Story = {
  args: {
    size: "desktop",
    src: imageLink,
  },
};

export const NewsCardImageMobile: Story = {
  args: {
    src: imageLink,
    size: "mobile",
  },
};

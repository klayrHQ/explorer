import { StoryObj } from "@storybook/react";
import { BlockDetailsBanner,  } from "@repo/ui/organisms";
import BannerBG from "../../assets/images/bannerBG.png";

const meta = {
  title: "Organisms/BlockDetails/BlockDetailsBanner",
  component: BlockDetailsBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    senderName: "Alex303",
    image: BannerBG.src,
    amount: "354",
    symbol: "KLY",
    senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
    transactions: 5,
    block: 132443,
     executionStatus: "successful"
  },
};



export const FailedExecution: Story = {
  args: {
    senderName: "Alex303",
    image: BannerBG.src,
    amount: "354",
    symbol: "KLY",
    senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
    executionStatus: "failed",
    transactions: 0,
    block: 132443,
  },
};

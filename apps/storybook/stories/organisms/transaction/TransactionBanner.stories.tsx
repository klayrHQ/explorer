import { StoryObj } from "@storybook/react";
import { TransactionBanner } from "@repo/ui/molecules";
import BannerBG from "../../assets/images/bannerBG.png";

const meta = {
  title: "Organisms/Transaction/TransactionsBanner",
  component: TransactionBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "ca4e900d5a70d7fb7edcb3b7095aedd30b698338302592efb30c6404e1a4f70e",
    blockHeight: 7038,
    blockId: "566f8db97bdf083c0b7636abe7fd9af4180ce402817d002895579a1e5d1bfa18",
    amount: "354",
    symbol: "KLY",
    senderName: "Alex303",
    senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
    receiverName: "Kerg Rte",
    receiverAddress: "klyrt9e7q4v47e3622obxcj97veavxa2ak2ofyn32",
    moduleCommand: "token:transfer",
    executionStatus: "successful",
    timestamp: 1719841046,
    badgeColor: "green",
    image: BannerBG.src,
  },
};

export const NoReceiverName: Story = {
  args: {
    id: "ca4e900d5a70d7fb7edcb3b7095aedd30b698338302592efb30c6404e1a4f70e",
    blockHeight: 703846,
    blockId: "566f8db97bdf083c0b7636abe7fd9af4180ce402817d002895579a1e5d1bfa18",
    amount: "5264",
    symbol: "KLY",
    senderName: "",
    senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
    receiverName: null,
    receiverAddress: "klyrt9e7q4v47e3622obxcj97veavxa2ak2ofyn32",
    moduleCommand: "token:transfer",
    executionStatus: "successful",
    timestamp: 1719836748,
    badgeColor: "green",
    image: BannerBG.src,
  },
};

export const StakeFailed: Story = {
    args: {
        id: "ca4e900d5a70d7fb7edcb3b7095aedd30b698338302592efb30c6404e1a4f70e",
        blockHeight: 1719326532,
        blockId: "566f8db97bdf083c0b7636abe7fd9af4180ce402817d002895579a1e5d1bfa18",
        amount: "1",
        symbol: "KLY",
        senderName: "John Doe",
        senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
        receiverName: null,
        moduleCommand: "pos:stake",
        executionStatus: "",
        timestamp: 1719836748,
        badgeColor: "volt",
        image: BannerBG.src,
    },
    };



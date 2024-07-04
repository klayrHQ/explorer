import { StoryObj } from "@storybook/react";
import { ValidatorBanner} from '@repo/ui/organisms';
import BannerBG from "../../assets/images/bannerBG.png";

const meta = {
  title: "Organisms/Validator/ValidatorBanner",
  component: ValidatorBanner,
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
    stakes: 100,
    value: 500,
    valueSymbol: "KLY",
    selfStake: 50,
    selfStakeSymbol: "KLY",
    capacity: 452,
    capacitySymbol: "KLY",
    // Add any other necessary props here
  },
};

export const NoReceiverName: Story = {
  args: {
    senderName: "Alex303",
    image: BannerBG.src,
    stakes: 100,
    value: 500,
    valueSymbol: "KLY",
    selfStake: 50,
    selfStakeSymbol: "KLY",
    capacity: 452,
    capacitySymbol: "KLY",
  },
};

export const StakeFailed: Story = {
  args: {
    senderName: "John Doe",
    image: BannerBG.src,
    stakes: 1,
    value: 1,
    valueSymbol: "KLY",
    selfStake: 0,
    selfStakeSymbol: "KLY",
    capacity: 500,
    capacitySymbol: "KLY",
  },
};

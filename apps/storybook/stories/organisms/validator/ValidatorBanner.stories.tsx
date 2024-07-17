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
    senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
    image: BannerBG.src,
    stakes: 100,
    value: 500,
    valueSymbol: "KLY",
    selfStake: 50,
    selfStakeSymbol: "KLY",
    capacity: 452,
    online: true,
    imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
    notificationValue: 1,

    
  },
};

export const NoReceiverName: Story = {
    args: {
        senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
        image: BannerBG.src,
        stakes: 100,
        value: 500,
        valueSymbol: "KLY",
        selfStake: 50,
        selfStakeSymbol: "KLY",
        capacity: 452,
        online: false,
        imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
        notificationValue: 1,
    
      },
};


export const CapacityLow: Story = {
    args: {
        senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
        image: BannerBG.src,
        stakes: 100,
        value: 500,
        valueSymbol: "KLY",
        selfStake: 50,
        selfStakeSymbol: "KLY",
        capacity: 78,
        online: false,
        imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
        notificationValue: 1,
    
      },
};

export const StakeFailed: Story = {
    args: {
        senderName: "Alex303",
        senderAddress: "klyvrkr6k3r86znn6n8y8ftyc5298b8gqew4bd4s8",
        image: BannerBG.src,
        stakes: 100,
        value: 500,
        valueSymbol: "KLY",
        selfStake: 50,
        selfStakeSymbol: "KLY",
        capacity: 452,
        imageUrl: "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
        notificationValue: 1,
    
      },
};

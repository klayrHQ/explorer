import { StoryObj } from "@storybook/react";
import { TransactionBanner } from '@repo/ui/molecules';
import BannerBG from '../../assets/images/bannerBG.png';

const meta = {
    title: "Molecules/Transaction/TransactionsBanner",
    component: TransactionBanner,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        title: { control: "text" },
        value: { control: "text" },
        icon: { control: "text" },
        color: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        image: BannerBG.src,
    },
};




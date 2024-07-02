import { BannerCard } from "@repo/ui/molecules";
import { StoryObj } from '@storybook/react';

const meta = {
    title: 'Molecules/Transaction/BannerCard',
    component: BannerCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    };

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        blockHeight: 123456,
        blockId: "0x1234567890abcdef",
    },
};